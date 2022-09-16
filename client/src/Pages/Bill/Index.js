import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";

const Bill = (props) => {
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [card, setCard] = useState([]);

  // async function populateBill() {
  //   const req = await fetch(window.getfetch + "api/bill", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //       uuid: props.bill.uuid,
  //     },
  //   });

  //   const data = await req.json();
  //   if (data.status === "ok") {
  //     setBill(data.data.data);
  //   } else {
  //     alert(data.error);
  //   }
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        //populateBill();
        setCard(props.card);
        setBill(props.bill);
      }
    }
  }, [props.bill]);

  const handleNew = (data) => {
    // console.log(data);

    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["data"] = data; // Set a new Value

    setCard(newArr);
    props.handleUpdate(data);
  };

  async function removeItem(index) {
    let billArr = bill;
    billArr.data.splice(index, 1);
    // setBill(newArr);

    let newArr = [...card]; // Create a new array from Card
    let findindex = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[findindex]["bill"] = billArr; // Set a new Value
    props.handleUpdate(newArr[findindex]);
    setCard(newArr);
  }

  const changeTitle = (value) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["name"] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  return (
    <div>
      <h1>BILL</h1>
      <div>
        Card Name:{" "}
        <input
          onChange={(e) => changeTitle(e.target.value)}
          value={props.bill.name}
        />
      </div>
      <div>{props.bill.uuid}</div>
      {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}

      {bill &&
        bill?.data?.map((item, index) => (
          <div key={index}>
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

      <New
        bill={bill}
        card={card}
        setCard={setCard}
        uuid={props.bill.uuid}
        handleNew={handleNew}
      />
    </div>
  );
};

export default Bill;
