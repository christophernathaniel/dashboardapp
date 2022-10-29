import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import New from "./New";

import { HiTrash } from "react-icons/hi";

const Subtask = (props) => {
  const [subTask, setSubTask] = useState(false);
  const [newSubtask, setNewSubtask] = useState(false);

  async function populateSubTask() {
    const req = await fetch(window.getfetch + "api/subtask", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "x-task-id": props.itemId,
      },
    });

    const data = await req.json();

    if (data.status === "ok") {
      setSubTask(data.data);

      console.log(data.data);
      // props.setCardData(data.data);
      // setSyncState(false);
      // updateMath(data.data);
    } else {
      alert(data.error);
    }
  }

  console.log(subTask);

  useEffect(() => {
    populateSubTask();
  }, []);

  async function removeItem(uuid, index) {
    let tempArr = [...subTask];
    tempArr.splice(index, 1);

    const req = await fetch(window.getfetch + "api/subtask/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ uuid: uuid }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      setSubTask(tempArr);
    }
  }

  return (
    <div className="editModelFooter">
      <div className="group">
        {subTask &&
          subTask?.map((item, index) => (
            <div key={index} class="label">
              <span className="name">{item.title && item.title}</span>
              <div className="content">{item.content && item.content}</div>
              <div
                className="delete-label"
                onClick={() => {
                  removeItem(item.uuid, index);
                }}
              >
                <HiTrash />
              </div>
            </div>
          ))}
      </div>

      <div
        className="newSubtask sub-task-add-button"
        onClick={() => setNewSubtask(true)}
      >
        <MdAddCircleOutline />
        Create New Sub Task
      </div>

      {newSubtask !== false && (
        <New
          itemId={props.itemId}
          setNewSubtask={setNewSubtask}
          subTask={subTask}
          setSubTask={setSubTask}
        />
      )}
    </div>
  );
};

export default Subtask;
