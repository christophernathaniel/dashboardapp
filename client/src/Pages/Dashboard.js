import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import New from "./Dashboard/New";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState([
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
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
      name: "Apple Watch Ultra",
      pm: 0,
      remaining: 0,
      active: true,
      paid: false,
      category: "essential",
      order: 2,
      incoming: false,
    },
  ]);

  async function populateDashboard() {
    const req = await fetch("http://localhost:1337/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setDashboard(data.dashboard);
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
        populateDashboard();
      }
    }
  }, []);

  const handleNew = (data) => {
    console.log(data);
    console.log(dashboard);
    setDashboard(data);
  };

  //   async function updateDashboard(event) {
  //     event.preventDefault();

  //     const req = await fetch("http://localhost:1337/api/dashboard", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify({
  //         dashboard: tempDashboard,
  //       }),
  //     });

  //     const data = await req.json();
  //     if (data.status === "ok") {
  //       setDashboard(tempDashboard);
  //       setTempDashboard("");
  //     } else {
  //       alert(data.error);
  //     }
  //   }

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  async function removeItem(index) {
    let newArr = [...dashboard];
    newArr.splice(index, 1);
    setDashboard(newArr);

    const req = await fetch("http://localhost:1337/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ dashboard: newArr }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      //setDashboard(data.dashboard);
    }
  }

  return (
    <div>
      {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}
      {dashboard.map((item, index) => (
        <div key={item.id}>
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

      <New dashboard={dashboard} handleNew={handleNew} />
    </div>
  );
};

export default Dashboard;
