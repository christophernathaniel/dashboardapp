import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";
import Bill from "../Bill/Index";

import "./Index.scss";
import { ImCog } from "react-icons/im";
import { HiTrash } from "react-icons/hi";

const Card = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const [bill, setBill] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [remainingTotal, setRemainingTotal] = useState(0);
  const [confDel, setConfDel] = useState(false);

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
      updateMath(data.data);
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

    updateMath(card);
  };

  const updateMath = (card) => {
    // Function to calculate the total of ALL cards
    const pm = card?.reduce((allTotal, items) => {
      const sum = (items.totalPm = items?.data?.reduce((total, item) => {
        return item.active && !item.paid && item.incoming === "Outgoing"
          ? Number(total) + Number(item.pm)
          : Number(total);
      }, 0));
      return Number(allTotal) + Number(sum);
    }, 0);

    const total = card?.reduce((allTotal, items) => {
      return Number(allTotal) + Number(items.totalInAccount);
    }, 0);

    console.log(pm);
    console.log(total);

    setRemainingTotal(Number(pm));
  };

  // Scroll Position
  const controlDirection = (e) => {
    if (e.target.scrollTop > 20) {
      props.setScrollAesthetic(true);
    } else {
      props.setScrollAesthetic(false);
    }
  };

  return (
    <div className="creditCardModel scrollModel" onScroll={controlDirection}>
      <div className="ui-width">
        <h1>Account Cards</h1>
      </div>

      <div className="ui-width creditCardList">
        <div
          onClick={() => {
            setShowNew(!showNew);
          }}
          className="add-new-card"
        >
          <div className="creditCardInner addNew">Add New Card</div>
        </div>

        {card?.map((item, index) => (
          <>
            <div
              key={index}
              className={
                "creditCard color-" + item.color + " active-" + item.active
              }
            >
              <div className="creditCardInner blue">
                <div className="left">
                  <div className="top">
                    <div className="bank">{item.bank}</div>
                  </div>

                  <div className="middle">
                    <div className="totalinaccount">
                      <span>Total:</span>£{item.totalInAccount}
                    </div>
                    <div className="totalRemaining">
                      <span>Spare:</span> £{item.totalInAccount - item.totalPm}
                    </div>
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
                  <div onClick={() => setConfDel(true)}>
                    <HiTrash size={24} />
                  </div>
                </div>
              </div>
              <div className="name">{item.name}</div>
            </div>

            {confDel !== false && (
              <div class="alertModel-c">
                <div class="alertModel">
                  <div class="alertBody">
                    <div class="alertTitle">Card Deletion</div>
                    Would you like to delete this card?
                  </div>
                  <div class="alertGroup">
                    <div onClick={() => setConfDel(false)}>Cancel</div>
                    <div
                      onClick={() => {
                        removeItem(item.uuid, index);
                        setConfDel(false);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
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
