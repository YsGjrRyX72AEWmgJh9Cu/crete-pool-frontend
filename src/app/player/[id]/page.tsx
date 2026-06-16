"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [playerId, setPlayerId] = useState("");

  const [player, setPlayer] = useState<any>(null);

  const [matches, setMatches] = useState<any[]>([]);

  const [history, setHistory] = useState<any[]>([]);

  const [recentForm, setRecentForm] = useState<string[]>([]);

  async function loadPlayer() {

    const response = await fetch(
      `https://crete-pool-backend-production.up.railway.app/player/${playerId}`
    );

    const data = await response.json();

    setPlayer(data.player);

    setMatches(data.recent_matches);

    setRecentForm(data.recent_form || []);
  }

  async function loadHistory() {

    const response = await fetch(
      `https://crete-pool-backend-production.up.railway.app/player/${playerId}/rating-history`
    );

    const data = await response.json();

    const formatted = data
      .reverse()
      .map((item: any, index: number) => ({

        match: index + 1,

        rating:
          Number(item.new_rating) ||
          Number(item.current_rating) ||
          0,
      }));

    setHistory(formatted);
  }

  useEffect(() => {

    async function init() {

      const resolvedParams = await params;

      setPlayerId(resolvedParams.id);
    }

    init();

  }, [params]);

  useEffect(() => {

    if (playerId) {

      loadPlayer();

      loadHistory();
    }

  }, [playerId]);

  if (!player) {

    return (
      <main className="min-h-screen bg-black text-white p-8">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* Player Info */}

        <div className="bg-zinc-900 rounded-3xl p-8 mb-8">

          <h1 className="text-5xl font-bold mb-2 flex items-center gap-4">

            {player.current_rating >= 600 && (
              <span>👑</span>
            )}

            {player.full_name}

          </h1>

          <p className="text-zinc-400 text-xl">
            {player.city}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">

            <div className="bg-zinc-800 p-5 rounded-2xl">

              <p className="text-zinc-400 mb-1">
                Rating
              </p>

              <p className="text-3xl font-bold">
                {player.current_rating}
              </p>

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              <p className="text-zinc-400 mb-1">
                Category
              </p>

              <p className="text-3xl font-bold">
                {player.category}
              </p>

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              <p className="text-zinc-400 mb-1">
                Wins
              </p>

              <p className="text-3xl font-bold">
                {player.wins}
              </p>

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              <p className="text-zinc-400 mb-1">
                Losses
              </p>

              <p className="text-3xl font-bold">
                {player.losses}
              </p>

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              <p className="text-zinc-400 mb-1">
                Streak
              </p>

              <p className="text-3xl font-bold">

                {recentForm.length > 0 ? (

                  recentForm[0] === "W"
                     ? `🔥 W${recentForm.filter(
                         (r) => r === "W"
                       ).length}`
                     : `❌ L${recentForm.filter(
                         (r) => r === "L"
                       ).length}`

                ) : "-"}

              </p>

          </div>

          </div>
        </div>
<div className="bg-zinc-900 rounded-3xl p-8 mb-8">

  <h2 className="text-3xl font-bold mb-6">
    Recent Form
  </h2>

  <div className="flex gap-4">

    {recentForm.map((result, index) => (

      <div
        key={index}
        className={
          result === "W"
            ? "w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-2xl font-bold"
            : "w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center text-2xl font-bold"
        }
      >
        {result}
      </div>

    ))}

  </div>
</div>
        {/* Rating Graph */}

        <div className="bg-zinc-900 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Rating Progression
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={history}>

                <XAxis dataKey="match" />

                <YAxis
                  domain={["dataMin - 10", "dataMax + 10"]}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#22c55e"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>
        </div>

        {/* Recent Matches */}

        <div className="bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Matches
          </h2>

          <div className="space-y-4">

            {matches.map((match: any) => (

              <div
                key={match.id}
                className="bg-zinc-800 rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <p className="text-xl font-semibold">
                    {match.player_a}
                    {" vs "}
                    {match.player_b}
                  </p>

                  <p className="text-zinc-400">
                    {match.game_type}
                  </p>

                </div>

                <div className="text-2xl font-bold">
                  {match.score_a} - {match.score_b}
                </div>

              </div>

            ))}

          </div>
        </div>
      </div>
    </main>
  );
}