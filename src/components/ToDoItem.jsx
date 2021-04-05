import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

function ToDoItem(props) {
  const [isChecked, setChecked] = useState(null);
  const [onClick, setOnClick] = useState(false);
  return (
    <div className="taskItem">
      <div className="task">
        {onClick ? (
          <div className="updateTask">
            <input
              type="text"
              onChange={props.handleUpdate}
              value={props.newValue}
              placeholder={props.updatePlaceholder}
              className="updateInput"
            />
            <button
              type="submit"
              className="updateBtn"
              onClick={() => {
                props.updateTask(props.item._id, props.newValue);
                setOnClick(false);
              }}
            >
              update
            </button>
          </div>
        ) : (
          <span>
            <input
              type="checkbox"
              onClick={(e) => {
                //will set true if checked
                props.taskCompleted(props.id);
                setChecked(e.target.checked);
              }}
              id={props.id}
            />
            <label
              style={{ textDecoration: isChecked ? "line-through" : null }}
              htmlFor={props.id}
            >
              {props.item.taskName}
            </label>
          </span>
        )}
        {onClick ? (
          <CancelIcon
            onClick={() => {
              setOnClick(false);
            }}
          />
        ) : (
          <EditIcon
            style={{ fontSize: 33 }}
            onClick={() => {
              setOnClick(true);
            }}
            className="editBtn"
          />
        )}
      </div>
    </div>
  );
}

export default ToDoItem;
