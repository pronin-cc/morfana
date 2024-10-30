import clear from "./clear.mjs";
import calculateMetrics from "./calculate-metrics.mjs";
import wrapPaddings from './wrap-paddings.mjs';
import wrapBeforeStressMarks from "./wrap-before-stress-marks.mjs";
import createImages from "./create-images.mjs";

/**
 * Main processing
 */

export default function process(data, config, development) {

  // remove previous elements if exist
  clear(data.obj, development);

  // get height of the whole word
  // use calculateMetrics() with justHeightReturnWordHeight set to true
  calculateMetrics(data, true, development);

  // set letter-spacing:0 for letters which followed by stress mark
  wrapBeforeStressMarks(data, config, development);
  
  // add spans with paddings for morphemes "ending" and "zero-ending"
  wrapPaddings(data, config, development);
  
  // calculate metrics of letters
  calculateMetrics(data, false, development);

  // save metrics to word, for getLettersBounds() API
  data.obj.dataset.morfanaDataMetrics = data.metrics;
  // console.log('data metrics:', data.metrics)
  if (development.colorize) {
    for (let i = 0, qty = data.metrics.length; i < qty; i++) {
      let color = 'red';
      let top = ((data.metrics[i].hDiff <= 0) ? ((data.metrics[i].h)) : (data.metrics[i].hDiff * 0.5 + data.metrics[i].h));
      let left = data.metrics[i].x;
      let width = data.metrics[i].w;
      let html = `<div  class="morfana-development-colorize"
                        style="position: absolute;
                               top: ${top}px;
                               left: ${left}px;
                               width: ${width}px;
                               height: 2px;
                               line-height: 0;
                               border: 0;
                               padding: 0;
                               margin: 0;
                               background: ${color};
                        ">
                  </div>`;
      data.obj.insertAdjacentHTML(html);
    }
  }

  // draw morphemes' signs
  let prependElements = createImages(data, config);

  // set styles for absolute positioning SVG elments inside word's element
  data.obj.style.display = 'inline-block';
  data.obj.style.position = 'relative';

  // compensate height of morhpemes if not deined in config
  if (!data.config['freezeWord']) {
    data.obj.style.marginTop = `${(data.height * 0.85)}px`;
    data.obj.style.marginBottom = `${(data.height * 0.35)}px`;
  }

  // add SVG to DOM
  prependElements.forEach((el) => {
    data.obj.insertAdjacentHTML('afterbegin', el);
  });

}
