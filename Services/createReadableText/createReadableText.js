const createReadableText = text => {
  text = text.replace(/_/g, " ");
  text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  return text;
};

export default createReadableText;
