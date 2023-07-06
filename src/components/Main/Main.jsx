import React, { useState, useEffect } from "react";
import Lists from "./Lists/Lists";

const Main = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); 

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

    if (event.target.listName.value !== '') {
      try {
        const response = await fetch("http://localhost:3000/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listName: newList }),
        });
  
        if (response.ok) {
          console.log("List created successfully!");
          fetchData(); 
          event.target.listName.value = ''
        } else {
          console.error("Failed to create list");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    } else{
      alert('Por favor escriba un nombre para la lista');
    }

    
  }

  return (
    <main>
      <h2>Añadir nueva lista:</h2>
      <form onSubmit={handleSubmit} className="form_container">
        <input type="text" name="listName" />
        <input type="submit" value="+" />
      </form>
      <Lists lists={lists}/>
    </main>
  );
};

export default Main;
