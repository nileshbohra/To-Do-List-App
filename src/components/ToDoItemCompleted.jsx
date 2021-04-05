import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function ToDoItemCompleted(props) {
  return (
    <div className="taskItem">
      <ul className="taskCompleted">
        <li style={{ textDecoration: "line-through" }}>
          {props.item.taskName}
        </li>
        <DeleteIcon
          style={{ fontSize: 33 }}
          onClick={() => {
            props.deleteItemCompleted(props.id);
          }}
          className="deleteBtn"
        />
      </ul>
    </div>
  );
}

export default ToDoItemCompleted;
