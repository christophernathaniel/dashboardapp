import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";
import Edit from "./Edit";

import "./Index.scss";

import { HiPencilAlt } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { MdArrowBackIos } from "react-icons/md";

import moment from "moment";

const Bill = (props) => {
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [card, setCard] = useState([]);
  const [showNew, setShowNew] = useState(false);

  const [edit_cardName, setEdit_cardName] = useState(false);
  const [edit_cardTotalInAccount, setEdit_cardTotalInAccount] = useState(false);
  const [edit_cardHolderName, setEdit_cardHolderName] = useState(false);
  const [edit_cardBank, setEdit_cardBank] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [confDel, setConfDel] = useState(false);

  const [totalPerMonth, setTotalPerMonth] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);

  useEffect(() => {
    props.bill.data = [...props.bill.data].sort((a, b) =>
      a.name > b.name ? -1 : 1
    );

    props.bill.data = [...props.bill.data].sort((a, b) =>
      a.active === b.active ? 0 : a.active ? 1 : -1
    );

    props.bill.data = [...props.bill.data].sort((a, b) =>
      a.category > b.category ? 1 : -1
    );

    setCard(props.card);
    setBill(props.bill);
    setShowNew(false);
  }, [props.bill, bill.data]);

  useEffect(() => {
    setTotalPerMonth(
      props.bill.data
        .reduce((x, y) => {
          return y.active ? Number(x) + Number(y.pm) : Number(x);
        }, 0)
        .toFixed(2)
    );

    setTotalRemaining(
      props.bill.data
        .reduce((x, y) => {
          return Number(x) + Number(y.remaining);
        }, 0)
        .toFixed(2)
    );
  }, [props.bill, card, bill.data]);

  const handleNew = (data) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card

    newArr[index]["data"] = data; // Set a new Value
    setShowNew(false);

    setCard(newArr);
    props.handleUpdate(newArr[index]);
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

  const updateEdit = (value, i) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index].data[i] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const changeTitle = (value) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["name"] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const changeTotalInAccount = (value) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["totalInAccount"] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const changeCardHolderName = (value) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["cardHolderName"] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const changeBank = (value) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["bank"] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const changeActive = (value) => {
    console.log(value);
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card
    newArr[index]["active"] = value; // Set a new Value
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const setIitemPaid = (value, i) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card

    let getBill = newArr[index].data[i];
    getBill.paid = value;

    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  const setItemActive = (value, i) => {
    let newArr = [...card]; // Create a new array from Card
    let index = newArr.findIndex((x) => x.uuid === props.bill.uuid); // Find Correct Card

    let getBill = newArr[index].data[i];
    getBill.active = value;
    props.handleUpdate(newArr[index]);
    setCard(newArr);
  };

  let prevCategory = "";

  return (
    <div className="bill-model">
      <div className="bill-toolbar">
        <div
          className="back"
          onClick={() => {
            props.setBill(false);
          }}
        >
          <MdArrowBackIos size={20} /> Cards
        </div>
      </div>
      <div class="scrollModel">
        <div class="ui-width">
          <div class="editCard">
            <h1>
              {!edit_cardName && <div>{props.bill.name}</div>}
              {edit_cardName && (
                <input
                  onChange={(e) => changeTitle(e.target.value)}
                  value={props.bill.name}
                  className="edit"
                />
              )}
            </h1>
            <div
              className="title-edit"
              onClick={() => setEdit_cardName(!edit_cardName)}
            >
              {!edit_cardName ? (
                <HiPencilAlt size={20} />
              ) : (
                <TiTick size={20} />
              )}
            </div>
          </div>

          <div class="editCard">
            {!edit_cardTotalInAccount && <div>{props.bill.totalInAccount}</div>}
            {edit_cardTotalInAccount && (
              <input
                onChange={(e) => changeTotalInAccount(e.target.value)}
                value={props.bill.totalInAccount}
                className="edit"
              />
            )}

            <div
              className="title-edit"
              onClick={() =>
                setEdit_cardTotalInAccount(!edit_cardTotalInAccount)
              }
            >
              {!edit_cardTotalInAccount ? (
                <HiPencilAlt size={20} />
              ) : (
                <TiTick size={20} />
              )}
            </div>
          </div>

          <div class="editCard">
            {!edit_cardHolderName && <div>{props.bill.cardHolderName}</div>}
            {edit_cardHolderName && (
              <input
                onChange={(e) => changeCardHolderName(e.target.value)}
                value={props.bill.cardHolderName}
                className="edit"
              />
            )}

            <div
              className="title-edit"
              onClick={() => setEdit_cardHolderName(!edit_cardHolderName)}
            >
              {!edit_cardHolderName ? (
                <HiPencilAlt size={20} />
              ) : (
                <TiTick size={20} />
              )}
            </div>
          </div>

          <div class="editCard">
            <label className="checkbox">
              <input
                type="checkbox"
                onChange={(e) => changeActive(!props.bill.active)}
                checked={props.bill.active === true}
              />
              {props.bill.active ? (
                <div>Card Active</div>
              ) : (
                <div>Card Inactive</div>
              )}
            </label>
          </div>

          <div class="editCard">
            {!edit_cardBank && <div>{props.bill.bank}</div>}
            {edit_cardBank && (
              <input
                onChange={(e) => changeBank(e.target.value)}
                value={props.bill.bank}
                className="edit"
              />
            )}

            <div
              className="title-edit"
              onClick={() => setEdit_cardBank(!edit_cardBank)}
            >
              {!edit_cardBank ? (
                <HiPencilAlt size={20} />
              ) : (
                <TiTick size={20} />
              )}
            </div>
          </div>
        </div>

        <div class="newItem" onClick={() => setNewItem(true)}>
          New Bill
        </div>

        <div class="ui-width">
          {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Paid</th>
                <th scope="col">Name</th>
                <th scope="col">Per Month</th>
                <th scope="col">Remaining</th>
                <th scope="col">Category</th>
                <th scope="col">Incoming/Outgoing</th>
                <th scope="col">Active</th>
                <th scope="col">Start Date</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {bill &&
                bill?.data?.map((item, index) => (
                  <>
                    {item.category !== prevCategory && (
                      <tr className="titleTr">
                        <td>{item.category}</td>
                      </tr>
                    )}
                    {((prevCategory = item.category), null)}
                    <tr key={index} className={"is-active-" + item.active}>
                      <td>
                        <label class="checkbox">
                          <input
                            type="checkbox"
                            placeholder="Is Paid"
                            checked={item.paid}
                            value={item.paid}
                            onChange={(e) => setIitemPaid(!item.paid, index)}
                          />
                        </label>
                      </td>
                      <td>{item.name}</td>
                      <td>£{item.pm}</td>
                      <td>{item.remaining && <div>£{item.remaining}</div>}</td>
                      <td>{item.category}</td>
                      <td>{item.incoming}</td>

                      <td>
                        <label class="checkbox">
                          <input
                            type="checkbox"
                            placeholder="Is Active"
                            checked={item.active}
                            value={item.active}
                            onChange={(e) => setItemActive(!item.active, index)}
                          />
                        </label>
                      </td>
                      <td>
                        {item.startDate && (
                          <div class="date">
                            {moment(new Date(item.startDate)).format(
                              "Do MMM YYYY"
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <div>
                          <button
                            className="edit-button"
                            onClick={() => {
                              setEditItem(index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => {
                              setConfDel(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    {confDel !== false && (
                      <div class="alertModel-c">
                        <div class="alertModel">
                          <div class="alertBody">
                            <div class="alertTitle">Bill Deletion</div>
                            Would you like to delete this bill?
                          </div>
                          <div class="alertGroup">
                            <div onClick={() => setConfDel(false)}>Cancel</div>
                            <div
                              onClick={(index) => {
                                removeItem(index);
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

              <tr className="floatingColumn">
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col">£{totalPerMonth}</td>
                <td scope="col">£{totalRemaining}</td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"></td>
              </tr>
            </tbody>
          </table>

          {editItem !== false && (
            <Edit
              editItem={editItem}
              setEditItem={setEditItem}
              bill={bill}
              setBill={setBill}
              updateEdit={updateEdit}
            />
          )}

          {newItem !== false && (
            <New
              bill={bill}
              setBill={setBill}
              card={card}
              setCard={setCard}
              uuid={props.bill.uuid}
              handleNew={handleNew}
              setNewItem={setNewItem}
            />
          )}
        </div>

        {/* <div
        onClick={() => {
          setShowNew(!showNew);
        }}
      >
        Create New Bill
      </div>

      {showNew && (
        <New
          bill={bill}
          setBill={setBill}
          card={card}
          setCard={setCard}
          uuid={props.bill.uuid}
          handleNew={handleNew}
        />
      )} */}
      </div>
    </div>
  );
};

export default Bill;
