"use client";

import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
  const [updateName, setUpdateName] = useState("");
  const [updateNumber, setUpdateNumber] = useState("");
  const [contact, setcontact] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [id, setId] = useState("");
  const [deleteid, setDeleteId] = useState("");
  const contactUpdateRef = useRef();
  const contactUpdateIdRef = useRef();
  const contactUpdateNameRef = useRef();
  const contactUpdateNumberRef = useRef();
  const router = useRouter();

  async function getContact() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/contact`,
      postData
    );
    const response = await res.json();
    // console.log(response.contact);
    setcontact(response.contact);
  }

  const updateContact = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/contact`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        Name: updateName,
        number: updateNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setUpdated(true);
  };

  const deleteContact = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/contact`, {
      method: "DELETE",
      body: JSON.stringify({
        id: deleteid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setDeleted(true);
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div className="mt-8">
        {contact.map((contact, id) => (
          <div key={id} className="mb-2">
            <ul className="list-disc">
              <li>
                {contact.id} - {contact.Name} - {contact.number}
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={() => router.push("/addcontact")}
          className="bg-blue-500 text-white p-2 cursor-pointer"
        >
          addContact
        </button>
      </div>

      <div ref={contactUpdateRef} className="flex text-black  mt-10">
        <input
          placeholder="id..."
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className=" mr-2"
          ref={contactUpdateIdRef}
        />
        <input
          placeholder="Name..."
          type="text"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          className=" mr-2"
          ref={contactUpdateNameRef}
        />
        <input
          placeholder="number..."
          type="text"
          value={updateNumber}
          onChange={(e) => setUpdateNumber(e.target.value)}
          className=" mr-2"
          ref={contactUpdateNumberRef}
        />
      </div>
      {updated ? <div>Name is updated</div> : null}
      <div>
        <input
          type="button"
          value="update"
          onClick={updateContact}
          className=" ml-60 mt-4 cursor-pointer"
        />
      </div>

      <div className=" text-black">
        <input
          type="text"
          value={deleteid}
          onChange={(e) => setDeleteId(e.target.value)}
        />
      </div>
      {deleted ? <div>Name is updated</div> : null}
      <div>
        <input
          type="button"
          value="Delete"
          onClick={deleteContact}
          className=" cursor-pointer"
        />
      </div>
    </>
  );
}
