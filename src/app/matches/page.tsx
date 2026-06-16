"use client";

import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    const res = await fetch(
      "https://crete-pool-backend-production.up.railway.app/matches"
    );

    const data = await res.json();

    setMatches(data);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-8">Match History</h1>

      <div className="space-y-4">
        {matches.map((match: any) => (
          <div
            key={match.id}
            className="bg-zinc-900 p-6 rounded-2xl"
          >
            <div className="text-2xl font-bold">
              {match.player_a_name} vs {match.player_b_name}
            </div>

            <div className="text-zinc-400 mt-2">
              {match.score_a} - {match.score_b}
            </div>

            <div className="mt-2 text-green-400">
              Winner: {match.winner_name}
            </div>

            <div className="mt-2 text-sm text-zinc-500">
              {match.game_type}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}