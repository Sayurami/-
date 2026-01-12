const axios = require('axios');

// API Key and Base URL
const apiKey = '4d3d074f107f44e09123d19ed6a89950'; // Replace with your actual API key
const baseUrl = 'http://api.football-data.org/v4/';

// Helper function to fetch data from football-data.org
async function fetchFootballData(endpoint) {
    try {
        const response = await axios.get(`${baseUrl}${endpoint}`, {
            headers: { 'X-Auth-Token': apiKey },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

// Get UCL Standings
async function uclStandings() {
    const data = await fetchFootballData('competitions/CL/standings');
    const competition = data.competition?.name || 'Unknown League';
    const standings = data.standings?.[0]?.table || [];

    if (standings.length === 0) {
        throw new Error('No standings data found.');
    }

    return {
        competition,
        standings: standings.slice(0, 8).map((team) => ({
            position: team.position,
            team: team.team.name,
            played: team.playedGames,
            won: team.won,
            draw: team.draw,
            lost: team.lost,
            points: team.points,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
        })),
    };
}

// Get UCL Matches
async function uclMatches() {
    const data = await fetchFootballData('competitions/CL/matches');
    const competition = data.competition?.name || 'Unknown League';
    const matches = data.matches || [];

    if (matches.length === 0) {
        throw new Error('No matches data found.');
    }

    return {
        competition,
        matches: matches.slice(0, 15).map((match) => ({
            matchday: match.matchday || 'N/A',
            status: match.status || 'N/A',
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            score: `${match.score.fullTime.home ?? '-'} - ${match.score.fullTime.away ?? '-'}`,
            winner: match.score.winner === 'HOME_TEAM' ? match.homeTeam.name : match.score.winner === 'AWAY_TEAM' ? match.awayTeam.name : 'Draw',
        })),
    };
}

// Get UCL Top Scorers
async function uclTopScorers() {
    const data = await fetchFootballData('competitions/CL/scorers');
    const competition = data.competition?.name || 'Unknown League';
    const scorers = data.scorers || [];

    if (scorers.length === 0) {
        throw new Error('No scorers data found.');
    }

    return {
        competition,
        topScorers: scorers.slice(0, 10).map((scorer, index) => ({
            rank: index + 1,
            player: scorer.player.name,
            team: scorer.team.name,
            goals: scorer.goals,
            assists: scorer.assists || 'N/A',
            penalties: scorer.penalties || 'N/A',
        })),
    };
}

// Get UCL Upcoming Matches
async function uclUpcomingMatches() {
    const data = await fetchFootballData('competitions/CL/matches');
    const competition = data.competition?.name || 'Unknown League';
    const today = new Date().toISOString().split('T')[0];
    const upcomingMatches = data.matches.filter((match) => match.utcDate >= today);

    if (upcomingMatches.length === 0) {
        throw new Error('No upcoming matches found.');
    }

    return {
        competition,
        upcomingMatches: upcomingMatches.slice(0, 15).map((match) => ({
            matchday: match.matchday || 'N/A',
            date: new Date(match.utcDate).toLocaleString(),
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
        })),
    };
}

// Export the functions
module.exports = {
    uclStandings,
    uclMatches,
    uclTopScorers,
    uclUpcomingMatches,
};
