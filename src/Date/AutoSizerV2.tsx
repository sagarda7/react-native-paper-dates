import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { sharedStyles } from '../shared/styles';

export default function AutoSizerV2({ children }: { children: ({ width, height }: { width: number; height: number }) => any }) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(Dimensions.get('window'));
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription.remove();
  }, []);

  return (
    <View style={[sharedStyles.overflowHidden, sharedStyles.root, { width: dimensions.width, height: dimensions.height }]}>
      {children(dimensions)}
    </View>
  );
}
