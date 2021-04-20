import loadScript from 'load-script';

let promise;

const GetPluploadNamespace = (editorURL) => {
  if (typeof editorURL !== 'string' || editorURL.length < 1) {
    throw new TypeError('Plupload URL must be a non-empty string.');
  }

  if ('plupload' in window) {
    return Promise.resolve(window.plupload);
  }
  if (!promise) {
    promise = new Promise((scriptResolve, scriptReject) => {
      loadScript(editorURL, (err) => {
        if (err) {
          scriptReject(err);
        } else {
          scriptResolve(window.plupload);
          promise = undefined;
        }
      });
    });
  }

  return promise;
};

export default GetPluploadNamespace;
