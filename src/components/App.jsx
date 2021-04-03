import React, { useEffect, useState } from "react";
import InputText from "./InputText";
import ToDoItem from "./ToDoItem";
import Axios from "axios";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const api = {
    backend_url: process.env.REACT_APP_BACKEND_URL,
  };

  useEffect(() => {
    Axios.get(`${api.backend_url}/read`).then((res) => {
      setTasks(res.data);
    });
  }, []);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputTask(newValue);
  }

  async function addItem() {
    await Axios.post(`${api.backend_url}/create`, { taskName: inputTask });
    await Axios.get(`${api.backend_url}/read`).then((res) =>
      setTasks(res.data)
    );
    setInputTask("");
  }
  async function deleteItem(id) {
    await Axios.delete(`${api.backend_url}/delete/${id}`);
    await Axios.get(`${api.backend_url}/read`).then((res) =>
      setTasks(res.data)
    );
    // setTasks((prevItems) => {
    //   return prevItems.filter((item, index) => {
    //     return index !== id;
    //   });
    // });
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputText
        inputText={inputTask}
        handleChange={handleChange}
        addItem={addItem}
      />
      <div>
        <ul>
          {tasks.map((item) => {
            return (
              <ToDoItem
                key={item._id}
                id={item._id}
                item={item}
                onChecked={deleteItem}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
