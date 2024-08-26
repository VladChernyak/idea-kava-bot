import "./assets/styles.css";
import { initForm } from "./modules/options-form";
import { removePreloader } from "./modules/preloader";

const init = async () => {
  await removePreloader();
  initForm();
};

init();
