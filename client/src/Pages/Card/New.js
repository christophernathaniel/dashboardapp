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
      active: 1,
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

    const data = await req.json();

    if (data.status === "ok") {
      props.handleNew(item);
      props.setShowNew(false);
    }
  }

  return (
    <div class="editModel-c ">
      <div class="editModel">
        <form onSubmit={newItem}>
          <div class="editModelHeader">
            <div
              onClick={() => {
                props.setShowNew(false);
              }}
            >
              Close
            </div>
            <div class="editModelTitle">New Card</div>
            <input type="submit" class="add-button" value="Add Card" />
          </div>
          <div className="editModelBody">
            <label>
              <span>Card Name</span>
              <input
                type="text"
                placeholder="Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
            <label>
              <span>Bank Name</span>
              <input
                type="text"
                placeholder="Bank"
                value={itemBank}
                onChange={(e) => setItemBank(e.target.value)}
              />
            </label>
            <label>
              <span>Cardholder Name</span>
              <input
                type="text"
                placeholder="Cardholder Full Name"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
            </label>
            <label>
              <span>Card Colour</span>
              <input
                type="text"
                placeholder="Color"
                value={itemColor}
                onChange={(e) => setItemColor(e.target.value)}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;
