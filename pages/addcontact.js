"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [created, setCreated] = useState(false);

  const addContact = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        Name: name,
        number: number,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setCreated(true);
  };

  return (
    <>
      <form onSubmit={addContact}>
        <div className="mt-4">
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 text-black"
            placeholder="Name"
          />
        </div>

        <div className="mt-4 text-black">
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border p-2"
            placeholder="Number"
            required
          />
        </div>

        {created ? (
          <div className="text-green-500 mt-2">Name is added</div>
        ) : null}

        <div className="mt-4">
          <button className="bg-blue-500 text-white p-2 mr-2 cursor-pointer">
            Save
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white p-2 cursor-pointer"
      >
        Home
      </button>
    </>
  );
}
