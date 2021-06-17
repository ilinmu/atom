import React, { FC, useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';

import Button from '../Button/button';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'fail';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
  } = props;
  const inputComponent = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
            post(processedFile);
          })
        } else if (result === true) {
          post(file);
        }
      }
    })
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    console.warn('updateFileList');
    setFileList((prevFileList) => {
      return prevFileList.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObj,
          };
        }
        return file;
      });
    })
  }

  const post = (file: File) => {
    const formData = new FormData();
    const _file: UploadFile = {
      uid: `${new Date().getTime()}-upload-file`,
      size: file.size,
      name: file.name,
      status: 'ready',
      raw: file,
    }
    setFileList([_file, ...fileList]);
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
            updateFileList(_file, {
              status: 'uploading',
              percent: percentage,
            });
          }
        }
      }
    }).then((response) => {
      updateFileList(_file, {
        status: 'success',
        response: response.data,
      });
      if (onSuccess) {
        onSuccess(response.data, file);
      }
      if (onChange) {
        onChange(file);
      }
    }).catch((error) => {
      updateFileList(_file, {
        status: 'fail',
        error: error,
      });
      if (onError) {
        onError(error, file);
      }
      if (onChange) {
        onChange(file);
      }
    })
  }

  console.warn('fileList', fileList);

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