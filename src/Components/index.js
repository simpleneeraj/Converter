import React, { useState, useEffect } from "react";
import css from "./index.module.scss";
const App = () => {
  const { toConvertImage, isPreview, onSelectFile } = useConverter();
  return (
    <div className={css.Converter}>
      <div className={css.Box}>
        <h1> Image Converter</h1>
        <label htmlFor="Hello">
          <input
            accept="image/jpeg; image/png"
            id="Hello"
            onChange={onSelectFile}
            type="file"
          />
          <div className={css.button}>
            {isPreview ? "Select Another" : "Select File"}
          </div>
        </label>
        {isPreview ? (
          <>
            <img src={isPreview} alt="hhh" />
            <button
              className={css.button}
              onClick={() => toConvertImage(isPreview)}
            >
              Convert
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;

const useConverter = () => {
  const [isImage, setisImage] = useState(null);
  const [isPreview, setisPreview] = useState(false);
  //======================================//
  // When Select a File
  //======================================//
  const onSelectFile = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setisImage(undefined);
      return;
    }
    setisImage(e.target.files[0]);
  };

  //======================================//
  // Effect
  //======================================//
  useEffect(() => {
    if (!isImage) {
      return null;
    }
    const objectUrl = URL.createObjectURL(isImage);
    setisPreview(objectUrl);
    // console.log(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [isImage]);

  //======================================//
  // Convert Image To Webp Format
  //======================================//

  const RandomString = () => {
    const arr = new Uint32Array(1);
    const strings = window.crypto.getRandomValues(arr);
    return strings;
  };

  const toConvertImage = (objectUrl) => {
    const getImage = new Image();
    getImage.src = objectUrl;
    getImage.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = getImage.width;
      canvas.height = getImage.height;
      ctx.drawImage(getImage, 0, 0);
      canvas.toBlob((blob) => {
        const newImageUrl = URL.createObjectURL(blob);
        const element = document.createElement("a");
        element.href = newImageUrl;
        element.download = `compressed-${RandomString()}.webp`;
        element.click();
        document.body.appendChild(element);
        element.remove();
      }, "image/webp");
    });
  };

  return { toConvertImage, isPreview, onSelectFile };
};
