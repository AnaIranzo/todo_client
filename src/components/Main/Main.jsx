import React, { useState, useEffect } from "react";
import Lists from "./Lists/Lists";

const Main = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Run the effect only once on component mount

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/lists');
      if (!response.ok) {
        throw new Error('Failed to fetch lists');
      }
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newList = event.target.listName.value;
    console.log(newList);

    try {
      const response = await fetch("http://localhost:3000/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName: newList }),
      });

      if (response.ok) {
        // Handle the successful response
        console.log("List created successfully!");
        fetchData(); // Fetch updated list data
      } else {
        // Handle the error response
        console.error("Failed to create list");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error", error);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name="listName" />
        <input type="submit" value="Submit" />
      </form>
      <Lists lists={lists}/>
    </main>
  );
};

export default Main;
