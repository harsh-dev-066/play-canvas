// // ImageCropper.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import ReactCrop, { Crop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// interface ImageCropperProps {
//   imageFile: File | null;
// }

// const ImageCropper: React.FC<ImageCropperProps> = ({ imageFile }) => {
//   const [crop, setCrop] = useState<any>({ aspect: 1 / 1 });
//   const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
//   const [croppedImage, setCroppedImage] = useState<string | null>(null);
//   const [showCroppedImage, setShowCroppedImage] = useState(false);

//   useEffect(() => {
//     if (imageFile) {
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         setImageSrc(event.target?.result);
//       };

//       reader.readAsDataURL(imageFile);
//     }
//   }, [imageFile]);

//   const onCropChange = useCallback((newCrop: Crop) => {
//     setCrop(newCrop);
//   }, []);

//   function getCroppedImg(image, pixelCrop, fileName) {
//     const canvas = document.createElement('canvas');
//     canvas.width = pixelCrop.width;
//     canvas.height = pixelCrop.height;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(
//       image,
//       pixelCrop.x,
//       pixelCrop.y,
//       pixelCrop.width,
//       pixelCrop.height,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );

//     // As Base64 string
//     // const base64Image = canvas.toDataURL('image/jpeg');

//     // As a blob
//     return new Promise((resolve, reject) => {
//       canvas.toBlob((file: any) => {
//         file.name = fileName;
//         resolve(file);
//       }, 'image/jpeg');
//     });
//   }

//   const onCropComplete = useCallback(
//     (cropArea, croppedImageBlob) => {
//       console.log('croppedImageBlob', croppedImageBlob);

//       // If croppedImageBlob is a string, it's a data URL; otherwise, it's a canvas element
//       getCroppedImg(imageFile, croppedImageBlob, 'preview.jpg').then((res) => {
//         const blobUrl = URL.createObjectURL(res as any);
//         console.log(blobUrl);
//         setShowCroppedImage(true); // it returns cropped image in this shape of url: "blob:http://something..."
//       });

//       // setCroppedImage(croppedDataUrl);
//       // Set to true after receiving the cropped image
//     },
//     [imageFile]
//   );

//   return (
//     <div>
//       {imageSrc && (
//         <>
//           {/* <ReactCrop crop={crop} onChange={onCropChange} onComplete={onCropComplete as any}>
//             <img src={imageSrc as string} alt="Original" />
//           </ReactCrop> */}
//           {showCroppedImage && croppedImage && (
//             <>
//               <p>Cropped Image:</p>
//               <img src={croppedImage} alt="Cropped" />
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;

const ImageCropper = () => {
  return <div>ImageCropper</div>;
};

export default ImageCropper;
