import React, { useState } from "react";

import "./New.scss";

const New = (props) => {
  const [itemName, setItemName] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [itemActive, setItemActive] = useState(0);
  const [itemBank, setItemBank] = useState("");
  const [itemColor, setItemColor] = useState("blue");
  const [totalInAccount, setTotalInAccount] = useState(0);

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
      cardHolderName: cardHolderName,
      totalInAccount: totalInAccount,
      bank: itemBank,
      color: itemColor,
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
      <div
        onClick={() => {
          props.setShowNew(false);
        }}
      >
        Close
      </div>
      <form onSubmit={newItem}>
        <input
          type="text"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bank"
          value={itemBank}
          onChange={(e) => setItemBank(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cardholder Full Name"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Color"
          value={itemColor}
          onChange={(e) => setItemColor(e.target.value)}
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
