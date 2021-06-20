## Icon

Demo:

```tsx
import React, { useCallback } from 'react';
import { Icon } from 'atom';

const handleOnCompleted = useCallback(
  (iconName) => console.log(`${iconName} successfully loaded`),
  [],
);

const handleIconError = useCallback((err) => console.error(err.message), []);

export default () => (
  <Icon
    name="arrow-down"
    onCompleted={handleOnCompleted}
    onError={handleIconError}
    onClick={() => alert('1')}
  />
);
```
