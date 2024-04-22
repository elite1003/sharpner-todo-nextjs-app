import { Fragment, forwardRef } from "react";
import classes from "./Modal.module.css";
import TodoForm from "../Todo/TodoForm";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const Modal = forwardRef(function Modal(props, ref) {
  return (
    <Fragment>
      <Backdrop onClick={props.onClose} />
      <TodoForm
        onClose={props.onClose}
        addTodosHandler={props.addTodosHandler}
        ref={ref}
      />
    </Fragment>
  );
});

export default Modal;
