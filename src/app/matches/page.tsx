"use client";

import { useEffect, useState } from "react";

export default function MatchesPage() {

  const [matches, setMatches] = useState<any[]>([]);

  async function loadMatches() {

    const response = await fetch(
      "http://127.0.0.1:8000/matches",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    setMatches(data);
  }

  useEffect(() => {
    loadMatches();
  }, []);

  async function deleteMatch(id: number) {

  const confirmed = confirm(
    "Delete this match?"
  );

  if (!confirmed) return;

  const response = await fetch(
    `http://127.0.0.1:8000/match/${id}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {

    alert("Match deleted!");

    loadMatches();

  } else {

    alert("Failed to delete match");

  }
}

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Match History
        </h1>

        <p className="text-zinc-400 mb-10">
          Recent matches from Crete Pool Rating
        </p>

        <div className="space-y-5">

          {matches.map((match) => (

            <div
              key={match.id}
              className="bg-zinc-900 rounded-3xl p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-2xl font-bold">
                    {match.player_a_name}
                  </p>

                  <p className="text-zinc-500">
                    vs
                  </p>

                  <p className="text-2xl font-bold">
                    {match.player_b_name}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-4xl font-bold">
                    {match.score_a}
                    {" - "}
                    {match.score_b}
                  </p>

                  <p className="text-zinc-400 mt-2">
                    Race to {match.race_to}
                  </p>

                  <p className="text-zinc-500">
                    {match.game_type}
                  </p>

                  <button
                    onClick={() =>
                      deleteMatch(match.id)
                    }
                    className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}