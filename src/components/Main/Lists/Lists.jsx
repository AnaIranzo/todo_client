import React, { useState, useEffect } from "react";

const Lists = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Run the effect only once on component mount

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event, listId) {
    event.preventDefault();

    const newTask = event.target.taskName.value;
    console.log(newTask);

    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: newTask, listId }),
      });
      if (response.ok) {
        // Handle the successful response
        console.log("Task created successfully!");
        fetchData(); // Fetch updated list data
      } else {
        // Handle the error response
        console.error("Failed to create task");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error", error);
    }
  }

  return (
    <div className="lists_container">
      {props.lists.map((list) => (
        <div key={list.id} className="list_card">
          <h3>{list.listName}</h3>
          <form onSubmit={(event) => handleSubmit(event, list.id)}>
            <input type="text" name="taskName" />
            <input type="submit" value="+" />
          </form>
          {tasks
            .filter((task) => task.listId === list.id)
            .map((task) => (
              <p key={task.id}>- {task.taskName}</p>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Lists;
