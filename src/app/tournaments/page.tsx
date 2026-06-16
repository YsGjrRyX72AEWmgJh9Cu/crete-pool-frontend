"use client";

import { useEffect, useState } from "react";

export default function TournamentsPage() {

  const [name, setName] = useState("");
  const [gameType, setGameType] = useState("9-ball");
  const [raceTo, setRaceTo] = useState(9);
  const [tournaments, setTournaments] = useState<any[]>([]);

  async function createTournament() {

  const response = await fetch(
    "https://crete-pool-backend-production.up.railway.app/create-tournament",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        game_type: gameType,
        race_to: raceTo,
      }),
    }
  );

  if (response.ok) {

    alert("Tournament created");

  } else {

    alert("Error creating tournament");
  }
}


async function loadTournaments() {

  const response = await fetch(
    "https://crete-pool-backend-production.up.railway.app/tournaments"
  );

  const data = await response.json();

  setTournaments(data);
}


useEffect(() => {

  loadTournaments();

}, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Tournaments
      </h1>

      <div className="bg-zinc-900 rounded-3xl p-6 max-w-xl">

        <h2 className="text-3xl font-bold mb-6">
          Create Tournament
        </h2>

        <input
          type="text"
          placeholder="Tournament name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mb-4"
        />

        <select
          value={gameType}
          onChange={(e) =>
            setGameType(e.target.value)
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mb-4"
        >
          <option>9-ball</option>
          <option>10-ball</option>
          <option>8-ball</option>
        </select>

        <input
          type="number"
          value={raceTo}
          onChange={(e) =>
            setRaceTo(Number(e.target.value))
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mb-6"
        />

        <button
          onClick={createTournament}
          className="w-full bg-white text-black font-bold p-4 rounded-2xl"
        >
          Create Tournament
        </button>

      </div>
<div className="mt-10 space-y-4">

  {tournaments.map((tournament) => (

    <a
      href={`/tournaments/${tournament.id}`}
      key={tournament.id}
      className="block bg-zinc-900 rounded-3xl p-6 hover:bg-zinc-800 transition"
     >

      <h2 className="text-2xl font-bold">
        {tournament.name}
      </h2>

      <p className="text-zinc-400 mt-2">
        {tournament.game_type}
      </p>

      <p className="text-zinc-400">
        Race to {tournament.race_to}
      </p>

      <p className="mt-3 inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full">
        {tournament.status}
      </p>

    </a>

  ))}

</div>

    </main>
  );
}