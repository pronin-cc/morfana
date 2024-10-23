import enqueue from './enqueue.mjs';
import doQueue from './do-queue.mjs';

/**
 * [API] Select elements and process them
 * If param "selector" is empty, Morfana selects all elements in DOM with attribute "data-morfana-markup".
 * If param "selector" is not empty but selected elements hasn't attribute "data-morfana-markup", Morfana selects all children with attribute "data-morfana-markup".
 * If param "markup" is not empty, Morfana adds/replaces attribute "data-morfana-markup" with new value for each selected element
 * So, if param "markup" is not empty, all selected elements will have attribute "data-morfana-markup". Be careful!
 * @param {string} selector - selector for jQuery
 * @param {string} markup - value for adding/replacing element's attribute "data-morfana-markup".
 * @param {function} callback - callback function
 */
export default function draw(selector, markup, callback) {
  this.onQueueEmptyCallback = (callback) ? callback : undefined;

  if (selector) {

    if (markup) {
      document.querySelectorAll(selector).forEach((el) => {
        el.dataset.morfanaMarkup = markup;
      })
    }

    document.querySelectorAll(selector).forEach((el) => {
      if (el.dataset.morfanaMarkup) {
        enqueue.call(this);
      } else {
        el.forEach((el) => enqueue(this.queue, el));
      }
    });

  } else {
    document.querySelectorAll('[data-morfana-markup]').forEach((el) => enqueue(this.queue, el));
  }

  let config = this.config;
  let development = this.development;
  doQueue(this.queue, this.onQueueEmptyCallback, config, development);

  return true;
}
