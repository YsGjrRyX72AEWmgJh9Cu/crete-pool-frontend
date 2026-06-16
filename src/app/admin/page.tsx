"use client";

import { useEffect } from "react";

export default function AdminPage() {

  useEffect(() => {

    const isAdmin =
      localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {

      window.location.href = "/login";
    }

  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="bg-zinc-900 rounded-3xl p-6">

        <p className="text-zinc-300">
          Welcome admin 👑
        </p>
<button
  onClick={() => {

    localStorage.removeItem(
      "isAdmin"
    );

    window.location.href = "/login";

  }}
  className="mt-6 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-bold"
>
  Logout
</button>

      </div>

    </main>
  );
}