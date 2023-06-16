import { token } from "./main.js";
import { fetchFunc, fetchProm, cards, initAddLikesListeners, initAddRecommentListeners } from "./api.js";

let buttonElement;
let articleElement;
let nameInputElement;
let textInputElement;


export const renderCards = (cards) => {
  const appEl = document.getElementById('app')
  if(!token) {
    const appHTML = `
    <div class="container">
      <ul id="list" class="comments">
      </ul>
      
      <div class="add-form" id="autorize">
        <input
          type="text" id="login-input"
          class="add-form-name"
        />
        <input
          type="text" id="password-input"
          class="add-form-name"
        >
        <div class="add-form-row">
          <button id="login-button" class="add-form-button">Войти</button>
        </div>
        <div class="add-form-row">
          <button id="login-button" class="add-form-button">Зарегистрироваться</button>
        </div>
      </div> 
`

appEl.innerHTML = appHTML;
document.getElementById("login-button").addEventListener("click", () => {
  login({
    login: "admin",
    password: "admin",
  }).then((user) => {
    setToken(`Bearer ${user.user.token}`);
    renderCards();
  })
  token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

  
  
  renderCards();
})
return;

  }
 

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

  const appHTML = `
            <div class="container">
              <ul id="list" class="comments">
              </ul>
              <h4 class="article" id="article">Пожалуйста, подождите комментарии загружаются</h4>
              ${cardsHTML}
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
    
      fetchProm();
    });

  };
  export {articleElement};
  export {buttonElement};
  export {nameInputElement};
  export {textInputElement};
 

  // renderCards(cards);


  export { initAddLikesListeners };
  export { initAddRecommentListeners };



