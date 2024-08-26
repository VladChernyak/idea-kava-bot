import { gsap } from "gsap";

const optionsList = [
  "Кава",
  "Шоколад",
  "Молоко",
  "Айріш",
  "--",
  "Стакани 350",
  "Стакани 240",
  "Стакани 110",
  "--",
  "Кришечки жовті",
  "Кришечки рожеві",
  "Кришечки Сині",
  "Кришечки Фіолетові",
  "Цукор",
  "Кориця",
  "Серветки",
  "Чай",
  "--",
  "Сироп Шоколад",
  "Сироп Горіховий",
  "Сироп Кокосовий",
  "Сироп Карамель",
  "--",
  "Трубочки без упаковки",
  "Трубочки в упаковці",
  "Мішалочки",
  "Сміття пакети",
  "Антісептик",
];

export const createOptionsList = () => {
  const list = optionsList.map((option) => {
    if (option === "--") {
      return '<div class="divider">•••</div>';
    }

    return `
          <label class="checkbox">
              <input type="checkbox" value="${option}" />
              <span>${option}</span>
              <div class="checkbox__box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  viewBox="0 0 17.837 17.837"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      style="fill: #fff"
                      d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27   c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0   L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"
                    />
                  </g>
                </svg>
              </div>
            </label>
      `;
  });

  return list.join("");
};

const renderOptionsList = () => {
  const fieldset = document.querySelector("#options-list");
  const wrapper = document.createElement("div");

  wrapper.insertAdjacentHTML("beforeend", createOptionsList());
  fieldset.append(wrapper);

  fieldset.append(wrapper);
  gsap.to("#options-form", {
    opacity: 1,
    duration: 0.5,
  });
};

const showDialogAnimation = (dialog) => {
  const dialogContent = dialog.querySelector(".confirm-dialog__content");

  const tl = gsap.timeline();

  tl.to(dialog, {
    duration: 0.3,
    opacity: 1,
  });

  tl.to(dialogContent, {
    duration: 0.3,
    opacity: 1,
    transform: "none",
  });
};

const closeDialogAnimation = (dialog) => {
  const dialogContent = dialog.querySelector(".confirm-dialog__content");

  const tl = gsap.timeline({ onComplete: () => dialog.remove() });

  tl.to(dialogContent, {
    duration: 0.3,
    opacity: 0,
    transform: "translateY(-20px)",
  });

  tl.to(dialog, {
    duration: 0.3,
    opacity: 0,
  });
};

const sendCheckedData = (dialog) => {
  const checkedItems = dialog.querySelectorAll("#confirm-dialog-list li");
  const checkedData = Array.from(checkedItems).map(
    (item) => item.dataset.value
  );

  window.Telegram.WebApp.sendData(JSON.stringify(checkedData));
};

const showDialogSuccessResult = (dialog) => {
  const dialogContent = dialog.querySelector(".confirm-dialog__content");
  const dialogContentElements = dialog.querySelectorAll(
    ".confirm-dialog__content > *"
  );

  const tl = gsap.timeline();

  tl.to(dialogContentElements, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      dialogContent.insertAdjacentHTML(
        "beforeend",
        `
        <svg xmlns="http://www.w3.org/2000/svg" class="svg-success" viewBox="0 0 24 24">
        <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
          <circle class="success-circle-outline" cx="12" cy="12" r="11.5"/>
          <circle class="success-circle-fill" cx="12" cy="12" r="11.5"/>
          <polyline class="success-tick" points="17,8.5 9.5,15.5 7,13"/>
        </g>
        </svg>
        `
      );
    },
  });
};

const showConfirmDialog = (options) => {
  const appContent = document.querySelector("#app-content");
  const dialogContainer = document.createElement("div");

  dialogContainer.classList.add("confirm-dialog");
  dialogContainer.insertAdjacentHTML(
    "beforeend",
    `
          <div class="confirm-dialog__content">
            <h3>Усе правильно?</h3>

            <ul id="confirm-dialog-list">

            </ul>

            <button class="confirm-dialog__send">
              Відправити
            </button>
    `
  );

  const items = options.map((option) => {
    const li = document.createElement("li");
    li.dataset.value = option;
    li.insertAdjacentHTML(
      "beforeend",
      `
      <span>${option}</span>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
      >
          <path
              d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
      `
    );

    li.querySelector("svg").addEventListener("click", () => {
      li.remove();

      const liItems = document.querySelectorAll("#confirm-dialog-list li");
      if (!liItems.length) closeDialogAnimation(dialogContainer);
    });
    return li;
  });

  dialogContainer.addEventListener("click", ({ target }) => {
    if (target === dialogContainer) {
      closeDialogAnimation(target);
    }
  });

  const dialogSendButton = dialogContainer.querySelector(
    ".confirm-dialog__send"
  );
  const dialogListContainer = dialogContainer.querySelector(
    "#confirm-dialog-list"
  );

  dialogListContainer.append(...items);
  dialogSendButton.addEventListener("click", () => {
    sendCheckedData(dialogContainer);
    showDialogSuccessResult(dialogContainer);
  });

  appContent.append(dialogContainer);
  showDialogAnimation(dialogContainer);
};

export const initForm = () => {
  const form = document.querySelector("#options-form");

  renderOptionsList();

  form.onsubmit = (e) => {
    e.preventDefault();

    const submitButton = form.querySelector("[type=submit]");
    const values = [];

    Array.from(form.elements).forEach((element) => {
      if (element.checked) {
        values.push(element.value);
        element.checked = false;
      }
    });

    submitButton.disabled = true;
    showConfirmDialog(values);
  };

  form.onchange = (e) => {
    const submitButton = form.querySelector("[type=submit]");
    const hasChecked = Array.from(form.elements).some(
      (element) => element.checked
    );

    if (hasChecked) submitButton.disabled = false;
    else submitButton.disabled = true;
  };
};
