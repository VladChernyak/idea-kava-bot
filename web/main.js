import "./assets/styles.css";
import { initForm } from "./modules/options-form";
import { removePreloader } from "./modules/preloader";

const init = async () => {
  window.Telegram.WebApp.expand();
  await removePreloader();
  initForm();
};

init();
