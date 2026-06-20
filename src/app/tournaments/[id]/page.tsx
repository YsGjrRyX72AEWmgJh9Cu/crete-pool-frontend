"use client";

import { useEffect, useState } from "react";

export default function TournamentDetailsPage() {

  const [tournament, setTournament] = useState<any>(null);

  const [players, setPlayers] = useState<any[]>([]);

  const [tournamentPlayers, setTournamentPlayers] = useState<any[]>([]);

  const [matches, setMatches] = useState<any[]>([]);

  const [scoreA, setScoreA] = useState(0);

  const [scoreB, setScoreB] = useState(0);

  const [selectedMatch, setSelectedMatch] =
    useState<number | null>(null);

  async function loadTournament() {

    const path = window.location.pathname;

    const id = path.split("/").pop();

    const response = await fetch(
      `https://crete-pool-backend-production.up.railway.app/tournaments`
    );

    const data = await response.json();

    const foundTournament = data.find(
      (t: any) => t.id === Number(id)
    );
    
    const playersResponse = await fetch(
      "https://crete-pool-backend-production.up.railway.app/players"
    );

    const playersData = await playersResponse.json();

    setPlayers(playersData);

    const tournamentPlayersResponse = await fetch(
      `https://crete-pool-backend-production.up.railway.app/tournament/${id}/players`
    );

    const tournamentPlayersData =
      await tournamentPlayersResponse.json();

    setTournamentPlayers(
      tournamentPlayersData
    );

    const matchesResponse = await fetch(
      `http://127.0.0.1:8000/tournament/${id}/matches`
    );

    const matchesData =
      await matchesResponse.json();

    setMatches(matchesData);

    setTournament(foundTournament);
  }

  useEffect(() => {

    loadTournament();

  }, []);

  async function addPlayer(playerId: number) {

    const path = window.location.pathname;

    const tournamentId = path.split("/").pop();

    const response = await fetch(
      "https://crete-pool-backend-production.up.railway.app/add-player-to-tournament",
      {
        method: "POST",

        headers: {
        "Content-Type": "application/json",
        },

        body: JSON.stringify({
          tournament_id: Number(tournamentId),
          player_id: playerId,
        }),
      }
    );

    if (response.ok) {

      alert("Player added");

    } else {

      alert("Error adding player");
    }
  }
  
async function generateBracket() {

  const path = window.location.pathname;

  const tournamentId = path.split("/").pop();

  const response = await fetch(
    `http://127.0.0.1:8000/tournament/${tournamentId}/generate-bracket`,
    {
      method: "POST",
    }
  );

  if (response.ok) {

    alert("Bracket generated");

    loadTournament();

  } else {

    alert("Error generating bracket");
  }
}

async function submitTournamentResult(
  matchId: number
) {

  const response = await fetch(
    `http://127.0.0.1:8000/tournament-match/${matchId}/submit`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        score_a: scoreA,
        score_b: scoreB,
      }),
    }
  );

  if (response.ok) {

    alert("Result submitted");

    loadTournament();

  } else {

    alert("Error submitting result");
  }
}

  if (!tournament) {

    return (
      <main className="min-h-screen bg-black text-white p-8">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-4">
        {tournament.name}
      </h1>

      <div className="bg-zinc-900 rounded-3xl p-6 max-w-2xl">

        <p className="text-zinc-400 text-xl">
          {tournament.game_type}
        </p>

        <p className="text-zinc-400 text-xl mt-2">
          Race to {tournament.race_to}
        </p>

        <p className="mt-4 inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
          {tournament.status}
        </p>

        <button
          onClick={generateBracket}
          className="block mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold"
        >
          Generate Bracket
        </button>

      </div>

      <div className="mt-10 bg-zinc-900 rounded-3xl p-6 max-w-2xl">

  <h2 className="text-3xl font-bold mb-6">
    Players
  </h2>

  <div className="space-y-3">

    {players.map((player) => (

      <div
        key={player.id}
        className="bg-zinc-800 rounded-2xl p-4 flex justify-between items-center"
      >

        <div>

          <p className="font-bold text-xl">
            {player.full_name}
          </p>

          <p className="text-zinc-400">
            {player.city}
          </p>

        </div>

        <button
          onClick={() => addPlayer(player.id)}
          className="bg-white text-black px-5 py-2 rounded-xl font-bold"
        >
          Add
        </button>

      </div>

    ))}

  </div>

</div>

<div className="mt-10 bg-zinc-900 rounded-3xl p-6 max-w-2xl">

  <h2 className="text-3xl font-bold mb-6">
    Registered Players
  </h2>

  <div className="space-y-3">

    {tournamentPlayers.map((player) => (

      <div
        key={player.id}
        className="bg-zinc-800 rounded-2xl p-4"
      >

        <p className="font-bold text-xl">
          {player.full_name}
        </p>

        <p className="text-zinc-400">
          {player.city}
        </p>

      </div>

    ))}

  </div>

</div>

<div className="mt-10 bg-zinc-900 rounded-3xl p-6 max-w-2xl">

  <h2 className="text-3xl font-bold mb-6">
    Tournament Matches
  </h2>

  <div className="space-y-3">

    {matches.map((match) => (

      <div
        key={match.id}
        className="bg-zinc-800 rounded-2xl p-4"
      >

        <p className="font-bold text-xl">
          {match.player_a_name}
        </p>

        <p className="text-center text-zinc-400 my-2">
          VS
        </p>

        <p className="font-bold text-xl">
          {match.player_b_name}
        </p>

        <p className="mt-3 text-green-400">
          {match.status}
        </p>

        {match.status === "pending" && (

  <div className="mt-4 space-y-3">

    <input
      type="number"
      placeholder="Score A"
      onChange={(e) =>
        setScoreA(Number(e.target.value))
      }
      className="w-full bg-zinc-700 p-3 rounded-xl"
    />

    <input
      type="number"
      placeholder="Score B"
      onChange={(e) =>
        setScoreB(Number(e.target.value))
      }
      className="w-full bg-zinc-700 p-3 rounded-xl"
    />

    <button
      onClick={() =>
        submitTournamentResult(match.id)
      }
      className="bg-white text-black px-4 py-2 rounded-xl font-bold"
    >
      Submit Result
    </button>

  </div>

)}

      </div>

    ))}

  </div>

</div>
    </main>
  );
}
