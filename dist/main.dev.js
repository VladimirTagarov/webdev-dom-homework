"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullDate = fullDate;

var _api = require("./api.js");

var _render = require("./render.js");

// import { format } from "date-fns";
// const buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list'); // const nameInputElement = document.getElementById('name-input');
// const textInputElement = document.getElementById('text-input');

var likesCounterElements = document.querySelectorAll('.likes-counter'); // const articleElement = document.getElementById('article');
// let cards = [];
// export let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"
// export let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
// export let token = null;
// export function setToken(newToken) {
//  token = newToken;
// };

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

fullDate(); // fetchFunc();
// export const initAddLikesListeners = (cards) => {
//   const likesCounterElements = document.querySelectorAll('.likes-counter')
//   const addLikesElements = document.querySelectorAll(".like-button");
//   for (const addLikesElement of addLikesElements) {
//     addLikesElement.addEventListener("click", (event) => {
//       const indexElement = addLikesElement.dataset.index;
//       const currentElement = cards[indexElement];
//       event.stopPropagation();
//       if (currentElement.class === '-active-like') {
//         currentElement.likesCounter --;
//         currentElement.class = '';         
//       }
//       else {
//           currentElement.likesCounter ++;
//           currentElement.class = '-active-like';    
//       };
//       renderCards(cards);
//     });       
//   };
// };
// initAddLikesListeners();
// export function initAddRecommentListeners(cards) {
//   const commentElements = document.querySelectorAll('.comment');
//   const commentHeaderElements = document.querySelectorAll('.comment-header');
//   for (const commentElement of commentElements) {
//     commentElement.addEventListener('click', () => {
//   const commentBodyElement = commentElement.dataset.comment;
//   const indexElement = commentElement.dataset.index;
//   const curElement = cards[indexElement];
//   const cardNameElement = commentElement.dataset.name;
//   textInputElement.value = `<${commentBodyElement}
//    ${curElement.name}, 
//    `;
//   });
// };
// };
// initAddRecommentListeners();
// export { cards };