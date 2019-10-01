/**
 * Ratio Calculator
 *  - mostly used for calculating ratios of images that needs
 * to be used and restricted within the device frame
 *  - xValue should be calculated using responsive dimensions.
 */
const ratioCalculator = (x, y, xValue) => {
  return (y * xValue) / x;
};

export default ratioCalculator;
