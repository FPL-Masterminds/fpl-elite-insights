import { useEffect, useState } from "react";
import { useAuth } from "../../../supabase/auth";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PlayerTable, { PlayerData } from "../premium/PlayerTable";
import { getBootstrapData, getFixtures, calculateOwnership, getCaptainCounts } from "@/lib/fpl-service";

// Sort options for the dropdown
const SORT_OPTIONS = [
  { name: "Ownership %", value: "ownership" },
  { name: "Price", value: "price" },
  { name: "Form", value: "form" },
  { name: "Captain", value: "captain" },
  { name: "Transfers In", value: "transfersIn" },
  { name: "Transfers Out", value: "transfersOut" },
  { name: "Expected Points", value: "expectedPoints" },
  { name: "Bonus Points", value: "bonusPoints" },
  { name: "Total Points", value: "totalPoints" }
];

const POSITIONS = [
  { name: "All Positions", value: "all-positions" },
  { name: "Goalkeeper", value: "GKP" },
  { name: "Defender", value: "DEF" },
  { name: "Midfielder", value: "MID" },
  { name: "Forward", value: "FWD" }
];

const FILTERS = [
  { name: "All Players", value: "all" },
  { name: "Template Players (≥35% Ownership)", value: "template" },
  { name: "Potential Differentials (10-20% Ownership)", value: "potential-diff" },
  { name: "Strong Differentials (5-10% Ownership)", value: "strong-diff" }
];

export default function Premium() {
  const { user } = useAuth();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("ownership");
  const [selectedPosition, setSelectedPosition] = useState("all-positions");
  const [selectedTeam, setSelectedTeam] = useState("all-teams");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [teams, setTeams] = useState<{ name: string; value: string }[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all required data
      const bootstrap = await getBootstrapData();
      const fixtures = await getFixtures();
      
      // Calculate ownership and captain data
      const ownershipData = await calculateOwnership(bootstrap.elements);
      const captainData = await getCaptainCounts(bootstrap.elements);

      // Set up teams for filter
      const teamOptions = [
        { name: "All Teams", value: "all-teams" },
        ...bootstrap.teams.map((team: any) => ({
          name: team.name,
          value: team.name
        }))
      ];
      setTeams(teamOptions);

      // Filter to only include players that are owned by at least one of the top 50 teams
      const ownedPlayers = bootstrap.elements.filter((player: any) => 
        ownershipData[player.id] > 0
      );

      // Process only the owned players
      const processedPlayers = ownedPlayers.map((player: any) => {
        const team = bootstrap.teams.find((t: any) => t.id === player.team);
        const position = {
          1: 'GKP',
          2: 'DEF',
          3: 'MID',
          4: 'FWD'
        }[player.element_type];

        // Get next fixture
        const nextFixture = fixtures
          .filter((f: any) => 
            (f.team_h === player.team || f.team_a === player.team) && 
            !f.finished
          )
          .sort((a: any, b: any) => a.event - b.event)[0];

        const isHome = nextFixture?.team_h === player.team;
        const opposingTeam = bootstrap.teams.find((t: any) => 
          t.id === (isHome ? nextFixture?.team_a : nextFixture?.team_h)
        );

        return {
          photo: `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`,
          position,
          name: player.web_name,
          team: team?.name || 'Unknown',
          price: player.now_cost / 10,
          ownership: ownershipData[player.id] || 0,
          ownershipPercentage: ((ownershipData[player.id] || 0) / 50) * 100,
          form: parseFloat(player.form) || 0,
          captainCount: captainData[player.id] || 0,
          transfersIn: player.transfers_in_event || 0,
          transfersOut: player.transfers_out_event || 0,
          nextFixture: opposingTeam ? 
            `${isHome ? 'vs' : '@'} ${opposingTeam.short_name}` : 
            'None',
          expectedPoints: parseFloat(player.ep_next) || 0,
          bonusPoints: player.bonus || 0,
          totalPoints: player.total_points || 0
        };
      });

      // Sort by ownership percentage in descending order
      const sortedPlayers = processedPlayers.sort((a, b) => b.ownership - a.ownership);

      setPlayers(sortedPlayers);
      setFilteredPlayers(sortedPlayers);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch player data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (players.length > 0) {
      let filtered = [...players];

      // Apply position filter
      if (selectedPosition !== "all-positions") {
        filtered = filtered.filter(player => player.position === selectedPosition);
      }

      // Apply team filter
      if (selectedTeam !== "all-teams") {
        filtered = filtered.filter(player => player.team === selectedTeam);
      }

      // Apply ownership filters
      switch (selectedFilter) {
        case "template":
          filtered = filtered.filter(player => player.ownershipPercentage >= 35);
          break;
        case "potential-diff":
          filtered = filtered.filter(player => 
            player.ownershipPercentage >= 10 && player.ownershipPercentage <= 20
          );
          break;
        case "strong-diff":
          filtered = filtered.filter(player => 
            player.ownershipPercentage >= 5 && player.ownershipPercentage < 10
          );
          break;
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price":
            return b.price - a.price;
          case "ownership":
            return b.ownershipPercentage - a.ownershipPercentage;
          case "form":
            return b.form - a.form;
          case "captain":
            return b.captainCount - a.captainCount;
          case "transfersIn":
            return b.transfersIn - a.transfersIn;
          case "transfersOut":
            return b.transfersOut - a.transfersOut;
          case "expectedPoints":
            return b.expectedPoints - a.expectedPoints;
          case "bonusPoints":
            return b.bonusPoints - a.bonusPoints;
          case "totalPoints":
            return b.totalPoints - a.totalPoints;
          default:
            return b.ownershipPercentage - a.ownershipPercentage;
        }
      });

      setFilteredPlayers(filtered);
    }
  }, [sortBy, selectedPosition, selectedTeam, selectedFilter, players]);

  const handleDownloadCSV = () => {
    const headers = [
      'PLAYER',
      'POSITION',
      'TEAM',
      'PRICE',
      'OWNERSHIP',
      'OWNERSHIP %',
      'FORM',
      'CAPTAIN',
      'TRANSFERS IN',
      'TRANSFERS OUT',
      'NEXT FIXTURE',
      'EXPECTED POINTS',
      'BONUS POINTS',
      'TOTAL POINTS'
    ];

    const csvContent = [
      headers.join(','),
      ...players.map(player => [
        `"${player.name}"`,
        player.position,
        `"${player.team}"`,
        player.price,
        player.ownership,
        player.ownershipPercentage,
        player.form,
        player.captainCount,
        player.transfersIn,
        player.transfersOut,
        `"${player.nextFixture}"`,
        player.expectedPoints,
        player.bonusPoints,
        player.totalPoints
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'fpl_elite_insights.csv';
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            FPL Top 50 Squad Analysis
          </h1>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                <SelectTrigger className="w-[140px] md:w-[160px]">
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((position) => (
                    <SelectItem key={position.value} value={position.value}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-[140px] md:w-[160px]">
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.value} value={team.value}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[140px] md:w-[160px]">
                  <SelectValue placeholder="All Players" />
                </SelectTrigger>
                <SelectContent>
                  {FILTERS.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] md:w-[160px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={handleDownloadCSV}
                className="w-[140px] md:w-[160px]"
              >
                Download CSV
              </Button>

              <Button 
                variant="default" 
                onClick={fetchData}
                className="w-[140px] md:w-[160px]"
              >
                Refresh Data
              </Button>
            </div>
          </div>

          <PlayerTable players={filteredPlayers} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </>
  );
}