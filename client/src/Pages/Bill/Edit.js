import React, { useState, useEffect } from "react";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import "./Edit.scss";

const Edit = (props) => {
  const [itemName, setItemName] = useState(
    props.bill.data[props.editItem].name
  );
  const [itemPm, setItemPm] = useState(props.bill.data[props.editItem].pm);
  const [itemRemaining, setItemRemaining] = useState(
    props.bill.data[props.editItem].remaining
  );
  const [itemActive, setItemActive] = useState(
    props.bill.data[props.editItem].active
  );
  const [itemPaid, setItemPaid] = useState(
    props.bill.data[props.editItem].paid
  );
  const [itemCategory, setItemCategory] = useState(
    props.bill.data[props.editItem].category
  );
  const [itemOrder, setItemOrder] = useState("");
  const [itemIncoming, setItemIncoming] = useState(
    props.bill.data[props.editItem].incoming
  );
  const [selectedDay, setSelectedDay] = useState(
    props.bill.data[props.editItem].startDate
  );

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  // useEffect(() => {
  //   props.setBill(props.bill);
  // }, [setItemName]);

  async function newItem(event) {
    event.preventDefault();

    props.bill.data[props.editItem].name = itemName;
    props.bill.data[props.editItem].pm = itemPm;
    props.bill.data[props.editItem].active = itemActive;
    props.bill.data[props.editItem].paid = itemPaid;
    props.bill.data[props.editItem].category = itemCategory;
    props.bill.data[props.editItem].incoming = itemIncoming;
    props.bill.data[props.editItem].remaining = itemRemaining;
    props.bill.data[props.editItem].startDate = selectedDay;

    props.setBill(props.bill);

    props.setEditItem(false);

    props.updateEdit(props.bill.data[props.editItem], props.editItem);
  }

  return (
    <div
      class="editModel-c"
      // onClick={(e) => {
      //   props.setEditItem(
      //     e.target.classList.contains("editModel-c") ? false : props.editItem
      //   );
      // }}
    >
      <div class="editModel">
        <form onSubmit={newItem}>
          <div class="editModelHeader">
            <div
              class="add-button"
              onClick={(e) => {
                props.setEditItem(false);
                console.log(props.editItem);
              }}
            >
              Cancel
            </div>
            <div class="editModelTitle">Details</div>
            <input
              type="submit"
              class="add-button"
              value="Update"
              onClick={() => newItem}
            />
          </div>
          <div class="editModelBody">
            <label>
              <span>Name</span>
              <input
                type="text"
                placeholder="Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>

            <div class="group">
              <label>
                <span>Per Month</span>
                <input
                  type="text"
                  placeholder="Per Month"
                  value={itemPm}
                  onChange={(e) => setItemPm(e.target.value)}
                />
              </label>

              <label>
                <span>Total Remaining</span>
                <input
                  type="text"
                  placeholder="Total Remaining"
                  value={itemRemaining}
                  onChange={(e) => setItemRemaining(e.target.value)}
                />
              </label>
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
              <span>Incoming</span>
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

            <div class="label">
              <span>Start Date</span>
              <Flatpickr
                value={selectedDay}
                onChange={(date) => setSelectedDay(date)}
              />
              {selectedDay && (
                <div class="add-button" onClick={() => setSelectedDay(null)}>
                  Clear
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
