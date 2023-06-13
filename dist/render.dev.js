"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initAddLikesListeners", {
  enumerable: true,
  get: function get() {
    return _main.initAddLikesListeners;
  }
});
Object.defineProperty(exports, "initAddRecommentListeners", {
  enumerable: true,
  get: function get() {
    return _main.initAddRecommentListeners;
  }
});
exports.renderCards = void 0;

var _main = require("./main.js");

var _api = require("./api.js");

var buttonElement = document.getElementById('add-button');
var listElement = document.getElementById('list');
var nameInputElement = document.getElementById('name-input');
var textInputElement = document.getElementById('text-input');
var likesCounterElements = document.querySelectorAll('.likes-counter');
var articleElement = document.getElementById('article');

var renderCards = function renderCards(cards) {
  var cardsHTML = cards.map(function (card, index) {
    return "<li data-comment=\"".concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment\">\n        <div data-name=\"").concat(card.name, "\" class=\"comment-header\">\n          ").concat(card.name, "\n          <div>").concat(card.date, "</div>\n        </div>\n        <div data-comment=\"").concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment-body\">\n       \n            ").concat(card.text, "\n      \n        </div>\n        <div class=\"comment-footer\">\n          <div class=\"likes\">\n            <span class=\"likes-counter\">").concat(card.likesCounter, "</span>\n            <button class=\"like-button ").concat(card["class"], "\" data-index=\"").concat(index, "\"></button>\n          </div>\n        </div>\n      </li>");
  }).join("");
  listElement.innerHTML = cardsHTML;
  (0, _main.initAddLikesListeners)();
  (0, _main.initAddRecommentListeners)();
}; // renderCards(cards);
// export { cards };


exports.renderCards = renderCards;