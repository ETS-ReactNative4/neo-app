/**
 * Creates a query parameter from a given JS object
 */
const objectToQueryParam = data => {
  let index = 0,
    queryParam = "";
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];
      if (value) {
        queryParam += `${index === 0 ? "?" : "&"}${key}=${value}`;
        index++;
      }
    }
  }
  return queryParam;
};

export default objectToQueryParam;
