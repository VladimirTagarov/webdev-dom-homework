import { cards } from "./main.js";
import { initAddLikesListeners, initAddRecommentListeners } from "./main.js";
import { fetchFunc, fetchProm } from "./api.js";

const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const textInputElement = document.getElementById('text-input');
const likesCounterElements = document.querySelectorAll('.likes-counter');
const articleElement = document.getElementById('article');

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

  // renderCards(cards);

  export { initAddLikesListeners };
  export { initAddRecommentListeners };
  // export { cards };

