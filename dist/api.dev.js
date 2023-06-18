"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAddRecommentListeners = initAddRecommentListeners;
exports.fetchFunc = fetchFunc;
exports.fetchProm = fetchProm;
exports.loginUser = loginUser;
exports.cards = exports.initAddLikesListeners = void 0;

var _render = require("./render.js");

var _main = require("./main.js");

// import { cards } from "./main.js";
// const buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list'); // const nameInputElement = document.getElementById('name-input');
// const textInputElement = document.getElementById('text-input');

var likesCounterElements = document.querySelectorAll('.likes-counter');
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
        _render.textInputElement.value = "<".concat(commentBodyElement, "\n       ").concat(curElement.name, ", \n       ");
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

function fetchFunc(token) {
  // console.log(articleElement);
  return fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
      Authorization: "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
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
    (0, _render.renderCards)(cards);
  }).then(function () {
    _render.articleElement.style.display = "none";
  });
}

; //  console.log(cards);

fetchFunc();

function fetchProm() {
  fetch("https://webdev-hw-api.vercel.app/api/v2/vladimir-tagarov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: _render.nameInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      text: _render.textInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;") // forceError: true,

    }),
    headers: {
      // Authorization: `Bearer ${token}`,
      Authorization: "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
    }
  }).then(function (response) {
    if (response.status === 400) {
      alert('Имя и комментарий должны быть не короче 3 символов');
      throw new Error('Некорректный комментарий');
      _render.buttonElement.disabled = false;
      _render.buttonElement.textContent = "Написать";
    } else if (response.status === 500) {
      alert('Сервер сломался, попробуйте еще раз');
      throw new Error('Ошибка сервера');
      _render.buttonElement.disabled = false;
      _render.buttonElement.textContent = "Написать";
    } else {
      response.json();
    }
  }).then(function (responseData) {
    _render.buttonElement.disabled = false;
    _render.buttonElement.textContent = "Написать";
    _render.nameInputElement.value = "";
    _render.textInputElement.value = "";
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
  _render.buttonElement.disabled = false;
  _render.buttonElement.textContent = "Написать";
}

;

function loginUser(_ref) {
  var login = _ref.login,
      password = _ref.password;
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password
    })
  }).then(function (response) {
    if (response.status === 400) {
      throw new Error('Неверный логин или пароль');
    }

    return response.json();
  });
} // fetchProm();