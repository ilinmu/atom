import React, { FC, useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';

import Button from '../Button/button';
import UploadList from './uploadList';

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
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props;
  const inputComponent = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const handleButtonClick = () => {
    if (inputComponent.current) {
      inputComponent.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (inputComponent.current) {
      inputComponent.current.value = '';
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

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
          });
        } else if (result === true) {
          post(file);
        }
      }
    });
  };

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
  ) => {
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
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    const _file: UploadFile = {
      uid: `${new Date().getTime()}-upload-file`,
      size: file.size,
      name: file.name,
      status: 'ready',
      raw: file,
    };
    setFileList([_file, ...fileList]);
    formData.append(file.name, file);
    axios
      .post(action, formData, {
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
        },
      })
      .then((response) => {
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
      })
      .catch((error) => {
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
      });
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>Upload</Button>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={inputComponent}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
