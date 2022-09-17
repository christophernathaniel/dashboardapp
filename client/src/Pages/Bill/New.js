import React, { useState } from "react";

const New = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemPm, setItemPm] = useState("");
  const [itemRemaining, setItemRemaining] = useState("");
  const [itemActive, setItemActive] = useState("");
  const [itemPaid, setItemPaid] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemOrder, setItemOrder] = useState("");
  const [itemIncoming, setItemIncoming] = useState("");
  const [card, setCard] = useState();

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  async function newItem(event) {
    event.preventDefault();

    let id = generateKey("dash_");
    let item = {
      data: [
        ...props.bill.data,
        {
          id: id,
          name: itemName,
          remaining: itemRemaining,
          pm: itemPm,
          active: true,
          paid: false,
          category: itemCategory,
          incoming: itemIncoming,
        },
      ],
    };

    // console.log("------");
    // console.log(props.bill);
    // console.log(item);

    // props.bill["data"] = item.data;

    // console.log(props.bill);

    // props.setBill(props.bill);

    props.handleNew(item.data);
  }

  return (
    <div>
      <h1>New</h1>
      <form onSubmit={newItem}>
        <input
          type="text"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Per Month"
          value={itemPm}
          onChange={(e) => setItemPm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Total Remaining"
          value={itemRemaining}
          onChange={(e) => setItemRemaining(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Is Active"
          value={itemActive}
          onChange={(e) => setItemActive(e.target.value)}
        />
        <input
          type="text"
          placeholder="Is Paid"
          value={itemPaid}
          onChange={(e) => setItemPaid(e.target.value)}
        /> */}
        <input
          type="text"
          placeholder="Category"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Incoming / Outgoing"
          value={itemIncoming}
          onChange={(e) => setItemIncoming(e.target.value)}
        />
        <input type="submit" value="Update value" />
      </form>
    </div>
  );
};

export default New;
