import { renderCards } from "./render.js";
import { fullDate, initAddLikesListeners, initAddRecommentListeners, cards } from "./main.js";
// import { cards } from "./main.js";

const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById('list');
    const nameInputElement = document.getElementById('name-input');
    const textInputElement = document.getElementById('text-input');
    const likesCounterElements = document.querySelectorAll('.likes-counter');
    const articleElement = document.getElementById('article');


export function fetchFunc(cards) {

   let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
    
    return fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
      method: "GET",
      headers: {
        author: token,
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
  // fetchFunc(cards);

      
  

      export function fetchProm(cards) {
      fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        // forceError: true,
        headers: {
          Authorization: token,
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

// fetchProm();
