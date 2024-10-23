import getLettersMap from './get-letters-map.mjs';

/**
 * Wrap letter into spans with paddings. Called by wrapPaddings().
 */
export default function wrapPadding(data, letterIndex, paddingType, config, development) {
  let rng = new Range();

  rng.setStart(data.maps.actual[letterIndex].element, data.maps.actual[letterIndex].index);
  rng.setEnd(data.maps.actual[letterIndex].element, data.maps.actual[letterIndex].index + 1);

  let newNode = document.createElement('span');

  let val = Math.ceil((paddingType == 'after')
    ? (data.height * config['zeroEndingWidthFactor'] + data.height * config['paddingFactor'] + config['strokeWidth'] * 2)
    : ((data.height * config['paddingFactor']) + config['strokeWidth'])); // padding params in px

  let side = (paddingType != 'start') ? 'right' : 'left';

  newNode.style.setProperty(`padding-${side}`, val + 'px');
  newNode.classList.add('morfana-paddings');
  newNode.classList.add(`morfana-paddings-${side}`);

  rng.surroundContents(newNode);

  // rebuild map
  data.maps.actual = getLettersMap(data.obj);
}
