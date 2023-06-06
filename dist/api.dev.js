"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFunc = fetchFunc;
exports.fetchProm = fetchProm;
exports.cards = void 0;

var _render = require("./render.js");

var _main = require("./main.js");

var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article');
var cards = [];
exports.cards = cards;

function fetchFunc() {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
    method: "GET"
  }).then(function (response) {
    return response.json();
  }).then(function (responseData) {
    var appComments = responseData.comments.map(function (comment) {
      return {
        name: comment.author.name,
        date: (0, _main.fullDate)(comment.date),
        text: comment.text,
        likesCounter: comment.likes,
        activeLike: false
      };
    });
    exports.cards = cards = appComments;
    (0, _render.renderCards)(cards);
  }).then(function () {
    articleElement.style.display = "none";
  });
}

;
fetchFunc();

function fetchProm() {
  fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;") // forceError: true,

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

;
fetchProm();