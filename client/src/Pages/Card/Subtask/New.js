import React, { useState, useEffect } from "react";

import "flatpickr/dist/themes/material_blue.css";

const New = (props) => {
  const [itemTitle, setItemTitle] = useState("");
  const [itemContent, setItemContent] = useState("");
  const [itemTaskId, setItemTaskId] = useState(props.itemId);
  const [animateClass, setAnimateClass] = useState(false);

  const generateKey = (pre) => {
    let r = (Math.random() + 1).toString(36).substring(7);
    return `${pre}_${new Date().getTime()}_${r}`;
  };

  async function newItem(event) {
    event.preventDefault();

    let id = generateKey("dash_");
    let item = {
      uuid: id,
      task_id: itemTaskId,
      title: itemTitle,
      content: itemContent,
    };

    // props.handleNew(item.data);

    props.setSubTask([...props.subTask, item]);

    const req = await fetch(window.getfetch + "api/subtask/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
        "x-task-id": itemTaskId,
      },
      body: JSON.stringify(item),
    });

    console.log(props.subTask);
    console.log("post request made");

    props.setNewSubtask(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimateClass(true);
    }, 1);
  }, []);

  return (
    <div className={`editModel-c animate-${animateClass}`}>
      <div className="editModel">
        <form onSubmit={newItem}>
          <div className="editModelHeader">
            <div
              className="add-button"
              onClick={() => {
                setTimeout(() => {
                  props.setNewSubtask(false);
                }, 300);
                setAnimateClass(false);
              }}
            >
              Cancel
            </div>
            <div className="editModelTitle">Add Subtask</div>
            <input type="submit" className="add-button" value="Create" />
          </div>

          <div className="editModelBody">
            <label>
              <span>Subtask Title</span>
              <input
                type="text"
                placeholder="Bill Name"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
              />
            </label>
            <div className="group">
              <label>
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description"
                  value={itemContent}
                  onChange={(e) => setItemContent(e.target.value)}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;
