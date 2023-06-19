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
  const appEl = document.getElementById('app');

  cardsHTML = cards
  .map((card, index) => {
    return `
    <div class="container">
              <ul id="list" class="comments">
              </ul>
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
    </li>`;
  })
  .join("");
  
  if(!token) {
    renderLoginComponent ({
      appEl, 
      setToken: (newToken) => {
        token = newToken;
      }, 
      renderCards,
    })

//     const commentHTML = `

//     ${cardsHTML}
//     <h4 class="link" id="link">Для того чтобы оставить комментарий <a id="link-comment" class="link-comment">авторизуйтесь</a></h4>`

//     appEl.innerHTML = commentHTML;
    
//     document.getElementById("link-comment").addEventListener("click", () => {
//     const appHTML =
//          ` <div class="container">
//       <ul id="list" class="comments">
//       </ul>
      
//       <div class="add-form add-form-login" id="autorize">
//         <input
//           type="text" id="login-input"
//           class="add-form-name"
//         />
//         <input
//           type="password" id="password-input"
//           class="add-form-name"
//         >
//         <div class="add-form-row">
//           <button id="login-button" class="add-form-button">Войти</button>
//         </div>
//         <div class="add-form-row">
//           <button id="login-button-registration" class="add-form-button">Зарегистрироваться</button>
//         </div>
//       </div> 
// `
// appEl.innerHTML = appHTML;
// document.getElementById("login-button").addEventListener("click", () => {
//   const login = document.getElementById("login-input").value;
//   const password = document.getElementById("password-input").value;

//   if(!login) {
//     alert('Введите логин');
//     return;
//   }

//   if(!password) {
//     alert('Введите логин');
//     return;
//   }

//   loginUser({
//     login: login,
//     password: password,
//   }).then((user) => {
//     token = `Bearer ${user.user.token}`;
//     fetchFunc();
//   }).catch(error => {
//     alert(error.message);
//   })
// })

//     })

// appEl.innerHTML = appHTML;
// document.getElementById("login-button").addEventListener("click", () => {
//   const login = document.getElementById("login-input").value;
//   const password = document.getElementById("password-input").value;

//   if(!login) {
//     alert('Введите логин');
//     return;
//   }

//   if(!password) {
//     alert('Введите логин');
//     return;
//   }

//   loginUser({
//     login: login,
//     password: password,
//   }).then((user) => {
//     token = `Bearer ${user.user.token}`;
//     fetchFunc();
//   }).catch(error => {
//     alert(error.message);
//   })
// })

return;

  }
 

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



