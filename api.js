import { renderCards, articleElement, nameInputElement, textInputElement, buttonElement } from "./render.js";
import { fullDate, token} from "./main.js";
// import { cards } from "./main.js";

// const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById('list');
    // const nameInputElement = document.getElementById('name-input');
    // const textInputElement = document.getElementById('text-input');
    const likesCounterElements = document.querySelectorAll('.likes-counter');

    let cards = [];

    export const initAddLikesListeners = () => {
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
    
    export function initAddRecommentListeners() {
    
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

export function fetchFunc(cards, token) {

    
    return fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
      method: "GET",
      headers: {
        author: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      };
      return response.json();
    })

    
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: fullDate(comment.date),
            text: comment.text,
            likesCounter: comment.likes,
            activeLike: false, 
            class: "",
          };
        })        
        cards = appComments;
        
        renderCards(cards, initAddLikesListeners, initAddRecommentListeners);
      })
      .then(() => {
      articleElement.style.display = "none";
    })
      
   };
  //  console.log(cards);
  fetchFunc();

      
  

      export function fetchProm() {

      fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        // forceError: true,
        headers: {
          author: `Bearer ${token}`,
        },
      })
    })
    .then((response) => {
      if (response.status === 400) {
        alert ('Имя и комментарий должны быть не короче 3 символов');
        throw new Error ('Некорректный комментарий');
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
      }
      else if (response.status === 500) {
        alert ('Сервер сломался, попробуйте еще раз');
        throw new Error ('Ошибка сервера');
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
      }
      else {
        response.json();
      }
    })
    .then((responseData) => {
  buttonElement.disabled = false;
  buttonElement.textContent = "Написать";
  nameInputElement.value = "";
  textInputElement.value = "";
  fetchFunc();
  })
  .catch((error) => {
    if (response.status === 500){
      console.warn("error");
    }
    else if (response.status === 400){
      console.warn("error");
    }
    else {    
    alert('Кажется что-то пошло не так, проверьте интернет-соединение');
    console.warn("error");
    }
  });
  
  buttonElement.disabled = false;
  buttonElement.textContent = "Написать";
  
};

export function login({login, password}) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }). then((response) => {
    return response.json();
  });
}

export { cards };
// fetchProm();
