import React, { useCallback } from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Icon from './components/Icon/icon';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  const handleOnCompleted = useCallback(
    (iconName) => console.log(`${iconName} successfully loaded`),
    []
  );

  const handleIconError = useCallback((err) => console.error(err.message), []);

  return (
    <div className="App">
      <Menu
        onSelect={(index: string) => alert(index)}
        mode="horizontal"
      >
        <MenuItem>123</MenuItem>
        <MenuItem
          disabled
        >
          456
        </MenuItem>
        <SubMenu title="subMenu">
          <MenuItem>SubMenu 1</MenuItem>
          <MenuItem>SubMenu 2</MenuItem>
          <MenuItem>SubMenu 3</MenuItem>
        </SubMenu>
        <MenuItem
        >
          789
        </MenuItem>
      </Menu>
      <Menu
        onSelect={(index: string) => alert(index)}
        defaultOpenSubMenu={['2']}
        mode="vertical"
      >
        <MenuItem>123</MenuItem>
        <MenuItem
          disabled
        >
          456
        </MenuItem>
        <SubMenu title="subMenu">
          <MenuItem>SubMenu 1</MenuItem>
          <MenuItem>SubMenu 2</MenuItem>
          <MenuItem>SubMenu 3</MenuItem>
        </SubMenu>
        <MenuItem>789</MenuItem>
      </Menu>
      <Icon
        name="arrow-down"
        onCompleted={handleOnCompleted}
        onError={handleIconError}
        onClick={() => alert('1')}
      />
      <Icon
        name="arrow-up"
        onCompleted={handleOnCompleted}
        onError={handleIconError}
      />
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
