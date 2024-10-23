/**
 * [API] Configure Morfana.
 */
export default function configure(obj) {
  // $.extend(true, config, obj);
  config = structuredClone(obj)
  // config['strokeWidth'] = parseFloat(config['strokeWidth']);
}
