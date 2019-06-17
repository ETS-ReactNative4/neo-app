const uuidv4 = require("uuid/v4");

const imageUploader = (imageUri, target) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", target);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject();
        }
      }
    };
    xhr.setRequestHeader("Content-Type", "image/jpeg");
    xhr.send({ uri: imageUri, type: "image/jpeg", name: `${uuidv4()}.jpg` });
  });
};

export default imageUploader;
