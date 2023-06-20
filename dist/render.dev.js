"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initAddLikesListeners", {
  enumerable: true,
  get: function get() {
    return _api.initAddLikesListeners;
  }
});
Object.defineProperty(exports, "initAddRecommentListeners", {
  enumerable: true,
  get: function get() {
    return _api.initAddRecommentListeners;
  }
});
exports.cardsHTML = exports.textInputElement = exports.nameInputElement = exports.buttonElement = exports.articleElement = exports.renderCards = exports.token = void 0;

var _loginComponent = require("./Components/login-component.js");

var _api = require("./api.js");

var _dateFns = require("date-fns");

// import { token, setToken } from "./index.js";
// import { renderLoginComponent } from "./Components/login-component.js";
var buttonElement;
exports.buttonElement = buttonElement;
var articleElement;
exports.articleElement = articleElement;
var nameInputElement;
exports.nameInputElement = nameInputElement;
var textInputElement;
exports.textInputElement = textInputElement;
var token = null;
exports.token = token;
var cardsHTML;
exports.cardsHTML = cardsHTML;

var renderCards = function renderCards(cards) {
  var appEl = document.querySelector('.container');
  exports.cardsHTML = cardsHTML = cards.map(function (card, index) {
    var now = (0, _dateFns.format)(new Date(card.date), "yyyy-MM-dd hh.mm.ss");
    return "\n      <ul id=\"list\" class=\"comments\">\n    <li data-comment=\"".concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment\">\n      <div data-name=\"").concat(card.name, "\" class=\"comment-header\">\n        ").concat(card.name, "\n        <div>").concat(now, "</div>\n      </div>\n      <div data-comment=\"").concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment-body\">\n     \n          ").concat(card.text, "\n    \n      </div>\n      <div class=\"comment-footer\">\n        <div class=\"likes\">\n          <span class=\"likes-counter\">").concat(card.likesCounter, "</span>\n          <button class=\"like-button ").concat(card["class"], "\" data-index=\"").concat(index, "\"></button>\n        </div>\n      </div>\n    </li>\n    </ul>\n    ");
  }).join('');

  if (!token) {
    console.log('НЕТ ТОКЕНА');
    (0, _loginComponent.renderLoginComponent)({
      appEl: appEl,
      setToken: function setToken(newToken) {
        exports.token = token = newToken;
      }
    });
    return;
  }

  var appHTML = "\n              <h4 class=\"article\" id=\"article\">\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u044E\u0442\u0441\u044F</h4>\n              <ul id=\"list\" class=\"comments\">\n              ".concat(cardsHTML, "\n              </ul>\n              <div class=\"add-form\">\n                  <input\n                    type=\"text\" id=\"name-input\"\n                    class=\"add-form-name\"\n                    placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F\"\n                  />\n                  <textarea\n                    type=\"textarea\" id=\"text-input\"\n                    class=\"add-form-text\"\n                    placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\"\n                    rows=\"4\"\n                  ></textarea>\n                  <div class=\"add-form-row\">\n                    <button id=\"add-button\" class=\"add-form-button\">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</button>\n                  </div>\n                </div>\n ");
  appEl.innerHTML = appHTML;
  exports.buttonElement = buttonElement = document.getElementById('add-button');
  var listElement = document.getElementById('list');
  exports.nameInputElement = nameInputElement = document.getElementById('name-input');
  exports.textInputElement = textInputElement = document.getElementById('text-input');
  var likesCounterElements = document.querySelectorAll('.likes-counter');
  exports.articleElement = articleElement = document.getElementById('article'); // console.log(articleElement);

  (0, _api.initAddLikesListeners)();
  (0, _api.initAddRecommentListeners)();
  buttonElement.addEventListener('click', function () {
    nameInputElement.classList.remove('error');
    textInputElement.classList.remove('error');

    if (nameInputElement.value === '') {
      nameInputElement.classList.add('error');
      return;
    } else if (textInputElement.value === '') {
      textInputElement.classList.add('error');
      return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = 'Ваши данные загружаются';
    (0, _api.fetchProm)(token);
  });
};

exports.renderCards = renderCards;