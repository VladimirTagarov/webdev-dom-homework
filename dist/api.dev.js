"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAddRecommentListeners = initAddRecommentListeners;
exports.fetchFunc = fetchFunc;
exports.fetchProm = fetchProm;
exports.cards = exports.initAddLikesListeners = void 0;

var _render = require("./render.js");

var _main = require("./main.js");

// import { cards } from "./main.js";
var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article');
var cards = [];
exports.cards = cards;

var initAddLikesListeners = function initAddLikesListeners() {
  var likesCounterElements = document.querySelectorAll('.likes-counter');
  var addLikesElements = document.querySelectorAll(".like-button");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var addLikesElement = _step.value;
      addLikesElement.addEventListener("click", function (event) {
        var indexElement = addLikesElement.dataset.index;
        var currentElement = cards[indexElement];
        event.stopPropagation();

        if (currentElement["class"] === '-active-like') {
          currentElement.likesCounter--;
          currentElement["class"] = '';
        } else {
          currentElement.likesCounter++;
          currentElement["class"] = '-active-like';
        }

        ;
        (0, _render.renderCards)(cards);
      });
    };

    for (var _iterator = addLikesElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
};

exports.initAddLikesListeners = initAddLikesListeners;
initAddLikesListeners();

function initAddRecommentListeners() {
  var commentElements = document.querySelectorAll('.comment');
  var commentHeaderElements = document.querySelectorAll('.comment-header');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var commentElement = _step2.value;
      commentElement.addEventListener('click', function () {
        var commentBodyElement = commentElement.dataset.comment;
        var indexElement = commentElement.dataset.index;
        var curElement = cards[indexElement];
        var cardNameElement = commentElement.dataset.name;
        textInputElement.value = "<".concat(commentBodyElement, "\n       ").concat(curElement.name, ", \n       ");
      });
    };

    for (var _iterator2 = commentElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
}

;
initAddRecommentListeners();

function fetchFunc() {
  var token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
  return fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
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
    exports.cards = cards = appComments;
    (0, _render.renderCards)(cards, initAddLikesListeners, initAddRecommentListeners);
  }).then(function () {
    articleElement.style.display = "none";
  });
}

; //  console.log(cards);

fetchFunc();

function fetchProm(cards) {
  fetch("https://webdev-hw-api.vercel.app/api/v1/vladimir-tagarov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      text: textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;") // forceError: true,
      // headers: {
      //   Authorization: token,
      // },

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