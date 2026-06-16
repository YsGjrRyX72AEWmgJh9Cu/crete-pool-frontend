"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [raceTo, setRaceTo] = useState(9);
  const [gameType, setGameType] = useState("9-ball");

  const [search, setSearch] = useState("");

  async function loadLeaderboard() {
    const response = await fetch(
      "https://crete-pool-backend-production.up.railway.app/leaderboard",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();
    setLeaderboard(data);
  }

  async function loadPlayers() {
    const response = await fetch(
      "https://crete-pool-backend-production.up.railway.app/players",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();
    setPlayers(data);
  }

  useEffect(() => {
    loadLeaderboard();
    loadPlayers();
  }, []);

  const filteredLeaderboard = leaderboard.filter((player) =>
  player.full_name
    .toLowerCase()
    .includes(search.toLowerCase())
);

  async function submitMatch(e: any) {
    e.preventDefault();

    const response = await fetch(
      "https://crete-pool-backend-production.up.railway.app/submit-match",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          player_a_id: Number(playerA),
          player_b_id: Number(playerB),
          score_a: Number(scoreA),
          score_b: Number(scoreB),
          race_to: Number(raceTo),
          game_type: gameType,
        }),
      }
    );

    if (response.ok) {
      alert("Match submitted!");

      loadLeaderboard();

      setScoreA(0);
      setScoreB(0);
    } else {
      const error = await response.json();
      alert(error.detail);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-12">
      <h1 className="text-6xl font-bold mb-4">
        Crete Pool Rating
      </h1>

      <p className="text-2xl text-zinc-300 mb-10">
        Official pool ranking system of Crete
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Leaderboard */}
        <div className="bg-zinc-900 rounded-3xl p-8">
          <h2 className="text-4xl font-bold mb-6">
            Leaderboard
          </h2>
          
          <input
  type="text"
  placeholder="Search player..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full bg-zinc-800 p-4 rounded-2xl mb-6"
/>

          <div className="space-y-4">

            {filteredLeaderboard.map((player, index) => (

              <Link
                href={`/player/${player.id}`}
                key={player.id}
              >

                <div className="bg-zinc-800 rounded-2xl p-5 flex justify-between hover:bg-zinc-700 transition cursor-pointer">

                  <div>
                    <p className="text-2xl font-semibold">

                       {index === 0 && "🥇 "}
                       {index === 1 && "🥈 "}
                       {index === 2 && "🥉 "}

                      #{index + 1} {player.full_name}
                    </p>

                    <div className="flex items-center gap-3 mt-1">

  <p className="text-zinc-400">
    {player.city}
  </p>

  <span
    className={
      player.category === "Master"
        ? "bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm"
        : player.category === "A"
        ? "bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
        : player.category === "B"
        ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
        : player.category === "C"
        ? "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
        : "bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-sm"
    }
  >
    {player.category}
  </span>

</div>
  
</div>

                  <div className="text-right">

                    <p className="text-2xl font-bold">
                      {player.current_rating}
                    </p>

                    <p className="text-zinc-400">
                      rating
                    </p>

                    <p className="text-green-400 text-sm mt-1">
                      {player.wins}W - {player.losses}L
                    </p>

                    <p className="mt-2 text-xl">

                      {player.movement === "up" && "⬆️"}
                      {player.movement === "down" && "⬇️"}
                      {player.movement === "same" && "➖"}

                    </p>
                    <p className="text-zinc-400 text-sm mt-1">

                      {player.matches_played > 0
                        ? Math.round(
                            (player.wins /
                              player.matches_played) * 100
                          )
                        : 0}
                      % WR

                    </p>
                    
                  <div className="flex gap-1 mt-2 justify-end">

                    {player.recent_form?.map(
                      (result: string, i: number) => (

                        <div
                          key={i}
                          className={
                            result === "W"
                              ? "w-6 h-6 rounded-full bg-green-500 text-black text-xs flex items-center justify-center font-bold"
                              : "w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
                          }
                        >
                          {result}
                        </div>

                      )
                    )}

                  </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>
        </div>

        {/* Submit Match */}
        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-6">
            Submit Match
          </h2>

          <form
            onSubmit={submitMatch}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-zinc-300">
                Player A
              </label>

              <select
                value={playerA}
                onChange={(e) =>
                  setPlayerA(e.target.value)
                }
                className="w-full bg-zinc-800 p-4 rounded-xl"
                required
              >

                <option value="">
                  Select player
                </option>

                {players.map((player) => (
                  <option
                    key={player.id}
                    value={player.id}
                  >
                    {player.full_name}
                  </option>
                ))}

              </select>
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">
                Player B
              </label>

              <select
                value={playerB}
                onChange={(e) =>
                  setPlayerB(e.target.value)
                }
                className="w-full bg-zinc-800 p-4 rounded-xl"
                required
              >

                <option value="">
                  Select player
                </option>

                {players.map((player) => (
                  <option
                    key={player.id}
                    value={player.id}
                  >
                    {player.full_name}
                  </option>
                ))}

              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                placeholder="Score A"
                value={scoreA}
                onChange={(e) =>
                  setScoreA(Number(e.target.value))
                }
                className="bg-zinc-800 p-4 rounded-xl"
              />

              <input
                type="number"
                placeholder="Score B"
                value={scoreB}
                onChange={(e) =>
                  setScoreB(Number(e.target.value))
                }
                className="bg-zinc-800 p-4 rounded-xl"
              />

            </div>

            <div>
              <label className="block mb-2 text-zinc-300">
                Race To
              </label>

              <input
                type="number"
                value={raceTo}
                onChange={(e) =>
                  setRaceTo(Number(e.target.value))
                }
                className="w-full bg-zinc-800 p-4 rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">
                Game Type
              </label>

              <select
                value={gameType}
                onChange={(e) =>
                  setGameType(e.target.value)
                }
                className="w-full bg-zinc-800 p-4 rounded-xl"
              >

                <option>9-ball</option>
                <option>8-ball</option>
                <option>10-ball</option>

              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold p-4 rounded-xl hover:bg-zinc-300 transition"
            >
              Submit Match
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}