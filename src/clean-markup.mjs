// clean "data-morfana-markup" value, splitting.
// [+] do syntax check, throw errors. Allowed format: /(([a-zA-Z]+)\s*:\s*((\d+)\s*-\s*(\d+)|0))|(ok\s*:\s*\d)/
// [+] remove duplicates ?
export default function cleanMarkup(markup) {
  if (markup) {
    return markup.replace(/\s/g, "").replace(/;$/, "");
  } else {
    return markup;
  }
}
