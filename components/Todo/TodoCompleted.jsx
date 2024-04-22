import { useState } from "react";
import classes from "./TodoCompleted.module.css";

const TodoCompleted = ({ todos }) => {
  const [todosState, setTodosState] = useState(todos);
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("todo deletion failed");
      }
      const updatedTodos = todosState.filter((todo) => todo._id !== id);
      setTodosState(updatedTodos);
    } catch (error) {
      alert(error.message);
    }
  };
  return todosState.length === 0 ? (
    <div className={classes["todo-empty"]}>
      <p> No Completed todos found</p>
    </div>
  ) : (
    <div className={classes["todo-list"]}>
      <ul>
        {todosState.map((todo) => (
          <li key={todo._id} className={classes["todo"]}>
            <span>{todo.description}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCompleted;
