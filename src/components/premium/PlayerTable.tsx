import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface PlayerData {
  photo: string;
  position: string;
  name: string;
  team: string;
  price: number;
  ownership: number;
  ownershipPercentage: number;
  form: number;
  captainCount: number;
  transfersIn: number;
  transfersOut: number;
  nextFixture: string;
  expectedPoints: number;
  bonusPoints: number;
  totalPoints: number;
}

interface PlayerTableProps {
  players: PlayerData[];
  isLoading: boolean;
}

export default function PlayerTable({ players, isLoading }: PlayerTableProps) {
  if (isLoading) {
    return (
      <div className="w-full text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading player data...</p>
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[60px] text-[11px] font-bold uppercase tracking-wider text-gray-500 py-4 text-center">Photo</TableHead>
            <TableHead className="w-[70px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Position</TableHead>
            <TableHead className="w-[120px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Player</TableHead>
            <TableHead className="w-[120px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Team</TableHead>
            <TableHead className="w-[80px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Price</TableHead>
            <TableHead className="w-[90px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Ownership</TableHead>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Ownership %</TableHead>
            <TableHead className="w-[80px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Form</TableHead>
            <TableHead className="w-[80px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Captain</TableHead>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Transfers In</TableHead>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Transfers Out</TableHead>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Next Fixture</TableHead>
            <TableHead className="w-[110px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Expected Points</TableHead>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Bonus Points</TableHead>
            <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-gray-500 text-center">Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index} className="hover:bg-gray-50 border-b">
              <TableCell className="py-4 text-center">
                <div className="w-10 h-14 relative mx-auto">
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="absolute w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://fantasy.premierleague.com/img/shirts/standard/shirt_0-66.png";
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="text-xs text-center">{player.position}</TableCell>
              <TableCell className="text-xs text-center font-medium">{player.name}</TableCell>
              <TableCell className="text-xs text-center">{player.team}</TableCell>
              <TableCell className="text-xs text-center">£{player.price.toFixed(1)}</TableCell>
              <TableCell className="text-xs text-center">{player.ownership}</TableCell>
              <TableCell className="text-xs text-center">{Math.round(player.ownershipPercentage)}%</TableCell>
              <TableCell className="text-xs text-center">{player.form.toFixed(1)}</TableCell>
              <TableCell className="text-xs text-center">{player.captainCount || 0}</TableCell>
              <TableCell className="text-xs text-center">{player.transfersIn.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-center">{player.transfersOut.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-center">{player.nextFixture}</TableCell>
              <TableCell className="text-xs text-center">{player.expectedPoints.toFixed(1)}</TableCell>
              <TableCell className="text-xs text-center">{player.bonusPoints}</TableCell>
              <TableCell className="text-xs text-center font-medium">{player.totalPoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}