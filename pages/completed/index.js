import React from "react";
import TodoCompleted from "@/components/Todo/TodoCompleted";
import { MongoClient } from "mongodb";

export default function TodoCompletedPage({ todos }) {
  return <TodoCompleted todos={todos} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sudhirkumar10397:LbVP11B5VfoXcPDm@cluster0.wrztaxt.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find({ isCompleted: true }).toArray();
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
