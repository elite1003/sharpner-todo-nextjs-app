import React, { forwardRef } from "react";
import classes from "./TodoForm.module.css";

const TodoForm = forwardRef(function TodoForm(props, ref) {
  const { onClose, addTodosHandler } = props;
  const todoInputRef = ref;
  return (
    <div className={classes["todo"]}>
      <form className={classes["todo-form"]} onSubmit={addTodosHandler}>
        <label htmlFor="todo">Todo : </label>
        <input type="text" name="todo" id="todo" ref={todoInputRef} />
        <div className={classes["actions"]}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Add Todo</button>
        </div>
      </form>
    </div>
  );
});

export default TodoForm;
