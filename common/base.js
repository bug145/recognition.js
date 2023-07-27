class Recognizer {
  initFaceApi() {
    return new Promise(function (resolve, reject) {
      if (window.faceapi) {
        resolve(window.faceapi);
        return;
      }

      import("face-api.js/dist/face-api.js")
        .then((faceapi) => {
          window.faceapi = faceapi;
          initModels();
          resolve(faceapi);
          return;
        })
        .catch((error) => {
          window.faceapi = undefined;
          console.error(error);
          reject(error);
          return;
        });
    });
  }
  constructor(options) {
    this.initFaceApi();
  }
}
