// Update the PROXY_URL to point to your Cloudflare Worker
const PROXY_URL = 'https://fpl-elite-insights.fantasyleaguemasterminds.workers.dev/api';

export interface FplPlayer {
  id: number;
  code: number;
  element_type: number;
  web_name: string;
  team: number;
  now_cost: number;
  form: string;
  transfers_in_event: number;
  transfers_out_event: number;
  ep_next: string;
  bonus: number;
  total_points: number;
}

export interface FplTeam {
  id: number;
  name: string;
  short_name: string;
}

export interface FplFixture {
  event: number;
  team_h: number;
  team_a: number;
  finished: boolean;
}

export interface FplPick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
}

export interface FplLeagueStanding {
  entry: number;
}

// Cache for various data
let bootstrapCache: any = null;
let fixturesCache: FplFixture[] = [];
let ownershipCache: { [key: number]: number } = {};
let captainCache: { [key: number]: number } = {};
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchWithRetry = async (endpoint: string, retries = 3): Promise<any> => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${PROXY_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      lastError = error;
      
      if (i === retries - 1) {
        throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
      }
      
      // Wait before retrying (1s, 2s, 4s)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

export const getBootstrapData = async () => {
  const now = Date.now();
  if (bootstrapCache && now - lastFetchTime < CACHE_DURATION) {
    return bootstrapCache;
  }

  try {
    console.log('Fetching bootstrap data...');
    const data = await fetchWithRetry('/bootstrap-static/');
    bootstrapCache = data;
    lastFetchTime = now;
    console.log('Bootstrap data fetched successfully');
    return data;
  } catch (error) {
    console.error('Failed to fetch bootstrap data:', error);
    throw error;
  }
};

export const getFixtures = async () => {
  if (fixturesCache.length === 0) {
    try {
      console.log('Fetching fixtures data...');
      fixturesCache = await fetchWithRetry('/fixtures/');
      console.log('Fixtures data fetched successfully');
    } catch (error) {
      console.error('Failed to fetch fixtures:', error);
      throw error;
    }
  }
  return fixturesCache;
};

export const getTop50Teams = async () => {
  try {
    console.log('Fetching top 50 teams...');
    const data = await fetchWithRetry('/leagues-classic/314/standings/');
    console.log('Top 50 teams fetched successfully');
    return data.standings.results.slice(0, 50);
  } catch (error) {
    console.error('Failed to fetch top 50 teams:', error);
    throw error;
  }
};

export const getTeamPicks = async (teamId: number, eventId: number) => {
  try {
    console.log(`Fetching picks for team ${teamId} event ${eventId}...`);
    const data = await fetchWithRetry(`/entry/${teamId}/event/${eventId}/picks/`);
    console.log(`Picks fetched successfully for team ${teamId}`);
    return data.picks;
  } catch (error) {
    console.error(`Failed to fetch picks for team ${teamId}:`, error);
    throw error;
  }
};

export const calculateOwnership = async (players: FplPlayer[]) => {
  try {
    console.log('Calculating ownership...');
    
    // Check cache first
    const now = Date.now();
    if (Object.keys(ownershipCache).length > 0 && now - lastFetchTime < CACHE_DURATION) {
      console.log('Returning cached ownership data');
      return ownershipCache;
    }

    const top50 = await getTop50Teams();
    const bootstrapData = await getBootstrapData();
    const currentEvent = bootstrapData.events.find((e: any) => e.is_current).id;
    
    const playerCounts: { [key: number]: number } = {};
    players.forEach(player => {
      playerCounts[player.id] = 0;
    });

    // Process teams in batches of 5 with delays
    const batchSize = 5;
    for (let i = 0; i < top50.length; i += batchSize) {
      const batch = top50.slice(i, i + batchSize);
      
      // Process batch
      await Promise.all(batch.map(async (team) => {
        try {
          const picks = await getTeamPicks(team.entry, currentEvent);
          picks.forEach((pick: FplPick) => {
            if (playerCounts[pick.element] !== undefined) {
              playerCounts[pick.element]++;
            }
          });
        } catch (error) {
          console.error(`Error fetching picks for team ${team.entry}:`, error);
        }
      }));
      
      // Add delay between batches (2 seconds)
      if (i + batchSize < top50.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Update cache
    ownershipCache = playerCounts;
    lastFetchTime = now;

    console.log('Ownership calculation completed');
    return playerCounts;
  } catch (error) {
    console.error('Failed to calculate ownership:', error);
    throw error;
  }
};

export const getCaptainCounts = async (players: FplPlayer[]) => {
  try {
    console.log('Getting captain counts...');
    
    // Check cache first
    const now = Date.now();
    if (Object.keys(captainCache).length > 0 && now - lastFetchTime < CACHE_DURATION) {
      console.log('Returning cached captain data');
      return captainCache;
    }

    const top50 = await getTop50Teams();
    const bootstrapData = await getBootstrapData();
    const currentEvent = bootstrapData.events.find((e: any) => e.is_current).id;
    
    const captainCounts: { [key: number]: number } = {};
    players.forEach(player => {
      captainCounts[player.id] = 0;
    });

    // Process teams in batches of 5 with delays
    const batchSize = 5;
    for (let i = 0; i < top50.length; i += batchSize) {
      const batch = top50.slice(i, i + batchSize);
      
      // Process batch
      await Promise.all(batch.map(async (team) => {
        try {
          const picks = await getTeamPicks(team.entry, currentEvent);
          picks.forEach((pick: FplPick) => {
            if (captainCounts[pick.element] !== undefined && pick.is_captain) {
              captainCounts[pick.element]++;
            }
          });
        } catch (error) {
          console.error(`Error fetching picks for team ${team.entry}:`, error);
        }
      }));
      
      // Add delay between batches (2 seconds)
      if (i + batchSize < top50.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Update cache
    captainCache = captainCounts;
    lastFetchTime = now;

    console.log('Captain count calculation completed');
    return captainCounts;
  } catch (error) {
    console.error('Failed to get captain counts:', error);
    throw error;
  }
};