"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("")
  const [contact, setcontact] = useState([]);
  const [created, setCreated] = useState(false);
  const contactNameRef = useRef();

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
    console.log(response.contact);
    setcontact(response.contact);
  }

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
    setCreated(true)
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div>
        {contact.map((contact, id) => (
          <div key={id}>
            <ul>
              <li>
                {contact.id} - {contact.Name} - {contact.number}
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={name}
          name=""
          id=""
          onChange={(e) => {
            setName(e.target.value);
          }}
          ref={contactNameRef}
          className=" text-black"
        />
      </div>
      <div>
        <input
          type="text"
          value={number}
          name=""
          id=""
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          className=" text-black mt-4"
        />
      </div>
      {created ? <div>Name is add</div> : null}
      <div>
        <input
          type="button"
          value="save"
          onClick={addContact}
          className="cursor-pointer pl-3"
        />
      </div>
    </>
  );
}
