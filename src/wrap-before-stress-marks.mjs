import wrapBeforeStressMark from './wrap-before-stress-mark.mjs';

/**
 * Go through data.letters  to find stress marks. Wrap letters before into spans with letter-spacing: 0.
 */
export default function wrapBeforeStressMarks(data) {
  for (let i = 0, qty = data.maps.inital.length; i < qty; i++) {

    if (data.maps.inital[i].symbol.charCodeAt(0) == 769 && i > 0) {
      wrapBeforeStressMark(data, i - 1);
    }
  }
}
