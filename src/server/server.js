const http = require("http");
const mysql = require("mysql");
const mysqlConf = require("./mysqlconfig");

var con = mysql.createConnection(mysqlConf);

con.connect(function(err) {
  if (err) throw err;
  console.log(mysqlConf);
  console.log("SQL Connected!");
});

server = http.createServer();

server.on("request", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  console.log(request.url);
  ////////////////////////////////////////////////////////////
  /////////////////////FIRST ADDING DATAТАBLE//////////////////
  if (request.url == "/addtables" && request.method === "POST") {
    response.writeHead(200, { "content-type": "application/json" });
    var body = "";
    request.on("data", function(data) {
      body = JSON.parse(data);
      if (data)
        req =
          "CREATE TABLE `users` (`id` INT NOT NULL AUTO_INCREMENT, `name` CHAR(50) NOT NULL UNIQUE, `pass` CHAR(50) NOT NULL, `role` CHAR(50) NOT NULL, PRIMARY KEY(`id`));";

      con.query(req, function(err, result, fields) {
        try {
          if (err) {
            throw err;
          }
          response.end(JSON.stringify("TABLE CREATED ==> " + req));
        } catch (e) {
          response.end(JSON.stringify(e));
        }
      });
    });
    ////////////////////////////////////////////////////////////////
    ///////////////////////INSERTING WALUES/////////////////////////
  } else if (request.method == "POST" && request.url == "/adddata") {
    response.writeHead(200, { "content-type": "application/json" });
    var body = "";
    request.on("data", function(data) {
      body = JSON.parse(data);
      let toClient = [];
      body.forEach(val => {
        let req = `INSERT INTO ${val.table_name} (`;
        delete val.table_name;
        for (let key in val) {
          req += key + ",";
        }
        req = req.slice(0, -1) + ") VALUES (";
        for (let key in val) {
          req += `"${val[key]}",`;
        }
        req = req.slice(0, -1) + ");";
        con.query(req, function(err, result, fields) {
          try {
            if (err) throw err;
            response.end(JSON.stringify("All Ok!"));
            console.log(req);
          } catch (e) {
            response.end(JSON.stringify(e));
          }
        });
      });
    });
    ////////////////////////////////////////////////////////////////
    ///////////////////////CHECK USER AND PASS//////////////////////
  } else if (request.method == "POST" && request.url == "/admin/login") {
    request.on("data", function(data) {
      let body = JSON.parse(data);
      let req = `SELECT name, role FROM users WHERE name='${body.login}' AND pass='${body.pass}'`;
      con.query(req, function(err, result, fields) {
        try {
          if (err) {
            throw err;
          }
          if (result.length) {
            response.end(JSON.stringify(result[0]));
          } else {
            response.end(JSON.stringify(false));
          }
        } catch (e) {
          response.end(JSON.stringify(e));
        }
      });
    });
  }
});

server.listen(3001, () => console.log("SERVER ONLINE!!!"));
