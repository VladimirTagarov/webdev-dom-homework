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
exports.textInputElement = exports.nameInputElement = exports.buttonElement = exports.articleElement = exports.renderCards = void 0;

var _api = require("./api.js");

// import { token, setToken } from "./main.js";
// import { renderLoginComponent } from "./Components/login-component.js";
var buttonElement;
exports.buttonElement = buttonElement;
var articleElement;
exports.articleElement = articleElement;
var nameInputElement;
exports.nameInputElement = nameInputElement;
var textInputElement; // let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

exports.textInputElement = textInputElement;
var token = null; // export function setToken(newToken) {
//  token = newToken;
// };

var renderCards = function renderCards(cards) {
  var appEl = document.getElementById('app');
  var cardsHTML = cards.map(function (card, index) {
    return "\n    <div class=\"container\">\n              <ul id=\"list\" class=\"comments\">\n              </ul>\n              <li data-comment=\"".concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment\">\n      <div data-name=\"").concat(card.name, "\" class=\"comment-header\">\n        ").concat(card.name, "\n        <div>").concat(card.date, "</div>\n      </div>\n      <div data-comment=\"").concat(card.text, "\" data-index=\"").concat(index, "\" class=\"comment-body\">\n     \n          ").concat(card.text, "\n    \n      </div>\n      <div class=\"comment-footer\">\n        <div class=\"likes\">\n          <span class=\"likes-counter\">").concat(card.likesCounter, "</span>\n          <button class=\"like-button ").concat(card["class"], "\" data-index=\"").concat(index, "\"></button>\n        </div>\n      </div>\n    </li>");
  }).join("");

  if (!token) {
    var commentHTML = "\n\n    ".concat(cardsHTML, "\n    <h4 class=\"link\" id=\"link\">\u0414\u043B\u044F \u0442\u043E\u0433\u043E \u0447\u0442\u043E\u0431\u044B \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 <a id=\"link-comment\" class=\"link-comment\">\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C</a></h4>");
    appEl.innerHTML = commentHTML;
    document.getElementById("link-comment").addEventListener("click", function () {
      var appHTML = " <div class=\"container\">\n      <ul id=\"list\" class=\"comments\">\n      </ul>\n      \n      <div class=\"add-form add-form-login\" id=\"autorize\">\n        <input\n          type=\"text\" id=\"login-input\"\n          class=\"add-form-name\"\n        />\n        <input\n          type=\"password\" id=\"password-input\"\n          class=\"add-form-name\"\n        >\n        <div class=\"add-form-row\">\n          <button id=\"login-button\" class=\"add-form-button\">\u0412\u043E\u0439\u0442\u0438</button>\n        </div>\n        <div class=\"add-form-row\">\n          <button id=\"login-button-registration\" class=\"add-form-button\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n        </div>\n      </div> \n";
      appEl.innerHTML = appHTML;
      document.getElementById("login-button").addEventListener("click", function () {
        var login = document.getElementById("login-input").value;
        var password = document.getElementById("password-input").value;

        if (!login) {
          alert('Введите логин');
          return;
        }

        if (!password) {
          alert('Введите логин');
          return;
        }

        (0, _api.loginUser)({
          login: login,
          password: password
        }).then(function (user) {
          token = "Bearer ".concat(user.user.token);
          (0, _api.fetchFunc)();
        })["catch"](function (error) {
          alert(error.message);
        });
      });
    }); //    ` <div class="container">
    //       <ul id="list" class="comments">
    //       </ul>
    //       <div class="add-form add-form-login" id="autorize">
    //         <input
    //           type="text" id="login-input"
    //           class="add-form-name"
    //         />
    //         <input
    //           type="password" id="password-input"
    //           class="add-form-name"
    //         >
    //         <div class="add-form-row">
    //           <button id="login-button" class="add-form-button">Войти</button>
    //         </div>
    //         <div class="add-form-row">
    //           <button id="login-button-registration" class="add-form-button">Зарегистрироваться</button>
    //         </div>
    //       </div> 
    // `

    appEl.innerHTML = appHTML;
    document.getElementById("login-button").addEventListener("click", function () {
      var login = document.getElementById("login-input").value;
      var password = document.getElementById("password-input").value;

      if (!login) {
        alert('Введите логин');
        return;
      }

      if (!password) {
        alert('Введите логин');
        return;
      }

      (0, _api.loginUser)({
        login: login,
        password: password
      }).then(function (user) {
        token = "Bearer ".concat(user.user.token);
        (0, _api.fetchFunc)();
      })["catch"](function (error) {
        alert(error.message);
      });
    }); // token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
    // renderLoginComponent( {
    //   appEl, 
    //   setToken: (newToken) => {
    //   token = newToken;
    // }, 
    // renderCards
    // });

    return;
  } // const cardsHTML = cards
  // .map((card, index) => {
  //   return `<li data-comment="${card.text}" data-index="${index}" class="comment">
  //     <div data-name="${card.name}" class="comment-header">
  //       ${card.name}
  //       <div>${card.date}</div>
  //     </div>
  //     <div data-comment="${card.text}" data-index="${index}" class="comment-body">
  //         ${card.text}
  //     </div>
  //     <div class="comment-footer">
  //       <div class="likes">
  //         <span class="likes-counter">${card.likesCounter}</span>
  //         <button class="like-button ${card.class}" data-index="${index}"></button>
  //       </div>
  //     </div>
  //   </li>`;
  // })
  // .join("");


  var appHTML = "\n            <div class=\"container\">\n              <ul id=\"list\" class=\"comments\">\n              </ul>\n              <h4 class=\"article\" id=\"article\">\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u044E\u0442\u0441\u044F</h4>\n              ".concat(cardsHTML, "\n              <div class=\"add-form\">\n                  <input\n                    type=\"text\" id=\"name-input\"\n                    class=\"add-form-name\"\n                    placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F\"\n                  />\n                  <textarea\n                    type=\"textarea\" id=\"text-input\"\n                    class=\"add-form-text\"\n                    placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\"\n                    rows=\"4\"\n                  ></textarea>\n                  <div class=\"add-form-row\">\n                    <button id=\"add-button\" class=\"add-form-button\">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</button>\n                  </div>\n                </div>\n              </div> ");
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
};

exports.renderCards = renderCards;