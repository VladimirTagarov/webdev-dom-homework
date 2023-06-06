// import { initAddLikesListeners } from "./main.js";
// import { initAddRecommentListeners } from "./main.js";

const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const textInputElement = document.getElementById('text-input');
const likesCounterElements = document.querySelectorAll('.likes-counter');
const articleElement = document.getElementById('article');

let cards = [];

const initAddLikesListeners = () => {
  const likesCounterElements = document.querySelectorAll('.likes-counter')
  const addLikesElements = document.querySelectorAll(".like-button");

  for (const addLikesElement of addLikesElements) {
    addLikesElement.addEventListener("click", (event) => {
      const indexElement = addLikesElement.dataset.index;
      const currentElement = cards[indexElement];
      event.stopPropagation();

      if (currentElement.class === '-active-like') {
        currentElement.likesCounter --;
        currentElement.class = '';         
      }
      else {
          currentElement.likesCounter ++;
          currentElement.class = '-active-like';    
      };
               
      renderCards(cards);
    });       

  };
  
};

initAddLikesListeners();

function initAddRecommentListeners() {

  const commentElements = document.querySelectorAll('.comment');
  const commentHeaderElements = document.querySelectorAll('.comment-header');

  for (const commentElement of commentElements) {
    commentElement.addEventListener('click', () => {
  const commentBodyElement = commentElement.dataset.comment;
  const indexElement = commentElement.dataset.index;
  const curElement = cards[indexElement];
  const cardNameElement = commentElement.dataset.name;
  textInputElement.value = `<${commentBodyElement}
   ${curElement.name}, 
   `;

  });
};

};
initAddRecommentListeners();

export const renderCards = (cards) => {
    const cardsHTML = cards
    .map((card, index) => {
      return `<li data-comment="${card.text}" data-index="${index}" class="comment">
        <div data-name="${card.name}" class="comment-header">
          ${card.name}
          <div>${card.date}</div>
        </div>
        <div data-comment="${card.text}" data-index="${index}" class="comment-body">
       
            ${card.text}
      
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${card.likesCounter}</span>
            <button class="like-button ${card.class}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");
    listElement.innerHTML = cardsHTML;
    initAddLikesListeners();
    initAddRecommentListeners();
  };

  renderCards(cards);