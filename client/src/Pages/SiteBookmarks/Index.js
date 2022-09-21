import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./New";

import "./Index.scss";
import { ImCog } from "react-icons/im";
import { HiTrash } from "react-icons/hi";

const Bookmark = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const [bill, setBill] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [remainingTotal, setRemainingTotal] = useState(0);
  const [confDel, setConfDel] = useState(false);

  const [bookmark, setBookmark] = useState([]);

  async function populateBookmark() {
    const req = await fetch(window.getfetch + "api/bookmark", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();

    console.log(data);

    if (data.status === "ok") {
      setBookmark(data.data);
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
        populateBookmark();
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleNew = (data) => {
    console.log("----- card new");
    setBookmark([...bookmark, data]);
  };

  async function removeItem(uuid, index) {
    let newArr = [...bookmark];
    newArr.splice(index, 1);
    setBookmark(newArr);

    const req = await fetch(window.getfetch + "api/bookmark/delete", {
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

  //   const handleUpdate = async (data) => {
  //     console.log(data);
  //     let body = {
  //       name: data.name,
  //       card: data.data,
  //       totalInAccount: data.totalInAccount,
  //       cardHolderName: data.cardHolderName,
  //       bank: data.bank,
  //       active: data.active,
  //     }; // For Submit

  //     const req = await fetch(window.getfetch + "api/bookmark/update", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token"),
  //         uuid: bill.uuid,
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     updateMath(bookmark);
  //   };

  return (
    <div className="bookmarkCardModel scrollModel">
      <div className="ui-width">
        <h1>Bookmarks</h1>
      </div>

      <div className="ui-width bookmarkCardList">
        <div
          onClick={() => {
            setShowNew(!showNew);
          }}
          className="add-new-bookmark"
        >
          <div className="bookmarkCardinner addNew">Add New Bookmark</div>
        </div>

        {bookmark?.map((item, index) => (
          <>
            <div
              key={index}
              className={
                "bookmarkCard color-" + item.color + " active-" + item.active
              }
            >
              <div className="bookmarkCardInner blue">
                <a
                  href={`//` + item.url}
                  rel="noreferrer"
                  target="_blank"
                  className="name left"
                >
                  <div className="top">
                    <div>{item.name}</div>
                    {item.category && <div>{item.category}</div>}
                  </div>

                  <div className="bottom"></div>
                </a>
                <div class="right">
                  <div onClick={() => setBill(item)}>
                    <ImCog size={18} />
                  </div>
                  <div onClick={() => setConfDel(true)}>
                    <HiTrash size={24} />
                  </div>
                </div>
              </div>
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
          bookmark={bookmark}
          setShowNew={setShowNew}
          handleNew={handleNew}
          user={user}
        />
      )}
    </div>
  );
};

export default Bookmark;
