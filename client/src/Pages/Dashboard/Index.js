import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
// import New from "./Dashboard/New";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <h1>Dashboard: {dashboard || "No dashboard found"}</h1> */}
      {/* {dashboard.map((item, index) => (
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
      ))} */}

      {/* <New dashboard={dashboard} handleNew={handleNew} /> */}
    </div>
  );
};

export default Dashboard;
