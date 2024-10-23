/**
 * Set element's and all its parents' CSS property
 */
export default function setAllParents(obj, stopId, param, value) {
  // if (obj.attr('id') != stopId) {
  //   obj.css(param, value);
  //   setAllParents(obj.parent(), stopId, param, value);
  // }
  console.log('param', param);

  if (obj.id != stopId) {
    obj.style['param'] = value;
    setAllParents(obj.parent(), stopId, param, value);
  }
}
