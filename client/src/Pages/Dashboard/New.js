import React, { useState } from "react";

const New = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemPm, setItemPm] = useState(0);
  const [itemRemaining, setItemRemaining] = useState();
  const [itemActive, setItemActive] = useState();
  const [itemPaid, setItemPaid] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [itemOrder, setItemOrder] = useState();
  const [itemIncoming, setItemIncoming] = useState();

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  async function newItem(event) {
    event.preventDefault();

    let item = {
      dashboard: [
        ...props.dashboard,
        {
          id: generateKey("dash_"),
          name: itemName,
          remaining: itemRemaining,
          pm: itemPm,
          active: itemActive,
          paid: itemPaid,
          category: itemCategory,
          incoming: itemIncoming,
        },
      ],
    };

    const req = await fetch("http://localhost:1337/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(item),
    });

    props.handleNew(item.dashboard);

    const data = await req.json();

    if (data.status === "ok") {
      console.log(data);
      //setDashboard(data.dashboard);
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
          value={itemPm}
          onChange={(e) => setItemPm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dashboard"
          value={itemRemaining}
          onChange={(e) => setItemRemaining(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dashboard"
          value={itemActive}
          onChange={(e) => setItemActive(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dashboard"
          value={itemPaid}
          onChange={(e) => setItemPaid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dashboard"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dashboard"
          value={itemIncoming}
          onChange={(e) => setItemIncoming(e.target.value)}
        />
        <input type="submit" value="Update value" />
      </form>
    </div>
  );
};

export default New;
