import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";
import Bill from "../Bill/Index";

const Card = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const [bill, setBill] = useState(false);
  const [card, setCard] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Macbook Pro M1 Pro",
      active: true,
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
      name: "Apple Watch Ultra",
      active: true,
    },
  ]);

  async function populateCard() {
    const req = await fetch(window.getfetch + "api/card", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();

    console.log(data);

    if (data.status === "ok") {
      setCard(data.data);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      setUser(user.uuid);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateCard();
      }
    }
  }, []);

  const handleNew = (data) => {
    console.log("----data");
    console.log(data);
    console.log("----card");
    console.log(card);
    setCard([...card, data]);
  };

  async function removeItem(uuid, index) {
    let newArr = [...card];
    newArr.splice(index, 1);
    setCard(newArr);

    const req = await fetch(window.getfetch + "api/card/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ uuid: uuid }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      //setDashboard(data.dashboard);
    }
  }

  return (
    <div>
      <h1>Card</h1>

      {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}
      {card?.map((item, index) => (
        <div key={item.uuid}>
          <div>{item.name}</div>
          {/* <button
            onClick={
              (() => navigate("/card/" + item.uuid), { uuid: item.uuid })
            }
          ></button> */}

          <button onClick={() => setBill(item.uuid)}>Open</button>
          <button
            onClick={() => {
              removeItem(item.uuid, index);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <New card={card} handleNew={handleNew} user={user} />

      {bill ? <Bill objBill={bill} /> : ""}
    </div>
  );
};

export default Card;
