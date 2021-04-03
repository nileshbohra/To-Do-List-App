import React, { useEffect, useState } from "react";
import InputText from "./InputText";
import ToDoItem from "./ToDoItem";
import Axios from "axios";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  //retreving data from backend
  //called on first render
  useEffect(() => {
    Axios.get(`${backend_url}/read`).then((res) => {
      setTasks(res.data);
      setIsLoaded(true);
    });
  }, [backend_url]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputTask(newValue);
  }

  async function addItem() {
    await Axios.post(`${backend_url}/create`, { taskName: inputTask });
    await Axios.get(`${backend_url}/read`).then((res) => setTasks(res.data));
    setInputTask("");
  }
  async function deleteItem(id) {
    await Axios.delete(`${backend_url}/delete/${id}`);
    await Axios.get(`${backend_url}/read`).then((res) => setTasks(res.data));
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
          {isLoaded &&
            tasks.map((item) => {
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
