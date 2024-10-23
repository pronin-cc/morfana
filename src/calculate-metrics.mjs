/**
 * Calculate metrics of word: get height of word, x and width of each letter.
 */
import getLettersMap from './get-letters-map.mjs';
import setAllChildren from './set-all-children.mjs';

export default function calculateMetrics(data, justHeightReturnWordHeight, development) {

  // creating temporary div inside word's element
  let objHTML = data.obj.innerHTML;
  let tmpDiv = document.createElement('div');

  tmpDiv.id = 'morfana_tmpDiv';
  tmpDiv.style.font = 'inherit !important';
  tmpDiv.style.letterSpacing = 'inherit !important';
  tmpDiv.style.width = 'auto';
  tmpDiv.style.height = 'auto';
  tmpDiv.style.position = 'absolute';
  tmpDiv.style.left = '-1000px';
  tmpDiv.style.visibility = 'hidden';
  
  if (development.showTmpDiv) {
    tmpDiv.style.left = '0px';
    tmpDiv.style.visibility = 'visible';
  }

  data.obj.appendChild(tmpDiv);
  tmpDiv.innerHTML = objHTML;

  // setting line-height to normal, calculating word's height
  let h_lineHeightAsItWas = tmpDiv.clientHeight;
  setAllChildren(tmpDiv, 'lineHeight', 'normal');
  data.width = tmpDiv.clientWidth; // width of whole word
  data.height = tmpDiv.clientHeight;
  data.heightDiff = h_lineHeightAsItWas - data.height;

  if (justHeightReturnWordHeight) {
    tmpDiv.remove();
    return;
  }

  data.metrics = [];

  let rng = new Range();
  let tmpDiv_map = getLettersMap(tmpDiv);

  for (let i = tmpDiv_map.length - 1; i >= 0; i--) {

    data.metrics[i] = {};
    tmpDiv.querySelectorAll('.morfana-paddings').forEach((obj) => {

      if (obj.innerText == '') {
        obj.remove()
      }
    });

    if (data.letters && (data.letters[i].stop['ok'] || data.letters[i].after['ok'])) {
      if (data.letters[i].stop['ok']) {
        // $(tmpDiv_map[i].element).unwrap();
        let element = tmpDiv_map[i].element;
        while (element.firstChild) {
          element.parentNode.insertBefore(element.firstChild, element);
        }
        element.parentNode.removeChild(element);
      }
      if (data.letters[i].after['ok']) {
        // $(tmpDiv_map[i].element).unwrap();
        let element = tmpDiv_map[i].element;
        while (element.firstChild) {
          element.parentNode.insertBefore(element.firstChild, element);
        }
        element.parentNode.removeChild(element);
      }
    }

    let newNode = document.createElement('span');
    newNode.style.letterSpacing = '0';

    rng.setStart(tmpDiv_map[i].element, tmpDiv_map[i].index);
    rng.setEnd(tmpDiv_map[i].element, tmpDiv_map[i].index + 1);

    // rng.surroundContents(newNode); ???? FIXME: temporary disabled 

    data.metrics[i].w = tmpDiv.clientWidth;
    rng.deleteContents();

    data.metrics[i].x = tmpDiv.clientWidth;
    data.metrics[i].w = data.metrics[i].w - data.metrics[i].x;
    data.metrics[i].h = data.height;
    data.metrics[i].hDiff = data.heightDiff;

    data.temp = 'hi'
  }

  tmpDiv.remove();

}
