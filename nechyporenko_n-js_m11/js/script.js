let url = `http://fecore.net.ua/rest/`;

let body = document.body;
let tBody = document.querySelector("#js-tbody");
let htmlTpl = document.querySelector("#table-row").textContent.trim();
let compiled = _.template(htmlTpl);

let addName = document.querySelector("#addName");
let addScore = document.querySelector("#addScore");
let delId = document.querySelector("#delId");
let findId = document.querySelector("#findId");
let newName = document.querySelector("#changeName");
let newScore = document.querySelector("#changeScore");

let buttons = {
    "addUserBtn": (event) => {
        let actUrl = `${url}?action=1&name=${addName.value}&score=${addScore.value}`;
        changeUserData(actUrl);
    },
    "getUsersBtn": (event) => {
        getUsers(url).then(data => {
          updateView(data);
        });
    },
    "delUserBtn": (event) => {
        let actUrl = `${url}?action=3&id=${delId.value}`;
        changeUserData(actUrl);
    },
    "changeUserBtn": (event) => {
        let actUrl = `${url}?action=2&id=${findId.value}&name=${newName.value}&score=${newScore.value}`;
        changeUserData(actUrl);
    },
};

let changeUserData = (actUrl) => {
    getUsers(actUrl);
    getUsers(url)
    .then(data => {
      updateView(data);
    });
};

let updateView = data => {
  let htmlString = "";

  data.forEach(data => {
    htmlString += compiled(data);
  });

  tBody.innerHTML = htmlString;
};

const getUsers = (actionUrl) =>
  fetch(actionUrl)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .catch(err => {
      console.error("Error: ", err);
    });

let btnHandler = () => {
    let target = event.target;

    for (let key in buttons) {
         if(target.id == (key)) {
             buttons[key](event);
         }
     };
};

body.addEventListener("click", btnHandler);
