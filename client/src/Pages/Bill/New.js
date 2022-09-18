import React, { useState } from "react";

const New = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemPm, setItemPm] = useState("");
  const [itemRemaining, setItemRemaining] = useState("");
  const [itemActive, setItemActive] = useState(true);
  const [itemPaid, setItemPaid] = useState(false);
  const [itemCategory, setItemCategory] = useState("");
  const [itemOrder, setItemOrder] = useState("");
  const [itemIncoming, setItemIncoming] = useState("Outgoing");
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
    <form onSubmit={newItem} className="new-form table">
      <div>
        <div>
          <div></div>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Per Month"
              value={itemPm}
              onChange={(e) => setItemPm(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Total Remaining"
              value={itemRemaining}
              onChange={(e) => setItemRemaining(e.target.value)}
            />
          </div>
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
          <div>
            <select
              type="text"
              placeholder="Category"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
            >
              <option value="">Uncategorized</option>
              <option value="Essential">Essential</option>
              <option value="Non-Essential">Non-Essential</option>
              <option value="Consumable">Consumable</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Holiday">Holiday</option>
              <option value="Business">Business</option>
              <option value="Loan">Loan</option>
            </select>
          </div>
          <div>
            <select
              type="text"
              placeholder="Incoming / Outgoing"
              value={itemIncoming}
              onChange={(e) => setItemIncoming(e.target.value)}
            >
              <option value="Outgoing">Outgoing</option>
              <option value="Incoming">Incoming</option>
            </select>
          </div>
          <div>
            <input type="submit" class="add-button" value="Add Monthly Bill" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default New;
