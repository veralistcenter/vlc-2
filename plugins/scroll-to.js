import Vue from "vue";
import smoothscroll from "smoothscroll-polyfill";

Vue.prototype.$scrollToTarget = (target, ctx) => {
  // t = (string) target
  // h = (boolean) highlight footnote
  // i = (boolean) already has element
  // s = (boolean) superscript target

  smoothscroll.polyfill();
  // construct element id
  const tar = target.t[0] !== "#" ? "#" + target.t : target.t;

  const t = target.i ? target.t : tar;

  // cancel if cant find
  if (target.i !== true) {
    if (
      document.querySelector(t) === null ||
      document.querySelector(t) === undefined
    ) {
      return;
    }
  }

  const el = target.i ? t : document.querySelector(t);
  // construct distance
  let targetArea = window.scrollY + el.getBoundingClientRect().top;
  setTimeout(() => {
    targetArea = targetArea - 120;
    window.scrollTo({
      left: 0,
      top: targetArea,
      behavior: "smooth",
    });
  }, 50);
};

Vue.prototype.$jumpToTarget = (target, ctx) => {
  if (
    document.querySelector("#" + target) === null ||
    document.querySelector("#" + target) === undefined
  ) {
    return;
  }

  let targetArea =
    window.scrollY +
    document.querySelector("#" + target).getBoundingClientRect().top;

  // if header nav exists on page
  // if(document.querySelector('#site_header')){
  // 	targetArea = targetArea - (document.querySelector('#site_header').getAttribute('data-height'))
  // }else{
  // 	targetArea = targetArea
  // }

  setTimeout(() => {
    window.scrollTo(0, targetArea);
  }, 50);
};
