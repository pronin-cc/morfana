import cleanMarkup from './clean-markup.mjs'
import getLettersMap from './get-letters-map.mjs'
import process from './process.mjs';

/**
 * Analyze markup of word, preparing arrays
 * @param {HTMLElement} el
 */
export default function preprocess(el, config, development) {
  // console.log(this);

  // [+] let wordTxt = obj.text(); if (wordTxt.indexOf('́') > 0) {console.log(getAllIndexOf(wordTxt, ('́')));}

  let data = {}; // processing config for current queue element
  // data.obj = $(el); // jQuery object for word's element
  data.obj = el; // jQuery object for word's element
  data.config = { freezeWord: config['freezeWord'] }; // per word config
  data.morphemes = {}; // by morpheme types
  data.letters = []; // by letters indexes (for reverse association with morphemes)
  data.maps = { 'inital': getLettersMap(data.obj) }; // inital letters map
  // data.maps.actual = $.extend(true, [], data.maps.inital) // extending for wrapPaddings(), wrapBeforeSressMarks()
  // debugger;
  // data.maps.actual = structuredClone(data.maps.inital); // FIXME:
  data.maps.actual = data.maps.inital;

  // how many letters in this word? We need total quantity to replace "ok:0" and "ok:0-0" to "ok:{totalLettersQty}-0"
  let totalLettersQty = data['maps']['inital'].length;

  // per word configuration: freezeWord
  if (data.obj.dataset.morfanaConfig) {
    let wordConfig = cleanMarkup(data.obj.dataset.morfanaConfig).split(";");
    for (let i = 0, qty = wordConfig.length; i < qty; i++) {
      let _tmp = wordConfig[i].split(":");
      if (_tmp[0] == 'freezeWord') {
        if (_tmp[1] == 'false') { data.config.freezeWord = false; }
        else if (_tmp[1] == 'true') { data.config.freezeWord = true; }
      }
    }
  }

  for (let i = 0; i < totalLettersQty; i++) {
    data.letters[i] = {
      'start': {}, // morphemes which start on letter with this index
      'stop': {}, // morphemes which stop on letter with this index
      'after': {} // morphemes which goes after letter with this index (e.g., zero-ending)
    };
  }

  let morphemes = cleanMarkup(data.obj.dataset.morfanaMarkup).split(";");

  // go throw array with strings (e.g., "ok:5-6", "ko:2-3", "ok:0", "ok:4")
  for (let i = 0, qty = morphemes.length; i < qty; i++) {

    let _tmp = morphemes[i].split(":");
    let m = _tmp[0];
    let r = _tmp[1].split("-");

    // replace "ok:4" to "ok:4-0"
    if (!r[1]) { r[1] = '0'; }

    // replace "ok:0" and "ok:0-0" to "ok:{totalLettersQty}-0"
    if (r[0] == '0') { r[0] = totalLettersQty; r[1] = '0'; }

    r[0] *= 1;
    r[1] *= 1;

    // data.morphemes

    // if we don't have array for these type of morpheme
    if (!data.morphemes[m]) {
      data.morphemes[m] = [];
    }
    // if we don't have array for these type of morpheme and starting with these letter
    if (!data.morphemes[m][r[0] - 1]) {
      data.morphemes[m][r[0] - 1] = [];
    }

    data.morphemes[m][r[0] - 1].push({ 'name': m, 'range': [r[0] - 1, (r[1] > 0) ? (r[1] - 1) : null] });

    let startIndex, stopIndex;
    // data.letters
    if (r[1] == 0) { // 'zero-ending'
      startIndex = r[0] - 1;
      stopIndex = null;
      if (!data.letters[startIndex].after[m]) {
        data.letters[startIndex].after[m] = [];
      }
      data.letters[startIndex].after[m].push({ 'name': m, 'range': [startIndex, stopIndex] })
    } else {
      startIndex = r[0] - 1;
      stopIndex = r[1] - 1;
      if (!data.letters[startIndex].start[m]) {
        data.letters[startIndex].start[m] = [];
      }
      data.letters[startIndex].start[m].push({ 'name': m, 'range': [startIndex, stopIndex] })

      if (!data.letters[stopIndex].stop[m]) {
        data.letters[stopIndex].stop[m] = [];
      }
      data.letters[stopIndex].stop[m].push({ 'name': m, 'range': [startIndex, stopIndex] })
    }
  }

  if (development.log) {
    console.log(data.obj.textContent, data);
  }


  // lets draw paddings, if we have any morphemes 'ok'
  process(data, config, development);

  return data;
}
