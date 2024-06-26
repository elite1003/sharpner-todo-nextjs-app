import React from "react";
import Todo from "@/components/Todo/Todo";
import { MongoClient } from "mongodb";

export default function HomePage({ todos }) {
  return <Todo todos={todos} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sudhirkumar10397:LbVP11B5VfoXcPDm@cluster0.wrztaxt.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find({ isCompleted: false }).toArray();
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        ...todo,
        _id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
