import React, { useRef, useEffect, useState } from 'react';
import { View, findNodeHandle, UIManager } from 'react-native';
import { sharedStyles } from '../shared/styles';

export default function AutoSizerV2({ children }: { children: ({ width, height }: { width: number; height: number }) => any }) {
  const viewRef = useRef<View>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (viewRef.current) {
      const handle = findNodeHandle(viewRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height) => {
          if (width > 0 && height > 0) {
            setSize({ width, height });
          }
        });
      }
    }
  }, []);

  return (
    <View ref={viewRef} style={[sharedStyles.overflowHidden, sharedStyles.root]}>
      {size.width > 0 && size.height > 0 ? children(size) : null}
    </View>
  );
}
