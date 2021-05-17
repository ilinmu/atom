import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

function App() {
  return (
    <div className="App">
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
