import preprocess from './preprocess.mjs';

/**
 * Process queue of elements. This function called with setTimeout() to prevent GUI freezing.
 */
function doQueue(queue, onQueueEmptyCallback, config, development) {
  // console.log('queue:', queue);
  let qty = queue.length;

  if (qty > 0) {// are there any elements in queue?
    let el = queue.shift();
    preprocess(el, config, development);
  }

  if (qty > 1) { // more than 1 berfore queue.pop()?
    setTimeout(doQueue, 10, queue, onQueueEmptyCallback, config, development);
  } else { // queue empty

    if (onQueueEmptyCallback && typeof onQueueEmptyCallback == 'function') {
      onQueueEmptyCallback();
      onQueueEmptyCallback = undefined;
    }

  }

}

export default doQueue;