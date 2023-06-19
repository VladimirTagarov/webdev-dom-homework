// import { token, setToken } from "./main.js";
import { renderLoginComponent } from "./Components/login-component.js";
import { fetchFunc, fetchProm, cards, initAddLikesListeners, initAddRecommentListeners, loginUser } from "./api.js";
// import { renderLoginComponent } from "./Components/login-component.js";

let buttonElement;
let articleElement;
let nameInputElement;
let textInputElement;

export let token = null;

let cardsHTML;

export const renderCards = (cards) => {
  const appEl = document.querySelector('.container');

  cardsHTML = cards
  .map((card, index) => {
    return `
      <ul id="list" class="comments">
        <li data-comment="${card.text}" data-index="${index}" class="comment">
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
      </li>
    </ul>`;
  })
  .join("");
  
  if(!token) {
    console.log('Нет токена');
    renderLoginComponent ({
      appEl, 
      setToken: (newToken) => {
        token = newToken;
      }, 
    })
return;

  }
 

  const appHTML = `
              <h4 class="article" id="article">Пожалуйста, подождите комментарии загружаются</h4>       
              <ul id="list" class="comments">
              ${cardsHTML}
              </ul>
              <div class="add-form">
                  <input
                    type="text" id="name-input"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                  />
                  <textarea
                    type="textarea" id="text-input"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                  ></textarea>
                  <div class="add-form-row">
                    <button id="add-button" class="add-form-button">Написать</button>
                  </div>
                </div>
              </div> `
  
    appEl.innerHTML = appHTML;

    buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById('list');
    nameInputElement = document.getElementById('name-input');
    textInputElement = document.getElementById('text-input');
    const likesCounterElements = document.querySelectorAll('.likes-counter');
    articleElement = document.getElementById('article');

    // console.log(articleElement);

    initAddLikesListeners();
    initAddRecommentListeners();

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
    
      fetchProm(token);
    });

  };
  export {articleElement};
  export {buttonElement};
  export {nameInputElement};
  export {textInputElement};
  export {cardsHTML};
 

  // renderCards(cards);


  export { initAddLikesListeners };
  export { initAddRecommentListeners };



