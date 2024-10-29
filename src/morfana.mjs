/*
 Morfana. JavaScript display engine for morphemic analysis in russian language
 http://morfana.ru
 http://github.com/kityan/morfana

 Copyright 2013-2014, Pavel Kityan (pavel@kityan.ru)
 Licensed under the MIT license.
 Version: 2.3.0b
 Build date: 29 September 2014
*/

import getLettersMap from './get-letters-map.mjs';
import clear from './clear.mjs';
import draw from './draw.mjs';
import configure from './configure.mjs';
import getLettersBounds from './get-letters-bounds.mjs';
import convertMarkup from './convert-markup.mjs';

const development = {
  colorize: false,
  log: false,
  showTmpDiv: false,
};

const config = {
  autoStart: true, // start Morfana after DOM is ready
  freezeWord: false, // add vertical padding to word's span or "freeze" word in its inital place
  strokeWidth: 1.5, // px
  stroke: 'rgb(150,150,150)',
  disablePointerEvents: true, // add 'pointer-events: none' to each svg
  zeroEndingWidthFactor: 0.7, // now: width of "zero-ending" = data.height * zeroEndingWidthFactor
  paddingFactor: 0.2, // now: width of padding for "ending" = data.height * paddingFactor
  stressMarksIgnored: false, // each stress mark should be counted as a symbol when defining a range for a command
  hyphensIgnored: true // each hyphen should be counted as a symbol when defining a range for a command
};

// set default values
// configure();

// Exporting API
class Morfana {
};

Morfana.development = development;
Morfana.config = config;
Morfana.queue = [];
Morfana.draw = draw;
Morfana.clear = clear;
Morfana.configure = configure;
Morfana.getLettersMap = getLettersMap;
Morfana.getLettersBounds = getLettersBounds;
Morfana.convertMarkup = convertMarkup;
Morfana.onQueueEmptyCallback = undefined;

export default Morfana;
