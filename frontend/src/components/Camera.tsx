'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { AiFillCamera } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCameraRotate } from 'react-icons/fa6';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import RoundedBtn from './RoundButton';
import { useDispatch, useSelector } from 'react-redux';
// import { saveFile, sendMessage, setWidgetError } from "../../redux/actions";
import { isDeviceCheck, convertDataUrlToFile } from '../utils/cameraUtils';
import { RootState } from '../app/store';
import { updateCameraConstraints } from '../redux/camera/cameraSlice';
import { useNavigate } from 'react-router-dom';

const CameraComponent = ({ setIsWebcamOpen, setImageFile, setIsEditor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selfieMode, setSelfieMode] = useState(true);
  const webcamRef = useRef(null);
  const wrapperRef = useRef(null);
  // const [videoConstraints, setVideoConstraints] = useState({});
  const [screenshot, setScreenshot] = useState(null);

  const { cameraConstraints } = useSelector((state: RootState) => state.cameraConstraints);
  // const { darkMode } = useSelector((state) => state.ThemeReducer);

  const closeWebcam = () => {
    setIsWebcamOpen(false);
  };

  const hanldleMediaError = (error) => {
    console.error('Error accessing user media:', error);
    closeWebcam();
  };

  const capture = () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      closeWebcam();
      // setWidgetError("Error accessing the camera. Please try again.", () => {

      // });
    }
  };

  const handleSubmit = async () => {
    if (screenshot) {
      // You can set the selected file in state or perform further actions here
      const file = await convertDataUrlToFile(screenshot, `${new Date().getTime().toString()}.png`);
      setImageFile(file);
      closeWebcam();
      setIsEditor(true);
    }
  };

  const retakePhoto = () => {
    setScreenshot(null);
  };

  // // sideeffects
  useEffect(() => {
    // facemode
    if (selfieMode) {
      dispatch(updateCameraConstraints({ facingMode: 'user' }));
    } else {
      dispatch(
        updateCameraConstraints({
          facingMode: { exact: 'environment' },
        })
      );
    }
  }, [selfieMode, dispatch]);

  const setAspectRatio = useCallback(
    (ratio) => dispatch(updateCameraConstraints({ aspectRatio: ratio })),
    [dispatch]
  );

  useLayoutEffect(() => {
    const updateAspectRatio = () => {
      if (isDeviceCheck('mobile')) {
        setAspectRatio(16 / 9);
      } else {
        setAspectRatio(16 / 10);
      }
    };

    updateAspectRatio(); // Initial setup

    window.addEventListener('resize', updateAspectRatio);

    return () => {
      window.removeEventListener('resize', updateAspectRatio);
    };
  }, [dispatch, setAspectRatio]);

  // Use useEffect for handling changes in screen dimensions
  useEffect(() => {
    const handleScreenDimensionsChange = () => {
      // Your logic for handling changes in screen dimensions
    };

    handleScreenDimensionsChange(); // Initial setup

    window.addEventListener('resize', handleScreenDimensionsChange);

    return () => {
      window.removeEventListener('resize', handleScreenDimensionsChange);
    };
  }, []);

  return (
    <div
      className={` h-full w-full bg-gray-800 overflow-hidden transition-all ease-in-out duration-300 `}
      ref={wrapperRef}
    >
      <div className="relative h-full">
        <div className={`webcam inset-0 flex items-center justify-center`}>
          {!screenshot && typeof window !== 'undefined' ? (
            <Webcam
              audio={false}
              height={wrapperRef?.current?.clientHeight}
              width={wrapperRef?.current?.clientWidth}
              ref={webcamRef}
              mirrored={selfieMode}
              screenshotFormat="image/jpeg"
              autoFocus={true}
              videoConstraints={cameraConstraints}
              screenshotQuality={1}
              onUserMediaError={hanldleMediaError}
            />
          ) : (
            <img
              src={screenshot}
              alt="Captured Screenshot"
              className="capture-img object-contain flex-1"
            />
          )}
        </div>
        {/* controls */}
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-between lg:justify-center lg:gap-10 px-6 py-3 bg-opacity-80 w-full`}
        >
          <RoundedBtn
            onClick={() => {
              closeWebcam();
              navigate('/');
            }}
            icon={<AiOutlineClose className=" bg-gray-baseMuted w-10 h-10 py-2 rounded-full" />}
          />
          {!screenshot ? (
            <>
              <RoundedBtn
                onClick={capture}
                icon={<AiFillCamera className="bg-green-baseBtn w-14 h-14 py-2 rounded-full" />}
              />
              <RoundedBtn
                onClick={() => setSelfieMode((prev) => !prev)}
                icon={<FaCameraRotate className="bg-gray-baseMuted w-10 h-10 py-2 rounded-full" />}
              />
            </>
          ) : (
            <>
              <RoundedBtn
                onClick={handleSubmit}
                icon={<MdSend className="bg-green-baseBtn w-14 h-14 py-2 rounded-full" />}
              />
              <RoundedBtn
                onClick={retakePhoto}
                icon={
                  <BsArrow90DegLeft className="bg-gray-baseMuted w-10 h-10 py-2 rounded-full" />
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
