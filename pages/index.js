'use client';
import { Inter } from "next/font/google";
import { useEffect, useState , useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
const [contact, setcontact] = useState([])

  async function getContact (){
    const postData = {
      method : 'GET',
      headers: {
        "Contant-Type" : "application/json"
      },
    };
    const res = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/contact`,
    postData
    );
    const response = await res.json();
    console.log(response.contact)
    setcontact(response.contact)
  }

  useEffect(() => {
    getContact()
  }, [])
  
  return (
   <>
   <div>
    {contact.map((contact , id )=> (
      <div key={id}>
        <ul><li>{contact.id} - {contact.Name} - {contact.Number} </li></ul>
      </div>
    ))}
   </div>
   </>
  );
}
