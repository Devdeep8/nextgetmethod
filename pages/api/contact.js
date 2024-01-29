import { query } from "@/pages/lib/db";

export default async function handler(req, res) {
  let message;
  if (req.method === "GET") {
    const contact = await query({
      query: "SELECT * FROM manage",
      values: [],
    });
    res.status(200).json({ contact: contact });
    
  } else if (req.method === "POST") {
    const Name = req.body.Name;
    const number = req.body.number;
    const newName = await query({
      query: "INSERT INTO manage (Name , number) VALUES (? , ?)",
      values: [Name , number],
    });
    if (newName.insertId) {
      message = "sucess";
    } else {
      message = "error";
    }
    let contact = {
      id: newName.insertId,
      Name: Name,
      number: number,
    };
    res.status(200).json({ response: { message: message, contact: contact } });
  }
  else if (req.method === "PUT"){
    const id = req.body.id
    const Name = req.body.Name
    const number = req.body.number
    const updateContact = await query({
      query: "UPDATE manage SET Name = ? , number = ? WHERE id = ? ",
      values: [Name , number , id]
    })
    const results = updateContact.affectedRows;
    if(results){
      message = "sucess"
    }else{
      message = "error"
    }

    const contact = {
      id : id,
      Name : Name,
      number : number,
    };
    res.status(200).json({ response : { message : message , contact : contact}})
  }
}
