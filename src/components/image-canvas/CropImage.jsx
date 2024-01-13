import React from "react";
import useImage from "use-image";
import { Image, Layer, Stage } from "react-konva";

// TODO: Need to check this not working
const CropImage = (props) => {
  const { imageUrl, crop } = props;
  const { x, y, width, height } = crop;

  const [image] = useImage(imageUrl);

  return (
    <>
    <Stage width={100} height={100}>
    <Layer>
      <Image
        image={image}
        strokeWidth={1}
        stroke={"red"}
        crop={{
          x,
          y,
          width,
          height,
        }}
      />
      </Layer>
      </Stage>
    </>
  );
};

export default CropImage;
