const urlPref = "http://localhost:3001/";

class Api {
  logginIn(url, logPass) {
    return fetch(urlPref + url, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(logPass)
    }).then(data => data.json());
  }
}

export default Api;
