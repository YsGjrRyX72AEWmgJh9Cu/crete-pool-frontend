"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PlayersPage() {

  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function loadPlayers() {

    const response = await fetch(
      "http://127.0.0.1:8000/players",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    setPlayers(data);
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.full_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto sticky top-0 z-50 bg-black pb-6">

        <h1 className="text-6xl font-bold mb-4">
          Players
        </h1>

        <p className="text-2xl text-zinc-400 mb-10">
          All registered pool players
        </p>

        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-zinc-900 rounded-2xl p-4 md:p-5 mb-8 text-base md:text-xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredPlayers.map((player) => (

            <Link
              key={player.id}
              href={`/player/${player.id}`}
            >

              <div
                className={
                  player.current_rating === filteredPlayers[0]?.current_rating
                    ? "bg-yellow-500 text-black rounded-3xl p-6 transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    : player.current_rating === filteredPlayers[1]?.current_rating
                    ? "bg-zinc-300 text-black rounded-3xl p-6 transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    : player.current_rating === filteredPlayers[2]?.current_rating
                    ? "bg-orange-600 text-white rounded-3xl p-6 transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    : "bg-zinc-900 text-white rounded-3xl p-6 hover:bg-zinc-800 transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                }
              >

                <div className="flex items-center justify-between mb-4">
                  
                  <div>

                     <p className="text-sm font-bold opacity-70 mb-2">

                       #{filteredPlayers.indexOf(player) + 1}

                        {player.movement === "up" && " ⬆️"}
                        {player.movement === "down" && " ⬇️"}
                       {player.movement === "same" && " ➖"}

                     </p>

                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">

                      {filteredPlayers.indexOf(player) === 0 && (
                        <span>👑</span>
                      )}

                      {player.full_name}

                    </h2>

                    <p className="text-zinc-400">
                      {player.city}
                    </p>

                    <div className="mt-3">

                      <span
                        className={
                          player.category === "Pro"
                            ? "bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                            : player.category === "A+"
                            ? "bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                            : player.category === "A"
                            ? "bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                            : player.category === "B"
                            ? "bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                            : "bg-zinc-700 text-white px-3 py-1 rounded-full text-sm font-bold"
                         }
                      >
                         {player.category}
                      </span>

                    </div>

                    <div className="mt-3">

                      {player.current_streak > 0 && (

                        <span
                         className={
                           player.streak_type === "win"
                           ? "bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                           : "bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                         }
                        >

                         {player.streak_type === "win"
                           ? `🔥 W${player.current_streak}`
                           : `❌ L${player.current_streak}`}

                        </span>

                      )}

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl md:text-3xl font-bold">
                      {player.current_rating}
                    </p>

                    <p className="text-zinc-500">
                      rating
                    </p>

                  </div>

                </div>

                <div
                  className={
                     player.current_rating === filteredPlayers[1]?.current_rating
                       ? "flex flex-col md:flex-row gap-2 md:justify-between mt-6 text-black"
                       : "flex flex-col md:flex-row gap-2 md:justify-between mt-6 text-zinc-300"
                   }
                >

                  <div>
                    Wins: {player.wins}
                  </div>

                  <div>
                    Losses: {player.losses}
                  </div>

                  <div>
                    WR:{" "}

                     {player.matches_played > 0
                       ? Math.round(
                          (player.wins /
                            player.matches_played) *
                            100
                         )
                       : 0}
                    %
                 </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}
