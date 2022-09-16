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
    console.log("----- card new");
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

  const handleUpdate = async (data) => {
    let newArr = [...card];
    let index = newArr.findIndex((x) => x.uuid === bill);
    let dataAssign = (newArr[index].data = data); // Assign Data
    let body = { card: dataAssign }; // For Submit

    const req = await fetch(window.getfetch + "api/card/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
        uuid: bill,
      },
      body: JSON.stringify(body),
    });
  };

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
          <div>{item.uuid}</div>
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

      {bill ? <Bill uuid={bill} handleUpdate={handleUpdate} /> : ""}
    </div>
  );
};

export default Card;
