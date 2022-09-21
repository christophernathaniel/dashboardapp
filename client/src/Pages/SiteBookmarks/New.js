import React, { useState } from "react";

import "./New.scss";

const New = (props) => {
  const [itemName, setItemName] = useState("");

  const [itemActive, setItemActive] = useState(0);
  const [itemCategory, setItemCategory] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemColor, setItemColor] = useState("blue");

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
      category: itemCategory,
      color: itemColor,
      url: itemUrl,
      data: [{}],
    };

    const req = await fetch(window.getfetch + "api/bookmark/create", {
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
                setTimeout(() => {
                  props.setShowNew(false);
                }, 1000);
              }}
            >
              Cancel
            </div>
            <div class="editModelTitle">New Bookmark</div>
            <input type="submit" class="add-button" value="Add Bookmark" />
          </div>
          <div className="editModelBody">
            <label>
              <span>Bookmark Name</span>
              <input
                type="text"
                placeholder="Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
            <label>
              <span>Category</span>
              <input
                type="text"
                placeholder="Category"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
              />
            </label>
            <label>
              <span>Website URL</span>
              <input
                type="text"
                placeholder="Website URL"
                value={itemUrl}
                onChange={(e) => setItemUrl(e.target.value)}
              />
            </label>

            <label>
              <span>Label Colour</span>
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
