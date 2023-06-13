"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFunc = fetchFunc;
exports.fetchProm = fetchProm;

var _render = require("./render.js");

var _main = require("./main.js");

// import { cards } from "./main.js";
var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article');

function fetchFunc(cards) {
  var token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
  return fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
    method: "GET",
    headers: {
      author: token
    }
  }).then(function (response) {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    }

    ;
    return response.json();
  }).then(function (responseData) {
    var appComments = responseData.comments.map(function (comment) {
      return {
        name: comment.author.name,
        date: (0, _main.fullDate)(comment.date),
        text: comment.text,
        likesCounter: comment.likes,
        activeLike: false,
        "class": ""
      };
    });
    cards = appComments;
    (0, _render.renderCards)(cards, _main.initAddLikesListeners, _main.initAddRecommentListeners);
  }).then(function () {
    articleElement.style.display = "none";
  });
}

; //  console.log(cards);
// fetchFunc(cards);

function fetchProm(cards) {
  fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      // forceError: true,
      headers: {
        Authorization: token
      }
    })
  }).then(function (response) {
    if (response.status === 400) {
      alert('Имя и комментарий должны быть не короче 3 символов');
      throw new Error('Некорректный комментарий');
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    } else if (response.status === 500) {
      alert('Сервер сломался, попробуйте еще раз');
      throw new Error('Ошибка сервера');
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    } else {
      response.json();
    }
  }).then(function (responseData) {
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    nameInputElement.value = "";
    textInputElement.value = "";
    fetchFunc();
  })["catch"](function (error) {
    if (response.status === 500) {
      console.warn("error");
    } else if (response.status === 400) {
      console.warn("error");
    } else {
      alert('Кажется что-то пошло не так, проверьте интернет-соединение');
      console.warn("error");
    }
  });
  buttonElement.disabled = false;
  buttonElement.textContent = "Написать";
}

; // fetchProm();