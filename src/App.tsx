import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';

function App() {
  return (
    <div className="App">
      <Alert
        type={AlertType.SUCCESS}
        title="测试标题一"
        closeable={false}
      />
      <Alert
        title="测试标题二"
        message="这里是描述文字"
      />
      <Alert
        title="测试标题三"
        type={AlertType.DANGER}
        message="这里是描述文字"
        onClose={() => alert('1')}
      />
      <Alert
        title="测试标题四"
        type={AlertType.WARNING}
        message="这里是描述文字"
        onClose={() => alert('1')}
      />
      <Button
        type={ButtonType.Primary}
        size={ButtonSize.Large}
        disabled
      > 
        Hello
      </Button>
      <Button
        type={ButtonType.Danger}
        size={ButtonSize.Small}
        autoFocus
      > 
        Hello
      </Button>
      <Button
        type={ButtonType.Link}
        size={ButtonSize.Small}
        target="_blank"
        href="http://www.qq.com"
      > 
        QQ LINK
      </Button>
      <Button
        type={ButtonType.Link}
        size={ButtonSize.Small}
        href="http://www.qq.com"
        disabled
      > 
        QQ LINK
      </Button>
    </div>
  );
}

export default App;
