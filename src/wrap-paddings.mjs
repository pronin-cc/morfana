import wrapPadding from './wrap-padding.mjs';

/**
 * Go through data.letters  to find 'ending' and 'zero-endings' morphemes. Wrap letters into spans with paddings.
 */
export default function wrapPaddings(data, config, development) {

  for (let i = 0, qty = data.maps.actual.length; i < qty; i++) {

    // left paddings first (!) important for unwrapping, 'cause we get metrics by cutting word from its the end
    if (data.letters[i].start['ok']) {
      // add padding after letter which is first in 'ending'
      wrapPadding(data, i, 'start', config, development);
    }

    if (data.letters[i].stop['ok']) {
      // add padding after letter which is last in 'ending'
      wrapPadding(data, i, 'stop', config, development);
    }

    if (data.letters[i].after['ok']) {
      // add padding after letter which stands before 'zero-ending'
      wrapPadding(data, i, 'after', config, development);
    }
  }

}
