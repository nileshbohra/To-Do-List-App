import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

function ToDoItem(props) {
  const [isChecked, setChecked] = useState(null);
  const [onClick, setOnClick] = useState(false);
  const [newValue, setNewValue] = useState(props.item);

  function handleChange(e) {
    const { value } = e.target;
    setNewValue((preValue) => {
      return { ...preValue, taskName: value };
    });
  }

  return (
    <div className="taskItem">
      <div className="task">
        {onClick ? (
          <div className="updateTask">
            <input
              type="text"
              onChange={handleChange}
              value={newValue.taskName}
              className="updateInput"
            />
            <button
              type="submit"
              className="updateBtn"
              onClick={() => {
                props.updateTask(props.item._id, newValue.taskName);
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
