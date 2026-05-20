"use client";

import { useEffect, useState } from "react";

export default function AdminPlayersPage() {

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] =
  useState("F");
  const [editingPlayer, setEditingPlayer] =
  useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);

  async function createPlayer(e: any) {

    e.preventDefault();

    const response = await fetch(

  editingPlayer
    ? `http://127.0.0.1:8000/player/${editingPlayer.id}`
    : "http://127.0.0.1:8000/create-player",

  {
    method: editingPlayer ? "PUT" : "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      full_name: fullName,
      city: city,
      category: category,
    }),
  }
);

    if (response.ok) {

      alert(
  editingPlayer
    ? "Player updated!"
    : "Player created!"
);

      setFullName("");
      setCity("");
      setCategory("D");
      setEditingPlayer(null);

loadPlayers();

    } else {

      const error = await response.json();
      alert(error.detail);

    }
  }
  
  async function deletePlayer(id: number) {

    const confirmed = confirm(
      "Delete this player?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `http://127.0.0.1:8000/player/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {

      alert("Player deleted!");

    } else {

      alert("Failed to delete player");

    }
  }

  async function loadPlayers() {

  const response = await fetch(
    "http://127.0.0.1:8000/players"
  );

  const data = await response.json();

  setPlayers(data);
}

useEffect(() => {
  loadPlayers();
}, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Add Player
        </h1>

        <p className="text-zinc-400 mb-10">
          Create a new player profile
        </p>

        <form
          onSubmit={createPlayer}
          className="bg-zinc-900 rounded-3xl p-8 space-y-6"
        >

          <div>

            <label className="block mb-2 text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full bg-zinc-800 p-4 rounded-2xl"
              placeholder="Player full name"
              required
            />

          </div>

          <div>

            <label className="block mb-2 text-zinc-300">
              City
            </label>

            <input
              type="text"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="w-full bg-zinc-800 p-4 rounded-2xl"
              placeholder="Player city"
              required
            />

          </div>

          <div>

  <label className="block mb-2 text-zinc-300">
    Category
  </label>

  <select
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
    className="w-full bg-zinc-800 p-4 rounded-2xl"
  >

    <option>Pro</option>
    <option>A+</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
    <option>D</option>
    <option>E</option>
    <option>F</option>

  </select>

</div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold p-4 rounded-2xl hover:bg-zinc-300 transition"
          >
            Create Player
          </button>

        </form>
                <div className="mt-10 bg-zinc-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Delete Players
          </h2>

          <div className="space-y-4">

            {players.map((player: any) => (

  <div
    key={player.id}
    className="bg-zinc-800 p-4 rounded-2xl flex justify-between items-center"
  >

    <div>

      <p className="text-xl font-semibold">
        {player.full_name}
      </p>

      <p className="text-zinc-400">
        {player.city}
      </p>

    </div>

    <div className="flex gap-3">

      <button
        onClick={() => {

          setEditingPlayer(player);

          setFullName(player.full_name);
          setCity(player.city);
          setCategory(player.category);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-bold transition"
      >
        Edit
      </button>

      <button
        onClick={() =>
          deletePlayer(player.id)
        }
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold transition"
      >
        Delete
      </button>

    </div>

  </div>

))}

          </div>

        </div>

      </div>

    </main>
  );
}
