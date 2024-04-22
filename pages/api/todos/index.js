import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://sudhirkumar10397:LbVP11B5VfoXcPDm@cluster0.wrztaxt.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const result = await todosCollection.insertOne(data);
    client.close();
    res.status(201).json(result);
  }
}
