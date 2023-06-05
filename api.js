import { renderCards } from "./renderCards.js";

const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById('list');
    const nameInputElement = document.getElementById('name-input');
    const textInputElement = document.getElementById('text-input');
    const likesCounterElements = document.querySelectorAll('.likes-counter');
    const articleElement = document.getElementById('article');

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
          };
        })        
        cards = appComments;
        
        renderCards(cards);
      })
      .then(() => {
      articleElement.style.display = "none";
    })
      
   };

  fetchFunc();

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
     

      export const fetchProm = fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        forceError: true,
      })
    });
    fetchProm.then((response) => {
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
    alert('Кажется что-то пошло не так, проверьте интернет-соединение');
    console.warn("error");
  });
  
  buttonElement.disabled = false;
  buttonElement.textContent = "Написать";
  
});