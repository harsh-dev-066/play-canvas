// Import the editor styles
import '@pqina/pintura/pintura.css';

// Import the editor default configuration
import { getEditorDefaults } from '@pqina/pintura';

// Import the editor component from `react-pintura`
import { PinturaEditor } from '@pqina/react-pintura';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ConfirmMessage from '../utils/confirmModel';

// get default properties
const editorConfig = getEditorDefaults();

function ImageEditor({ imageFile, createReport }) {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');

  const changeFileToUrl = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setImageUrl(imageSrc as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onProcess = (params) => {
    createReport(params.dest);
  };
  const cancelEditing = async (e) => {
    const confirm = await ConfirmMessage('you want to cancel editing?');
    if (confirm.isConfirmed) navigate('/');
  };
  useEffect(() => {
    if (imageFile) changeFileToUrl(imageFile);
  }, [imageFile]);

  return (
    imageUrl && (
      <div className="" style={{ height: '600px' }}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={cancelEditing}>
          <div role="presentation" className="text-xl ">
            <IoIosArrowBack />
          </div>
          <h1 className="font-semibold text-xl">Cancel</h1>
        </div>
        <PinturaEditor
          {...editorConfig}
          src={imageUrl}
          imageCropAspectRatio={1}
          onProcess={onProcess}
        ></PinturaEditor>
      </div>
    )
  );
}

export default ImageEditor;
