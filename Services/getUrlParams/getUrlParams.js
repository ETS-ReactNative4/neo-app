const getUrlParams = url => {
  const result = {};
  const params = (url.split("?")[1] || "").split("&");
  for (let param in params) {
    if (params.hasOwnProperty(param)) {
      if (params[param]) {
        const paramParts = params[param].split("=");
        result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
      }
    }
  }
  return result;
};

export default getUrlParams;
