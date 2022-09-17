import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";
import Bill from "../Bill/Index";

import "./Index.scss";
import { ImCog } from "react-icons/im";
import { HiTrash } from "react-icons/hi";

const Card = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const [bill, setBill] = useState(false);
  const [showNew, setShowNew] = useState(false);
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
    } else {
      navigate("/login");
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
    console.log(data);
    let body = {
      name: data.name,
      card: data.data,
      totalInAccount: data.totalInAccount,
      cardHolderName: data.cardHolderName,
      bank: data.bank,
      active: data.active,
    }; // For Submit

    const req = await fetch(window.getfetch + "api/card/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
        uuid: bill.uuid,
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="creditCardModel">
      <div className="ui-width">
        <h1>My Cards</h1>
      </div>

      <div className="ui-width creditCardList">
        {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}
        {card?.map((item, index) => (
          <div
            key={index}
            className={
              "creditCard color-" + item.color + " active-" + item.active
            }
          >
            <div className="creditCardInner">
              <div className="left">
                <div className="top">
                  <div className="bank">{item.bank}</div>
                </div>
                <div className="middle">
                  <div className="totalinaccount">£{item.totalInAccount}</div>
                </div>
                <div className="bottom">
                  <div className="cardNumber">**** **** **** ****</div>

                  <div className="cardholdername">{item.cardHolderName}</div>
                </div>
              </div>
              <div class="right">
                <div onClick={() => setBill(item)}>
                  <ImCog size={18} />
                </div>
                <div
                  onClick={() => {
                    removeItem(item.uuid, index);
                  }}
                >
                  <HiTrash size={24} />
                </div>
              </div>
            </div>
            <div className="name">{item.name}</div>
          </div>
        ))}
      </div>

      <div
        onClick={() => {
          setShowNew(!showNew);
        }}
      >
        Add New Card
      </div>

      {showNew && (
        <New
          card={card}
          setShowNew={setShowNew}
          handleNew={handleNew}
          user={user}
        />
      )}

      {bill ? (
        <Bill
          bill={bill}
          setBill={setBill}
          card={card}
          setCard={setCard}
          handleUpdate={handleUpdate}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
