function getVideoHeight(width) {
  return (9 * width) / 16;
}

function processPixels(video, graphics, width) {
  graphics.image(video, 0, 0, width, getVideoHeight(width));
  graphics.loadPixels();
  for (let i = 0; i < graphics.pixels.length; i += 4) {
    let r = graphics.pixels[i];
    let g = graphics.pixels[i + 1];
    let b = graphics.pixels[i + 2];
    if (r < 100 && g > 150 && b < 100) {
      graphics.pixels[i + 3] = 0;
    }
  }
  graphics.updatePixels();
}

function image_center(img, x, y) {
  image(img, x - img.width / 2, y - img.height / 2);
}
