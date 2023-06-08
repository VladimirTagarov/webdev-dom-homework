"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullDate = fullDate;

var _api = require("./api.js");

var _render = require("./render.js");

// import { cards } from "./api.js";
var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article'); // let cards = [];

function fullDate(date) {
  var inputDate = new Date(date);
  var dayDate = inputDate.getDate();

  if (dayDate < 10) {
    dayDate = '0' + dayDate;
  }

  ;
  var monthDate = inputDate.getMonth();
  monthDate += 1;

  if (monthDate < 10) {
    monthDate = '0' + monthDate;
  }

  ;
  var yearDate = inputDate.getFullYear();
  yearDate = yearDate - 2000;
  var hourDate = inputDate.getHours();

  if (hourDate < 10) {
    hourDate = '0' + hourDate;
  }

  ;
  var minutesDate = inputDate.getMinutes();

  if (minutesDate < 10) {
    minutesDate = '0' + minutesDate;
  }

  ;
  return dayDate + "." + monthDate + "." + yearDate + " " + hourDate + ':' + minutesDate;
}

fullDate();
(0, _api.fetchFunc)(_render.initAddLikesListeners, _render.initAddRecommentListeners);
buttonElement.addEventListener('click', function () {
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === '') {
    nameInputElement.classList.add("error");
    return;
  } else if (textInputElement.value === '') {
    textInputElement.classList.add("error");
    return;
  }

  ;
  buttonElement.disabled = true;
  buttonElement.textContent = "Ваши данные загружаются";
  (0, _api.fetchProm)();
}); // export { initAddLikesListeners };
// export {initAddRecommentListeners};