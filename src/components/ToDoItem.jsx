import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function ToDoItem(props) {
  return (
    <li className="taskItem">
      <div className="task">
        {props.item.taskName}
        <DeleteIcon
          onClick={() => {
            props.onChecked(props.id);
          }}
          className="deleteBtn"
        />
      </div>
    </li>
  );
}

export default ToDoItem;
