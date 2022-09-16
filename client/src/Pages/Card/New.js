import React, { useState } from "react";

const New = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemActive, setItemActive] = useState(0);

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  // Create New Card
  async function newItem(event) {
    event.preventDefault();

    let key = generateKey("dash_");

    let item = {
      id: key,
      uuid: key,
      name: itemName,
      active: itemActive,
      data: [{}],
    };

    const req = await fetch(window.getfetch + "api/card/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(item),
    });

    props.handleNew(item);

    const data = await req.json();

    if (data.status === "ok") {
    }
  }

  return (
    <div>
      <form onSubmit={newItem}>
        <input
          type="text"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pm"
          value={itemActive}
          onChange={(e) => setItemActive(e.target.value)}
        />

        <input type="submit" value="Update value" />
      </form>
    </div>
  );
};

export default New;
