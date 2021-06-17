import React, { useCallback, useState, useEffect } from 'react';

import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Icon from './components/Icon/icon';
import Menu, { MenuItem, ModeType, SubMenu } from './components/Menu/menu';
import Tabs, { TabPane, ModeType as TabsModeType } from './components/Tabs/tabs';
import Input, {InputSize} from './components/Input/input';
import AutoComplete, { OptionDataType } from './components/AutoComplete/autoComplete';
import Select from './components/Select/select';
import Upload from './components/Upload/upload';

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
    const data = [
      {
        id: 1,
        value: 'aaa',
      },
      {
        id: 2,
        value: 'def',
      },
      {
        id: 3,
        value: 'ghi',
      },
      {
        id: 4,
        value: 'abb',
      },
    ];
    return data.filter((item) => item.value.includes(value));
  }

  const handleRenderOption = (item: OptionDataType) => {
    return <div>*{item.value}</div>
  }

  const handleFetchUser = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((response) => response.json())
      .then(({ items }) => items.slice(0, 10).map((item: any) => ({value: item.login, ...item})));
  }

  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.warn('update');
    document.title = `You clicked ${count} times`;
    return (): void => {
      console.warn('useEffect return', count);
    };
  }, [count]);

  const selectData = [
    {
      id: 1,
      name: '111',
      value: '111',
    },
    {
      id: 2,
      name: '222',
      value: '222',
    },
    {
      id: 3,
      name: '333',
      value: '333',
    },
    {
      id: 4,
      name: '444',
      value: '444',
    },
  ];

  const handleBeforeUpload = (file: File) => {
    console.warn('handleBeforeUpload', file);
    if (file.size > 100) {
      console.warn('file size is larger than 100');
    } else {
      console.warn('file size is smaller than 100');
    }
    return true;
  }

  const handleUploadProgress = (percentage: number, file: File) => {
    console.warn('percentage', percentage);
    console.warn('file', file);
  }

  const handleUploadSuccess = (data: any, file: File) => {
    console.warn('data', data);
    console.warn('file', file);
  }

  const handleUploadError = (error: any, file: File) => {
    console.warn('error', error);
    console.warn('file', file);
  }

  return (
    <div className="App">
      <Upload
        action="https://run.mocky.io/v3/331f73a8-6cf6-4cfb-bb87-07204835fb52"
        beforeUpload={handleBeforeUpload}
        onProgress={handleUploadProgress}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      />
      <Button onClick={() => setCount(count + 1)}>click</Button>
      <Select
        data={selectData}
        onChange={(item, value) => console.log(item, value)}
      />
      <Select
        data={selectData}
        onChange={(item, value) => console.log(item, value)}
        multiple
      />
      <AutoComplete
        // fetchSuggestions={fetchSuggestions}
        fetchSuggestions={handleFetchUser}
        onSelect={(item: OptionDataType) => console.log(item)}
        renderOption={handleRenderOption}
      />
      <Input
        className="test-input"
        size={InputSize.Large}
        prefix={prefixIcon}
        suffix={prefixIcon}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
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
