const removeNonUnicodeCharacters = text => {
  if (typeof text === "string") {
    return text.replace(/[\u{0080}-\u{FFFF}]/gu, "");
  }
  return text;
};

export default removeNonUnicodeCharacters;
