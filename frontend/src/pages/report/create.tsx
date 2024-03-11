import { lazy, useState } from 'react';
import CameraComponent from '../../components/Camera';
import { createReport } from '../../redux/report/reportSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';

const ImageEditor = lazy(() => import('../../components/ImageEditor'));

const CreateReport = () => {
  const [isWebCamOpen, setIsWebcamOpen] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [isEditor, setIsEditor] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createNewReport = async (file: File) => {
    setIsEditor(false);
    const payload = new FormData();
    payload.append('image', file, imageFile.name);
    try {
      const currentReport = await dispatch(
        createReport({
          payload,
        })
      ).unwrap();

      navigate(`/report/details/${currentReport?.result?.insertId}`);
    } catch (error) {
      console.log(`Failed ${error}`);
    }
  };

  return (
    <div className="m-6">
      {isWebCamOpen && (
        <CameraComponent
          setIsWebcamOpen={setIsWebcamOpen}
          setImageFile={setImageFile}
          setIsEditor={setIsEditor}
        />
      )}
      {isEditor && imageFile && !isWebCamOpen && (
        <ImageEditor imageFile={imageFile} createReport={createNewReport} />
      )}
    </div>
  );
};

export default CreateReport;
