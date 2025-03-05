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
      const nl = event.nativeEvent.layout
      // https://github.com/necolas/react-native-web/issues/1704
      console.log("Native Layout 111", nl.height, nl.width);
      if (!layout || layout.width !== nl.width || layout.height !== nl.height) {
        console.log("Native Layout", nl.height, nl.width);
        setLayout({ width: nl.width, height: nl.height })
      }
    },
    [layout, setLayout]
  )

  return (
    <View
      onLayout={() => {
        setTimeout(() => onLayout, 500)
      }}
      style={[sharedStyles.overflowHidden, sharedStyles.root, layout && layout]}
    >
      {layout ? children(layout) : null}
    </View>
  )
}
