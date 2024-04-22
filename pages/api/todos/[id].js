import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const client = await MongoClient.connect(
      "mongodb+srv://sudhirkumar10397:LbVP11B5VfoXcPDm@cluster0.wrztaxt.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const query = { _id: new ObjectId(id) };
    const result = await todosCollection.deleteOne(query);
    client.close();
    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ message: "Successfully deleted one document.", ok: true });
    } else {
      res.status(404).json({
        message: "No documents matched the query. Deleted 0 documents.",
        ok: false,
      });
    }
  }
  if (req.method === "PATCH") {
    const { id } = req.query;
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://sudhirkumar10397:LbVP11B5VfoXcPDm@cluster0.wrztaxt.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const query = { _id: new ObjectId(id) };
    const updates = { $set: data };
    const options = { upsert: false };
    const result = await todosCollection.updateOne(query, updates, options);
    client.close();
    res.status(201).json(result);
  }
}
