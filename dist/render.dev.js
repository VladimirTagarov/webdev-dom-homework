"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCards = void 0;
// import { initAddLikesListeners } from "./main.js";
// import { initAddRecommentListeners } from "./main.js";
var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article');
var cards = [];

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
        renderCards(cards);
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
initAddRecommentListeners();

var renderCards = function renderCards(cards) {
  var cardsHTML = cards.map(function (card, index) {
    return "<li data-comment=\"".concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment\">\n        <div data-name=\"").concat(card.name, "\" class=\"comment-header\">\n          ").concat(card.name, "\n          <div>").concat(card.date, "</div>\n        </div>\n        <div data-comment=\"").concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment-body\">\n       \n            ").concat(card.text, "\n      \n        </div>\n        <div class=\"comment-footer\">\n          <div class=\"likes\">\n            <span class=\"likes-counter\">").concat(card.likesCounter, "</span>\n            <button class=\"like-button ").concat(card["class"], "\" data-index=\"").concat(index, "\"></button>\n          </div>\n        </div>\n      </li>");
  }).join("");
  listElement.innerHTML = cardsHTML;
  initAddLikesListeners();
  initAddRecommentListeners();
};

exports.renderCards = renderCards;
renderCards(cards);