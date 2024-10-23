/**
 * Create SVG for morpheme. Called by createImages().
 */

//morphemeType, obj, start, stop, map)  
export default function createImage(data, morphemeType, range, config) {
  // create other signs of morphemes
  let x = data.metrics[range[0]].x;
  let w = (range[1] != null) ? data.metrics[range[1]].x + data.metrics[range[1]].w - data.metrics[range[0]].x : null;
  let hDiff = data.heightDiff;
  let h = data.height;

  let hm = 0.3;
  let part1, part2;

  switch (morphemeType) {
    case 'ok':
      let isLastLetter = !data.letters[range[0] + 1];
      let p = config['strokeWidth']; //config['paddingFactor']*h;

      if (range[1] != null) { // morpheme 'ending'
        let ofs = h * config['paddingFactor'] / 2 + config['strokeWidth'] * 2;
        x -= ofs;
        w += ofs * 2;

      } else { // morpheme 'zero-ending'

        if (isLastLetter) {
          // is last word letter
          //x = x + data.metrics[range[0]].w + h*config['paddingFactor'];
          x = x + data.metrics[range[0]].w + (data.width - (x + data.metrics[range[0]].w)) / 2 - h * config['paddingFactor'] * 2;

        } else {
          // not last word letter
          x = x + data.metrics[range[0]].w + (data.metrics[range[0] + 1].x - (x + data.metrics[range[0]].w)) / 2 - h * config['paddingFactor'] * 2;
        }

        w = h * config['zeroEndingWidthFactor'] + config['strokeWidth'] * 2;
        // we have 'ending' stop on this letter and 'zero-ending' after this letter.
        // nonsense, but try to show it correctly.
        if (data.letters[range[0]].stop && data.letters[range[0]].stop['ok']) {
          x += h * config['paddingFactor'] / 2;
          if (isLastLetter) {
            x += h * config['paddingFactor'] - config['strokeWidth'] * 2.5;
          }
        }

        // but if after 'zero-ending' goes 'edning' again (nonsense too!) clear this:
        if (data.letters[range[0] + 1] && data.letters[range[0] + 1].start && data.letters[range[0] + 1].start['ok']) {
          x -= h * config['paddingFactor'] / 2;
        }

      }

      h *= 1.35;
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? (-(h * 0.13)) : (hDiff * .5 - h * 0.13)) + 'px; width: ' + w + 'px; height: ' + h + 'px;"';
      //part2 = '<path d="M '+(1.5)+' '+(h-2)+' L '+(w-3)+' '+(h-2)+' L '+(w-3)+' '+(2)+' L '+(3)+' '+(2)+' L '+(3)+' '+(h-1.5)+'"';
      part2 = '<rect x="' + config['strokeWidth'] + '" y="' + config['strokeWidth'] + '" width="' + (w * 1 - config['strokeWidth'] * 2) + '" height="' + (h * 1 - config['strokeWidth'] * 2) + '" ';

      break;
    case 'ko':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? (-(h * 0.85)) : (hDiff * 0.5 - h * .85)) + 'px; width: ' + w + 'px; height: ' + h + 'px;"';
      part2 = '<path d="M ' + 2 + ' ' + (h - 2) + ' C ' + (w / 3) + ' ' + h * .4 + ', ' + (w * 2 / 3) + ' ' + h * .4 + ', ' + (w - 2) + ' ' + (h - 2) + '"';
      break;
    case 'su':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? (-(h * 0.85)) : (hDiff * 0.5 - h * .85)) + 'px; width: ' + w + 'px; height: ' + h + 'px;"';
      part2 = '<path d="M ' + (2) + ' ' + (h - 2) + ' L ' + (w / 2) + ' ' + (h * 0.5) + ' L ' + (w / 2) + ' ' + (h * 0.5) + ' L ' + (w - 2) + ' ' + (h - 2) + '"';
      break;
    case 'pr':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? (-(h * 0.85)) : (hDiff * 0.5 - h * .85)) + 'px; width: ' + w + 'px; height: ' + h + 'px;"';
      part2 = '<path d="M ' + (2) + ' ' + (h * 0.5) + ' L ' + (w - 2) + ' ' + (h * 0.5) + ' L ' + (w - 2) + ' ' + (h - 2) + '"';
      break;
    case 'po':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? (-(h * 0.85)) : (hDiff * 0.5 - h * .85)) + 'px; width: ' + w + 'px; height: ' + h + 'px;"';
      part2 = '<path d="M ' + (2) + ' ' + (h - 2) + ' L ' + (2) + ' ' + (h * 0.5) + ' L ' + (w - 2) + ' ' + (h * 0.5) + '"';
      break;
    case 'os':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? ((h)) : (hDiff * 0.5 + h)) + 'px; width: ' + (w) + 'px; height: ' + (h) + 'px;"';
      //part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0)?((h*0.8)):(hDiff*0.5+h)) + 'px; width: ' + (w) + 'px; height: ' + (h) + 'px;"'; // too close to letters?
      part2 = '<path d="M ' + (1.5) + ' ' + (3) + ' L ' + (1.5) + ' ' + (h * hm) + ' L ' + (w - 1.5) + ' ' + (h * hm) + ' L ' + (w - 1.5) + ' ' + (3) + '"';
      break;
    case 'osL':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? ((h)) : (hDiff * 0.5 + h)) + 'px; width: ' + (w) + 'px; height: ' + (h) + 'px;"';
      part2 = '<path d="M ' + (1.5) + ' ' + (3) + ' L ' + (1.5) + ' ' + (h * hm) + ' L ' + (w - 1.5) + ' ' + (h * hm) + '"';
      break;
    case 'osR':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? ((h)) : (hDiff * 0.5 + h)) + 'px; width: ' + (w) + 'px; height: ' + (h) + 'px;"';
      part2 = '<path d="M ' + (1.5) + ' ' + (h * hm) + ' L ' + (w - 1.5) + ' ' + (h * hm) + ' L ' + (w - 1.5) + ' ' + (3) + '"';
      break;
    case 'osC':
      part1 = 'left: ' + x + 'px; top: ' + ((hDiff <= 0) ? ((h)) : (hDiff * 0.5 + h)) + 'px; width: ' + (w) + 'px; height: ' + (h) + 'px;"';
      part2 = '<path d="M ' + (1.5) + ' ' + (h * hm) + ' L ' + (w - 1.5) + ' ' + (h * hm) + '"';
      break;
  }

  let svg = '<svg class="morfana-graphics" data-morfana-command="' + morphemeType + ':' + (range[0] + 1) + '-' + ((range[1] == null) ? 0 : (range[1] + 1)) + '" style="' +
    (config['disablePointerEvents'] ? 'pointer-events: none; ' : '') + 'position: absolute; ' +
    part1 +
    ' xmlns="http://www.w3.org/2000/svg" version="1.1">' +
    part2 +
    ' style="stroke:' + config['stroke'] + '; stroke-width:' + config['strokeWidth'] + '" fill="transparent" fill-opacity="0"/></svg>'

  return svg;
}
