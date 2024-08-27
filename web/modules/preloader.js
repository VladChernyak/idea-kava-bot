import { gsap } from "gsap";

export const removePreloader = () => {
  const preloader = document.querySelector("#app-preloader");

  return new Promise((resolve) => {
    gsap.to(preloader, {
      duration: 0.3,
      delay: 1.5,
      opacity: 0,
      onComplete: () => {
        resolve();
        preloader.remove();
      },
    });
  });
};
