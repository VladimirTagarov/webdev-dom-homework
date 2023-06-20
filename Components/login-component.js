import { loginUser, fetchFunc } from '../api.js';
import { cardsHTML } from '../render.js';
export function renderLoginComponent({ appEl, setToken }) {
  const commentHTML = `${cardsHTML} <h4 class="link" id="link">Для того чтобы оставить комментарий <a id="link-comment" class="link-comment">авторизуйтесь</a></h4>`;

  console.log(appEl);
  appEl.innerHTML = commentHTML;

  document.getElementById('link').addEventListener('click', () => {
    const appHTML = `
  <div class="add-form add-form-login" id="autorize">
    <input
      type="text" id="login-input"
      class="add-form-name"
      placeholder="Логин"
    />
    <input
      type="password" id="password-input"
      class="add-form-name"
      type="password"
      placeholder="Пароль"
    >
    <div class="add-form-row">
      <button id="login-button" class="add-form-button">Войти</button>
    </div>
    <div class="add-form-row">
      <button id="login-button-registration" class="add-form-button">Зарегистрироваться</button>
    </div>
  </div> 
  `;
    appEl.innerHTML = appHTML;

    // Записали элемент
    const authButton = document.getElementById('login-button');

    // Добавили обработчик
    authButton.addEventListener('click', () => {
      const login = document.getElementById('login-input').value;
      const password = document.getElementById('password-input').value;

      if (!login) {
        alert('Введите логин');
        return;
      }

      if (!password) {
        alert('Введите логин');
        return;
      }

      loginUser({
        login: login,
        password: password,
      })
        .then((user) => {
          setToken(`Bearer ${user.user.token}`);
          fetchFunc();
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  });
}
