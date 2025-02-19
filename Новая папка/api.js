import { renderCards, initAddLikesListeners, initAddRecommentListeners } from "./render.js";
import { fullDate } from "./main.js";

const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById('list');
    const nameInputElement = document.getElementById('name-input');
    const textInputElement = document.getElementById('text-input');
    const likesCounterElements = document.querySelectorAll('.likes-counter');
    const articleElement = document.getElementById('article');

    let cards = [];

  

export function fetchFunc() {
    
    return fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
      method: "GET"
    })
    .then((response) => {
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

  fetchFunc();

      
  

      export function fetchProm() {
      fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        // forceError: true,
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

// fetchProm();
export {cards};