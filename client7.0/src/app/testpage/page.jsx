"use client";
import "./test.css";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

/*

wwhen a user logins user details should be stored in local storage
and it should be made available for all files using AuthContext


*/

export default function Page() {
  return <TestUi />;
}








function TestUi() {

  return (
    <div className="conatiner">
      <h1>Test Page</h1>
      <button
        onClick={() => {
          login();
        }}
        className="btn"
      >
        login
      </button>

      <button disabled={!permission} onClick={fetchBooks} className="btn">
        fetchAllBooks
      </button>

      <button disabled={!permission} onClick={borrowBook} className="btn">
        Borrow
      </button>
      <button disabled={!permission} onClick={returnBook} className="btn">
        Return
      </button>
    </div>
  );
}

async function login() {
  //user id is given by user
  const userid = 1;
  //user password is given by user
  const password = "Arjun@200978";

  const res = await fetch("http://localhost:5000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: userid,
      password: password,
    }),
  });
  try {
    const response = await res.json();
    if (!response) throw new Error("Login Failed");
    setPermission(true);
    localStorage.setItem("token", response.data);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

async function returnBook() {
  const token = localStorage.getItem("token");
  if (!token) return;
  const payload = JSON.parse(atob(token.split(".")[1]));

  //user id should fetched from local storage token ...for convenience i gave  id=3
  const userid = payload.userid;
  //bookid should be asked from user.. no i set it to be 4
  const bookid = 4;
  //borrowid should be asked from user.. no i set it to be 4
  const borrowid = 35;
  //validate the data

  // Rreturns all book in the db
  const res = await fetch(`http://localhost:5000/api/returnbook/${borrowid}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    //token is sended from client which condains userid
  });
  try {
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

async function borrowBook() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) return;

  //bookid should be asked from user.. no i set it to be 4
  const bookid = 5;

  // Rreturns all book in the db
  const res = await fetch(`http://localhost:5000/api/borrow/${bookid}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    const data = await res.json();
    if (!data) throw new Error("Borrow Failed");
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

async function fetchBooks() {
  // Rreturns all book in the db
  const res = await fetch("http://localhost:5000/api/allbooks/", {
    method: "GET",
  });
  try {
    const data = await res.json();
    if (!data) throw new Error("fetching Failed");
    console.log(data);
  } catch (e) {
    console.error(e);
  }

  //The responce data  condains {statusCode,data} or {statusCode,error}
}
