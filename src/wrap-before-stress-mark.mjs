import getLettersMap from "./get-letters-map.mjs";

/**
 * Wrap letter into spans with letter-spacing: 0. Called by wrapBeforeStressMarks().
 */
export default function wrapBeforeStressMark(data, letterIndex) {
  let rng = new Range();

  rng.setStart(data.maps.actual[letterIndex].element, data.maps.actual[letterIndex].index);
  rng.setEnd(data.maps.actual[letterIndex].element, data.maps.actual[letterIndex].index + 1);

  let newNode = document.createElement('span');

  newNode.style.letterSpacing = '0';
  newNode.classList.add('morfana-antistress');

  rng.surroundContents(newNode);

  // rebuild map
  data.maps.actual = getLettersMap(data.obj);
}
