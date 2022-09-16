import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";

const Bill = (props) => {
  const navigate = useNavigate();
  const [bill, setBill] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Macbook Pro M1 Pro",
      pm: 0,
      remaining: 0,
      active: true,
      paid: true,
      category: "essential",
      order: 1,
      incoming: false,
    },
  ]);

  async function populateBill() {
    const req = await fetch(window.getfetch + "api/bill", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        uuid: props.uuid,
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setBill(data.data.data);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateBill();
      }
    }
  }, [props.uuid]);

  const handleNew = (data) => {
    setBill(data);

    props.handleUpdate(data);
  };

  async function removeItem(index) {
    let newArr = [...bill];
    newArr.splice(index, 1);
    setBill(newArr);

    const req = await fetch(window.getfetch + "api/bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ bill: newArr }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      setBill(data.data);
    }
  }

  return (
    <div>
      <h1>BILL</h1>
      <div>{props.uuid}</div>
      {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}

      {bill &&
        bill?.map((item, index) => (
          <div key={item.uuid}>
            <div>{item.name}</div>
            <div>{item.pm}</div>
            <div>{item.remaining}</div>

            <button
              onClick={() => {
                removeItem(index);
              }}
            >
              Delete
            </button>
          </div>
        ))}

      <New bill={bill} uuid={props.uuid} handleNew={handleNew} />
    </div>
  );
};

export default Bill;
