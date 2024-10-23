import createImage from './create-image.mjs';

/**
 * Go through data.morphemes, call createImage() for each morpheme
*/
export default function createImages(data, config) {
  // create SVG one by one

  let images = [];

  for (let m in data.morphemes) {

    for (let i = 0, qty = data.morphemes[m].length; i < qty; i++) {

      if (!data.morphemes[m][i]) {
        continue;
      }

      for (let j = 0, qty2 = data.morphemes[m][i].length; j < qty2; j++) {
        let image = createImage(data, m, data.morphemes[m][i][j].range, config);
        images.push(image);
      }

    }
  }

  return images;
}
