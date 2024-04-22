import { Fragment, useRef, useState } from "react";
import classes from "./Todo.module.css";
import { useRouter } from "next/router";
import Modal from "../UI/Modal";

const Todo = ({ todos }) => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [todosState, setTodosState] = useState(todos);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const todoInputRef = useRef(null);
  const toggleTodoModal = () => {
    setShowTodoForm((prevState) => !prevState);
  };
  const todoCompleteHandler = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("todo done failed");
      }
      const updatedTodos = todosState.filter((todo) => todo._id !== id);
      setTodosState(updatedTodos);
    } catch (error) {
      alert(error.message);
    }
  };
  const addTodosHandler = async (e) => {
    e.preventDefault();
    if (todoInputRef.current.value.trim().length === 0) return;
    const todo = {
      description: todoInputRef.current.value,
      isCompleted: false,
    };
    if (selectedEditId) {
      try {
        const response = await fetch(`/api/todos/${selectedEditId}`, {
          method: "PATCH",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("todo edit failed");
        }
        const updatedTodo = { _id: selectedEditId, ...todo };
        const editedTodoIndex = todosState.findIndex(
          (todo) => todo._id === selectedEditId
        );
        const newTodoState = todosState;
        newTodoState[editedTodoIndex] = updatedTodo;
        setTodosState(newTodoState);
        setSelectedEditId(null);
        toggleTodoModal();
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTodosState((prevState) => [
          ...prevState,
          { _id: data.insertedId, ...todo },
        ]);
        toggleTodoModal();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  const editTodo = (id, description) => {
    setShowTodoForm(true);
    setSelectedEditId(id);
  };
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
  const router = useRouter();
  return (
    <Fragment>
      {showTodoForm && (
        <Modal
          onClose={toggleTodoModal}
          addTodosHandler={addTodosHandler}
          ref={todoInputRef}
        />
      )}
      <div className={classes["todos"]}>
        <div className={classes["todos-buttons"]}>
          <button onClick={() => router.push("/completed")}>Completed</button>
          <button onClick={toggleTodoModal}>Add todo</button>
        </div>
        {todosState.length === 0 ? (
          <div className={classes["todo-empty"]}>
            <p> No Incomplete todos found</p>
          </div>
        ) : (
          <div className={classes["todo-list"]}>
            <ul>
              {todosState.map((todo) => (
                <li key={todo._id} className={classes["todo"]}>
                  <input
                    type="checkbox"
                    onChange={() => todoCompleteHandler(todo._id)}
                  />
                  <span>{todo.description}</span>
                  <div>
                    <button
                      onClick={() => editTodo(todo._id, todo.description)}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Todo;
