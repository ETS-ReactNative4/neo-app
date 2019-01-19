const changeColorAlpha = (color, alpha) =>
  color.replace(/[\d\.]+\)$/g, `${alpha})`);

export default changeColorAlpha;
