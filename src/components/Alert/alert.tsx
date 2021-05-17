import React, { useState } from 'react';
import classNames from 'classnames';

export enum AlertType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  DEFAULT = 'default',
}

interface AlertProps {
  className?: string;
  type?: AlertType;
  title: string;
  message?: string | React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
}
const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    type,
    title,
    message,
    closeable,
    onClose,
  } = props;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  }
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  });
  const titleClasses = classNames({
    'alert-title': title && message,
    'alert-message': title && !message,
  });
  const closeIcon = closeable && (
    <div
      className="alert-icon"
      onClick={handleClose}
    >
      X
    </div>);
  return (
    <div className={classes} style={{ display: show ? 'block' : 'none'}}>
      <>
        {closeIcon}
        <div className={titleClasses}>{title}</div>
        {
          message && (<div className="alert-message">{message}</div>)
        }
      </>
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.DEFAULT,
  closeable: true,
}

export default Alert;
