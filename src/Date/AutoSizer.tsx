import React from 'react'
import { useCallback, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { sharedStyles } from '../shared/styles'

type WidthAndHeight = {
  width: number
  height: number
}

export default function AutoSizer({
  children,
}: {
  children: ({ width, height }: WidthAndHeight) => any
}) {
  const [layout, setLayout] = useState<WidthAndHeight | null>(null)

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      console.log("Measured Layout:", width, height);
  
      if (width === 0 || height === 0) {
        console.warn("Layout returned 0 width/height, delaying update...");
        setTimeout(() => {
          setLayout({ width, height });
        }, 50); // Adjust delay if needed
        return;
      }
  
      if (!layout || layout.width !== width || layout.height !== height) {
        setLayout({ width, height });
      }
    },
    [layout, setLayout]
  );
  

  return (
    <View
      onLayout={onLayout}
      style={[sharedStyles.overflowHidden, sharedStyles.root, layout && layout]}
    >
      {layout ? children(layout) : null}
    </View>
  )
}
