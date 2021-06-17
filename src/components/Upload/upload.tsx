import React, { FC, useRef, ChangeEvent } from 'react';
import axios from 'axios';

import Button from '../Button/button';

export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
  } = props;
  const inputComponent = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputComponent.current) {
      inputComponent.current.click();
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (inputComponent.current) {
      inputComponent.current.value = '';
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(file);
          })
        } else if (result === true) {
          post(file);
        }
      }
    })
  }

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          if (onProgress) {
            onProgress(percentage, file);
          }
        }
      }
    }).then((response) => {
      if (onSuccess) {
        onSuccess(response.data, file);
      }
    }).catch((error) => {
      if (onError) {
        onError(error, file);
      }
    })
  }

  return (
    <div>
      <Button
        onClick={handleButtonClick}
      >
        Upload
      </Button>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={inputComponent}
      />
    </div>
  )
}

export default Upload;