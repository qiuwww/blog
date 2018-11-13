/** @module color/mixer */

/** The name of the module. */
export const name = 'mixer';

/** The most recent blended color. */
export var lastColor = null;

/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexidecimal format.
 * @param {string} color2 - The second color, in hexidecimal format.
 * @return {string} The blended color.
 */
export function blend(color1, color2) { }

// convert color to array of RGB values (0-255)
function rgbify(color) { }

export {
  /**
   * Get the red, green, and blue values of a color.
   * @function
   * @param {string} color - A color, in hexidecimal format.
   * @returns {Array.<number>} An array of the red, green, and blue values,
   * each ranging from 0 to 255.
   */
  rgbify as toRgb
}
