import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';

function Loadingpage() {
  return (
    <View style={styles.container}>
      <Text> Loading Page......</Text>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loadingpage;
