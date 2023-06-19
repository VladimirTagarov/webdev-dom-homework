"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLoginComponent = renderLoginComponent;

var _api = require("../api.js");

var _render = require("../render.js");

function renderLoginComponent(_ref) {
  var appEl = _ref.appEl,
      setToken = _ref.setToken,
      renderCards = _ref.renderCards;
  var commentHTML = "".concat(_render.cardsHTML, " <h4 class=\"link\" id=\"link\">\u0414\u043B\u044F \u0442\u043E\u0433\u043E \u0447\u0442\u043E\u0431\u044B \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 <a id=\"link-comment\" class=\"link-comment\">\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C</a></h4>");
  appEl.innerHTML = commentHTML;
  document.getElementById('link').addEventListener("click", function () {
    var appHTML = " <div class=\"container\">\n  <ul id=\"list\" class=\"comments\">\n  </ul>\n  \n  <div class=\"add-form add-form-login\" id=\"autorize\">\n    <input\n      type=\"text\" id=\"login-input\"\n      class=\"add-form-name\"\n    />\n    <input\n      type=\"password\" id=\"password-input\"\n      class=\"add-form-name\"\n    >\n    <div class=\"add-form-row\">\n      <button id=\"login-button\" class=\"add-form-button\">\u0412\u043E\u0439\u0442\u0438</button>\n    </div>\n    <div class=\"add-form-row\">\n      <button id=\"login-button-registration\" class=\"add-form-button\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n    </div>\n  </div> \n";
    appEl.innerHTML = appHTML;
    var authButton = document.getElementById("login-button");
    authButton.addEventListener("click", function () {
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
        setToken("Bearer ".concat(user.user.token));
        (0, _api.fetchFunc)();
      })["catch"](function (error) {
        alert(error.message);
      });
    });
  });
}