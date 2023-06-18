

// export function renderLoginComponent(appEl, setToken, renderCards) {
//     const appHTML = `
//     <div class="container">
//       <ul id="list" class="comments">
//       </ul>
      
//       <div class="add-form" id="autorize">
//         <input
//           type="text" id="login-input"
//           class="add-form-name"
//         />
//         <input
//           type="text" id="password-input"
//           class="add-form-name"
//         >
//         <div class="add-form-row">
//           <button id="login-button" class="add-form-button">Войти</button>
//         </div>
//         <div class="add-form-row">
//           <button id="login-button" class="add-form-button">Зарегистрироваться</button>
//         </div>
//       </div> 
// `;

// appEl.innerHTML = appHTML;
// document.getElementById("login-button").addEventListener("click", () => {
//   login({
//     login: "admin",
//     password: "admin",
//   }).then((user) => {
//     setToken(`Bearer ${user.user.token}`);
//     renderCards();
//   })
//   token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

  
  
//   renderCards();

//   renderLoginComponent();

//   return;
// })
// }