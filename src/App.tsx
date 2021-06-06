import React, { useCallback } from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Icon from './components/Icon/icon';
import Menu, { MenuItem, ModeType, SubMenu } from './components/Menu/menu';
import Tabs, { TabPane, ModeType as TabsModeType } from './components/Tabs/tabs';
import Input, {InputSize} from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';

function App() {
  const handleOnCompleted = useCallback(
    (iconName) => console.log(`${iconName} successfully loaded`),
    []
  );

  const handleIconError = useCallback((err) => console.error(err.message), []);

  const prefixIcon = (
    <Icon
      name="arrow-up"
      onCompleted={handleOnCompleted}
      onError={handleIconError}
    />
  );

  const fetchSuggestions = (value: string) => {
    const data = ['abc', 'def', 'ghi', 'aaa', 'abb', 'ccc'];
    return data.filter((item) => item.includes(value));
  }

  return (
    <div className="App">
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={(value: string) => console.log(value)}
      />
      <Input
        className="test-input"
        size={InputSize.Large}
        prefix={prefixIcon}
        suffix={prefixIcon}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
        onPressEnter={(value: string) => console.log(value)}
      />
      <Tabs
        defaultActiveKey={0}
        onChange={(index: number) => alert(index)}
      >
        <TabPane title="TabPane0">
          这里是内容0
        </TabPane>
        <TabPane title="TabPane1" disabled>
          这里是内容1
        </TabPane>
        <TabPane title="TabPane2">
          这里是内容2
        </TabPane>
      </Tabs>
      <Tabs
        mode={TabsModeType.VERTICAL}
        defaultActiveKey={0}
        onChange={(index: number) => alert(index)}
      >
        <TabPane index={0} title="TabPane0">
          这里是内容0
        </TabPane>
        <TabPane index={1} title="TabPane1">
          这里是内容1
        </TabPane>
      </Tabs>
      <Menu
        onSelect={(index: string) => alert(index)}
        mode={ModeType.HORIZONTAL}
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
        mode={ModeType.VERTICAL}
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
