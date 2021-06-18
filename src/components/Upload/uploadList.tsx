import React, { FC } from 'react';

import { UploadFile } from './upload';
import Icon from '../Icon/icon';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (prop) => {
  const {
    fileList,
    onRemove,
  } = prop;

  const renderList = () => {
    return fileList.map((file) => {
      return (
        <li className="upload-list-item" key={file.uid}>
          <span className={`file-name file-name-${file.status}`}>
            <Icon name="arrow-up" />
            {file.name}
          </span>
          <span className="file-actions">
            <Icon name="arrow-up" onClick={() => { onRemove(file) }} />
          </span>
        </li>
      )
    })
  }
  return (
    <ul className="upload-list">
      {renderList()}
    </ul>
  )
}

export default UploadList;