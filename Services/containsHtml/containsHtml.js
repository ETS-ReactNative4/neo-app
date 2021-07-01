/**
 * Checks if given text contains html
 * @param text
 * @returns {boolean}
 */
const containsHtml = text => /<[a-z][\s\S]*>/i.test(text);

export default containsHtml;
