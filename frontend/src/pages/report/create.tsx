import { lazy, useState } from 'react';
import CameraComponent from '../../components/Camera';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { createReport } from '../../redux/report/reportSlice';
import { useNavigate } from 'react-router-dom';

const ImageEditor = lazy(() => import('../../components/ImageEditor'));

const CreateReport = () => {
  const [isWebCamOpen, setIsWebcamOpen] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [isEditor, setIsEditor] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newReport } = useSelector((state: RootState) => state.report);

  const createNewReport = async (file: File) => {
    setIsEditor(false);
    const payload = new FormData();
    const cb = () => {
      navigate(`/report/details/${newReport.insertId}`);
    };
    payload.append('image', file, imageFile.name);
    dispatch(
      createReport({
        payload,
        cb,
      })
    );
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
