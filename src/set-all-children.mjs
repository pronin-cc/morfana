/**
 * Set element's and all its children's CSS property
 */
// export function setAllChildren(obj, param, value) {
//   obj.css(param, value);
//   if (obj[0] && obj[0].children) {
//     let qty = obj[0].children.length;
//     for (let i=0; i < qty; i++) {
//       setAllChildren($(obj[0].children[i]), param, value);
//     }
//   }
// }

export default function setAllChildren(obj, param, value) {
  // obj.css(param, value);
  // obj.style.setAttribute(param, value);

  obj.style[param] = value;
  // if (obj && obj.childNodes) {
  if (obj && obj.childElementCount > 0) {
    // obj.childNodes.forEach( (child) => setAllChildren(child, param, value) );
    [...obj.children].forEach((child) => setAllChildren(child, param, value));
  }
}
