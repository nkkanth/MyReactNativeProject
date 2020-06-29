import React from 'react';
import { Text, View } from 'react-native';


function component1() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}

export default component1;