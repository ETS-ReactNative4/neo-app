/**
 * Will extract all the plain text from a given html component
 * used in rich text editor for reverting to normal text when
 * opened from incompatible devices
 */
const extractTextFromHtml = htmlString => {
  if (htmlString) {
    return htmlString
      .replace(/<[^>]+>/g, " ")
      .replace(/\s\s+/g, " ")
      .trim();
  } else {
    return "";
  }
};

export default extractTextFromHtml;
