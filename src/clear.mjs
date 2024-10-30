/**
 * [API] Remove all elements inserted by Morfana
 */

export default function clear(selector, development) {
  let obj = (!selector) ? document : selector;

  // if (development.colorize) {
  //   obj.querySelectorAll(".morfana-development-colorize").forEach((el) => el.remove()); // remove color label under letters
  // }

  // console.log(obj);

  delete obj.dataset.morfanaMarkup;
  delete obj.dataset.morfanaDataMetrics;

  obj.querySelectorAll(".morfana-graphics").forEach((el) => el.remove()); // remove SVG

  obj.querySelectorAll(".morfana-paddings").forEach((el) => {
    [...el.childNodes].forEach((child) => el.parentNode.insertBefore(child, el));
    el.parentNode.removeChild(el);
  }); // unwrap wrapped for paddings

  obj.querySelectorAll(".morfana-antistress").forEach((el) => {
    [...el.childNodes].forEach((child) => el.parentNode.insertBefore(child, el));
    el.parentNode.removeChild(el);
  }); // unwrap wrapped for letter-spacing before stress marks

  return true;

}
