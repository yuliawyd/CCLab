function getVideoHeight(width) {
  return (2160 * width) / 3832;
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

function startFrame(i) {
  frame = i;
  frameStart = Date.now();
  c = createGraphics(windowWidth * 0.7, getVideoHeight(windowWidth * 0.7));
}
