import React, { useState, useEffect } from "react";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const New = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemPm, setItemPm] = useState("");
  const [itemRemaining, setItemRemaining] = useState("");
  const [itemActive, setItemActive] = useState(true);
  const [itemPaid, setItemPaid] = useState(false);
  const [itemCategory, setItemCategory] = useState("");
  const [itemOrder, setItemOrder] = useState("");
  const [itemIncoming, setItemIncoming] = useState("Outgoing");
  const [selectedDay, setSelectedDay] = useState("");
  const [card, setCard] = useState();
  const [animateClass, setAnimateClass] = useState(false);

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
          startDate: selectedDay,
        },
      ],
    };

    props.handleNew(item.data);
    props.setNewItem(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimateClass(true);
    }, 1);
  }, []);

  return (
    <div class="editModel-c" className={`editModel-c animate-${animateClass}`}>
      <div class="editModel">
        <form onSubmit={newItem}>
          <div class="editModelHeader">
            <div
              class="add-button"
              onClick={() => {
                setTimeout(() => {
                  props.setNewItem(false);
                }, 300);
                setAnimateClass(false);
              }}
            >
              Cancel
            </div>
            <div class="editModelTitle">Add Bill</div>
            <input type="submit" class="add-button" value="Create" />
          </div>

          <div class="editModelBody">
            <label>
              <span>Bill Name</span>
              <input
                type="text"
                placeholder="Bill Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
            <div class="group">
              <label>
                <span>Monthly Amount</span>
                <input
                  type="text"
                  placeholder="10.99"
                  value={itemPm}
                  onChange={(e) => setItemPm(e.target.value)}
                />
              </label>
              <label>
                <span>Remaining</span>
                <input
                  type="text"
                  placeholder="100.00"
                  value={itemRemaining}
                  onChange={(e) => setItemRemaining(e.target.value)}
                />
              </label>
            </div>
            <label>
              <span>Category</span>
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
            </label>
            <label>
              <span>Instruction</span>

              <select
                type="text"
                placeholder="Incoming / Outgoing"
                value={itemIncoming}
                onChange={(e) => setItemIncoming(e.target.value)}
              >
                <option value="Outgoing">Outgoing</option>
                <option value="Incoming">Incoming</option>
              </select>
            </label>
            <label>
              <span>Start Date</span>

              <Flatpickr
                value={selectedDay}
                onChange={(date) => setSelectedDay(date)}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;
