const users = [
  { table_name: "users", name: "admin", pass: "admin", role: "admin" },
  { table_name: "users", name: "user", pass: "user", role: "user" }
];
///////////////////////////
////   Create Tables   ////
///////////////////////////
const addTables = () => {
  const url = "http://localhost:3001/addtables";
  fetch(url, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({
      createTable: true
    })
  }).then(data => data.json().then(data => console.log(data)));
};

///////////////////////
//Add Users in mySQL///
///////////////////////
const addUsers = () => {
  const url = "http://localhost:3001/adddata";
  fetch(url, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(users)
  })
    .then(data => data.json())
    .then(data => console.log(data));
};
///////////////////////////

const btn = document.createElement("button");
document.querySelector(".content").appendChild(btn);
btn.textContent = "ADD TABLES IN EMTY mySQL";
btn.addEventListener("click", () => {
  addTables();
});

const btn1 = document.createElement("button");
document.querySelector(".content").appendChild(btn1);
btn1.textContent = "ADD 2 users IN EMPTY TABLE";
btn1.addEventListener("click", () => {
  addUsers();
});

const btn2 = document.createElement("button");
document.querySelector(".content").appendChild(btn2);
btn2.textContent = "Test success Login Reqest";
btn2.addEventListener("click", () => {
  const url = "http://localhost:3001/admin/login";
  fetch(url, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: "admin", pass: "admin" })
  })
    .then(data => data.json())
    .then(data => {
      if (data.name) {
        console.log("Wellcome " + data.name + " you role is " + data.role);
      } else console.error("Wrong Login/Password!");
    });
});

const btn3 = document.createElement("button");
document.querySelector(".content").appendChild(btn3);
btn3.textContent = "Test fail Login Reqest";
btn3.addEventListener("click", () => {
  const url = "http://localhost:3001/admin/login";
  fetch(url, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: "admin", pass: "admi n" })
  })
    .then(data => data.json())
    .then(data => {
      if (data.name) {
        console.log("Wellcome " + data.name + " you role is " + data.role);
      } else console.error("Wrong Login/Password!");
    });
});
