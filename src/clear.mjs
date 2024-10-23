/**
 * [API] Remove all elements inserted by Morfana
 */

export default function clear(selector, config, development) {
  // let obj = (!selector) ? document : document.querySelectorAll(selector);
  let obj = (!selector) ? document : selector;

  if (development.colorize) {
    obj.querySelectorAll(".morfana-development-colorize").forEach((el) => el.remove()); // remove color label under letters
  }
  // obj.removeData('morfana-markup');
  obj.removeAttribute('data-morfana-markup');
  // obj.removeData('morfana-data-metrics');
  obj.removeAttribute('morfana-data-metrics');
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
