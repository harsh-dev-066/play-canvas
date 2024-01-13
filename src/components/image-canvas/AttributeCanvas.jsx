import React, { useEffect, useRef } from 'react';

const AttributeCanvas = (props) => {
  const {
    imageSrc,
    cropCoordinates,
    cardWidth,
    cardHeight,
    isDocumentCanvas,
    className='',
    ...atr
  } = props;

  const canvasRef = useRef();
  const ctxRef = useRef();
  const imgRef = useRef();

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const [x1, y1, x2, y2] = cropCoordinates;
      const imgWidth = imgRef.current.naturalWidth;
      const imgHeight = imgRef.current.naturalHeight;

      let x; let y; let height; let width; let newWidth; let newHeight; let centerX; let centerY;
      if (isDocumentCanvas) {
        x = x1;
        y = y1;
        width = x2 - x1;
        height = y2 - y1;
        canvas.width = cardWidth;
        canvas.height = cardHeight;
        const aspectRatio = width / height;
        newWidth = width > cardWidth ? cardWidth : width;
        newHeight = (width / aspectRatio) > cardHeight ? cardHeight : (width / aspectRatio);
        centerX = Math.round((cardWidth - newWidth) / 2);
        centerY = Math.round((cardHeight - newHeight) / 2);
      } else {
        x = ((x1 * imgWidth));
        y = ((y1 * imgHeight));
        width = (x2 - x1) * imgWidth;
        height = (y2 - y1) * imgHeight;
        canvas.width = cardWidth;
        canvas.height = cardHeight;
        const aspectRatio = width / height;
        newWidth = aspectRatio > 1 ? width : aspectRatio * width;
        newHeight = aspectRatio > 1 ? (height / aspectRatio) : height;
        centerX = Math.round((width - newWidth) / 2);
        centerY = Math.round((height - newHeight) / 2);
      }

      ctxRef.current = canvas.getContext('2d');
console.log('imgRef.current', imgRef.current)
      ctxRef.current.drawImage(
        imgRef.current,
        x,
        y,
        width,
        height,
        centerX,
        centerY,
        newWidth,
        newHeight,
      );

      return new Promise((resolve, reject) => {
        canvas?.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Error on rendring image'));
          }
          resolve(blob);
        }, 'image/jpeg/png', 1);
      });
    }
    return '';
  };

  useEffect(() => {
    if (cropCoordinates) {
      const image = new Image();
      image.crossOrigin="anonymous";
      image.src = imageSrc;
      imgRef.current = image;
      imgRef.current.onload = () => drawImageOnCanvas();
    }
  }, [cropCoordinates, imageSrc]);

  useEffect(() => { if (cropCoordinates) drawImageOnCanvas(); }, []);


  return (
    <canvas
      ref={canvasRef}
      className={`annotation-attribute-canvas border-radius-4 ${className}`}
      {...atr}
    />
  );
};


export default AttributeCanvas;