import { fetchFunc, fetchProm} from "./api.js";
import { renderCards } from "./render.js";


const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const textInputElement = document.getElementById('text-input');
const likesCounterElements = document.querySelectorAll('.likes-counter');
const articleElement = document.getElementById('article');

// let cards = [];

export function fullDate(date) {
  let inputDate = new Date(date);
      let dayDate = inputDate.getDate();
  if (dayDate < 10) {
    dayDate = '0' + dayDate;
  };
  let monthDate = inputDate.getMonth();
  monthDate += 1;
  if (monthDate < 10) {
    monthDate = '0' + monthDate;
  };
  let yearDate = inputDate.getFullYear();
  yearDate = yearDate-2000;
  let hourDate = inputDate.getHours();
  if (hourDate < 10) {
    hourDate = '0' + hourDate;
  };
  let minutesDate = inputDate.getMinutes();
  if (minutesDate < 10) {
    minutesDate = '0' + minutesDate;
  };

  return dayDate + "." + monthDate + "." + yearDate + " " + hourDate + ':' + minutesDate;
  }
fullDate()

fetchFunc();

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

 
buttonElement.addEventListener('click', () => {
 
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value ==='') {
    nameInputElement.classList.add("error");

    return;
  }
    else if (textInputElement.value ==='') {
    textInputElement.classList.add("error");

    return;
  };

  buttonElement.disabled = true;
  buttonElement.textContent = "Ваши данные загружаются";

  fetchProm();
});



// export { cards };



