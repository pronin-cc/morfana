import cleanMarkup from './clean-markup.mjs';

/**
 * [API] converts markup
 */
export default function convertMarkup(text, markup, from, to) {

  if (from == 'STRESS_MARKS_IGNORED' && to == 'STRESS_MARKS_NOT_IGNORED') { // convert markup from markup which was made for word without stress marks to markup for word with stress marks added
    let markupConverted = '';
    let stressMark = String.fromCharCode(769);
    let indexes = [], i = -1;

    while ((i = text.indexOf(stressMark, i + 1)) != -1) {
      indexes.push(i);
    }

    let cmds = cleanMarkup(markup).split(';');

    for (let j = 0, qty = cmds.length; j < qty; j++) {
      let cmd = cmds[j].split(':');
      let range = cmd[1].split('-');

      for (let k = 0, qty2 = indexes.length; k < qty2; k++) {
        if (range[0] && range[0] > indexes[k]) { range[0]++; }
        if (range[1] && range[1] > indexes[k]) { range[1]++; }
      }
      markupConverted += (cmd[0] + ':' + range[0] + ((typeof range[1] != 'undefined') ? ('-' + range[1]) : '') + ';')
    }

    // console.log(markup, markupConverted);

    return cleanMarkup(markupConverted);
  }

}
