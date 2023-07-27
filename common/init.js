let faceapi;
let modelLoaded = false;
let modelLoadError = false;
let modelLoading = false;

import { MODEL_URL } from "../config/variables.js";

const initModels = () => {
  modelLoading = true;

  return new Promise((resolve, reject) => {
    if (!faceapi) {
      reject();
    }

    Promise.all([
      faceapi.nets.tinyFaceDetector.load(MODEL_URL),
      faceapi.nets.faceExpressionNet.load(MODEL_URL),
      faceapi.nets.faceLandmark68TinyNet.load(MODEL_URL),
      faceapi.nets.faceRecognitionNet.load(MODEL_URL),
    ])
      .then(() => {
        modelLoaded = true;
        resolve();
      })
      .catch((error) => {
        modelLoadErr = true;
        console.error(error);
        reject();
      })
      .finally(() => {
        modelLoading = false;
      });
  });
};

export const init = () => {
  return new Promise((resolve, reject) => {
    import("face-api.js/dist/face-api.js")
      .then((faceapi) => {
        faceapi = faceapi;
        initModels();
        resolve();
      })
      .catch((error) => {
        faceapi = undefined;
        console.error(error);
        reject();
      });
  });
};
