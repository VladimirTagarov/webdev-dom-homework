"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullDate = fullDate;
exports.initAddRecommentListeners = initAddRecommentListeners;
exports.cards = exports.initAddLikesListeners = void 0;

var _api = require("./api.js");

var _render = require("./render.js");

var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article');
var cards = [];
exports.cards = cards;

function fullDate(date) {
  var inputDate = new Date(date);
  var dayDate = inputDate.getDate();

  if (dayDate < 10) {
    dayDate = '0' + dayDate;
  }

  ;
  var monthDate = inputDate.getMonth();
  monthDate += 1;

  if (monthDate < 10) {
    monthDate = '0' + monthDate;
  }

  ;
  var yearDate = inputDate.getFullYear();
  yearDate = yearDate - 2000;
  var hourDate = inputDate.getHours();

  if (hourDate < 10) {
    hourDate = '0' + hourDate;
  }

  ;
  var minutesDate = inputDate.getMinutes();

  if (minutesDate < 10) {
    minutesDate = '0' + minutesDate;
  }

  ;
  return dayDate + "." + monthDate + "." + yearDate + " " + hourDate + ':' + minutesDate;
}

fullDate();
(0, _api.fetchFunc)(cards);

var initAddLikesListeners = function initAddLikesListeners(cards) {
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
initAddLikesListeners(cards);

function initAddRecommentListeners(cards) {
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
        textInputElement.value = "<".concat(commentBodyElement, "\n   ").concat(curElement.name, ", \n   ");
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
initAddRecommentListeners(cards);
buttonElement.addEventListener('click', function () {
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === '') {
    nameInputElement.classList.add("error");
    return;
  } else if (textInputElement.value === '') {
    textInputElement.classList.add("error");
    return;
  }

  ;
  buttonElement.disabled = true;
  buttonElement.textContent = "Ваши данные загружаются";
  (0, _api.fetchProm)();
});