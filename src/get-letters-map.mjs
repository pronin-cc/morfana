/**
 * [API] Get letters map. For each letter number in word we will have reference to element (if word has HTML tags inside) and index of letter in it or index in top word's element
 * Important: word shouldn't have CRLFs, tabs or spaces
 * [+] Пояснить про ударение и дефисы для разрыва по морфемам, что их тоже нужно учитывать.
 * @param {object} obj - jQuery object
 */
export default function getLettersMap(obj) {
  let map = [];

  (function createLettersMap(obj, shift) {

    let qty = obj.childNodes.length;
    for (let i = 0; i < qty; i++) {
      let data = obj.childNodes[i].data;
      // is it text or HTML element?
      if (data == undefined) {
        // go inside
        // shift = createLettersMap($(obj[0].childNodes[i]), shift);
        shift = createLettersMap(obj.childNodes[i], shift);
      } else {
        for (let j = 0; j < data.length; j++) {
          // map all letters of this fragment of word
          map[shift] = { 'element': obj.childNodes[i], 'index': j, 'symbol': data[j] };
          shift++;
        }
      }
    }
    return shift;
  })(obj, 0);

  return map;
}
