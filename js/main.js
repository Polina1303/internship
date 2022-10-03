const users =
  "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture";

const PEOPLES = document.querySelector(".peoples-all");
const PEOPLES_POPUP = document.querySelector(".peoples-popup");

function load(callback, api) {
  fetch(api)
    .then(function (response) {
      console.log(response);
      return Promise.all([response.status, response.json()]);
    })
    .then(function (result) {
      if (result[0] != 200) {
        console.log("Ошибка");
      } else {
        callback(result[1]);
        console.log(result[1]);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

let objData;
function transform(data) {
  objData = data.results;
  render(objData);
}

function render(objData) {
  let htmlCotolog = "";
  for (let i = 0; i < objData.length; i++) {
    let userObj = {
      gender: objData[i]["gender"],
      avatar: objData[i]["picture"]["medium"],
      avatarLarge: objData[i]["picture"]["large"],
      title: objData[i]["name"]["title"],
      first: objData[i]["name"]["first"],
      last: objData[i]["name"]["last"],
      street: objData[i]["location"]["street"],
      city: objData[i]["location"]["city"],
      state: objData[i]["location"]["state"],
      email: objData[i]["email"],
      phone: objData[i]["phone"],
    };

    htmlCotolog += `<li class='person' id='${userObj.phone}'><img src='${userObj.avatar}' alt='avatar' class='img-medium'/><span class="peoples-title"> ${userObj.title}.${userObj.first} ${userObj.last}</span></li>`;
  }
  const html = `<ul>${htmlCotolog}</ul>`;

  PEOPLES.innerHTML = html;
}

function sortAlphavite() {
  objData.sort(function (a, b) {
    if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    }
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) return -1;
    return 0;
  });
  render(objData);
}

function backSort() {
  objData.sort(function (a, b) {
    if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return -1;
    }
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) return 1;
    return 0;
  });
  render(objData);
}

function toClose() {
  PEOPLES_POPUP.style.display = "none";
}

function listenToTheEvent() {
  document.querySelector(".close").addEventListener("click", toClose);
  document
    .getElementById("sortAlphavite")
    .addEventListener("click", sortAlphavite);
  document.getElementById("backSort").addEventListener("click", backSort);

  let elements = document.querySelectorAll(".peoples-all");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function (event) {
      (event.target.classList.value === "img-medium" ||
        event.target.classList.value === "peoples-title") &&
        renderPopup(objData, event);
    });
  }
}

function renderPopup(objData, event) {
  let aboutPeople = "";

  const person = event.target.closest(".person");
  const currentPerson = objData.find((item) => person.id === item.phone);

  aboutPeople += `<div class="peoples-popup-content"> <img src="${currentPerson.picture.large}" alt="Аватарка" class="img-large" />
  <button class="close">x</button>
  <p class="popup-title">${currentPerson.name.title}.${currentPerson.name.first} ${currentPerson.name.last}</p>
  <p class="people-street">${currentPerson.location.street}</p>
  <p class="people-city">${currentPerson.location.city}</p>
  <p class="people-state">${currentPerson.location.state}</p>
  <p class="people-email">${currentPerson.email}</p>
  <p class="people-telephone">${currentPerson.phone}</p>
  </div>`;

  const htmlPopup = `${aboutPeople}`;
  PEOPLES_POPUP.innerHTML = htmlPopup;

  PEOPLES_POPUP.style.display = "block";
  document.querySelector(".close").addEventListener("click", toClose);
}
document.body.style.position = "fixed";
document.body.style.top = `-${window.scrollY}px`;
document.body.style.position = "";
document.body.style.top = "";
listenToTheEvent();
load(transform, users);
