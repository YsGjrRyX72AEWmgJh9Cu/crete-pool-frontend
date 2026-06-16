"use client";

import { useState } from "react";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {

  const response = await fetch(
    "https://crete-pool-backend-production.up.railway.app/admin-login",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password,
      }),
    }
  );

  if (response.ok) {

    localStorage.setItem(
      "isAdmin",
      "true"
    );

    window.location.href = "/admin";

  } else {

    alert("Wrong password");
  }
}

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mb-6"
        />

        <button
          onClick={login}
          className="w-full bg-white text-black font-bold p-4 rounded-2xl"
        >
          Login
        </button>

      </div>

    </main>
  );
}