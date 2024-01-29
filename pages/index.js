"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [number, setNumber] = useState("");
  const [updateNumber, setUpdateNumber] = useState("");
  const [contact, setcontact] = useState([]);
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [id, setId] = useState("");
  const contactNameRef = useRef();
  const contactUpdateRef = useRef();
  const contactUpdateIdRef = useRef();
  const contactUpdateNameRef = useRef();
  const contactUpdateNumberRef = useRef();

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
    setCreated(true);
  };

  const updateContact = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/contact`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: id,
            Name: updateName,
            number: updateNumber,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setUpdated(true);
    
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
      <div ref={contactUpdateRef} className="flex text-black ">
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
    </>
  );
}
