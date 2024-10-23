import calculateMetrics from './calculate-metrics.mjs';
import wrapBeforeStressMarks from './wrap-before-stress-marks.mjs';

/**
 * [API] Export metrics of word (e.g. for GUI used in morfanki.morfana.ru)
 */
export default function getLettersBounds(obj, config, development) {
  if (obj && obj.dataset) {

    if (obj.dataset.morfanaDataMetrics) {
      return obj.dataset.morfanaDataMetrics;
    } else {
      // word is clean, so there's no data-morfana-data-merics
      // lets calculate metrics
      let data = { maps: {} };
      data.obj = obj;
      data.maps = { 'inital': getLettersMap(data.obj) }; // inital letters map
      // data.maps.actual = $.extend(true, [], data.maps.inital) // extending for wrapBeforeSressMarks()
      data.maps.actual = structuredClone(data.maps.initial);
      wrapBeforeStressMarks(data, config, development);
      calculateMetrics(data, false, development);
      return data.metrics;
    }

    return obj.dataset.morfanaDataMetrics;

  } else {
    return [];
  }

}
