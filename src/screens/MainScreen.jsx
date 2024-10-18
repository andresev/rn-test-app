import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export const MainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Button
        title="PRODUCT LIST OLD"
        onPress={() => navigation.navigate('ProductsList')}
      /> */}
      <Button
        title="TODO APP OLD"
        onPress={() => navigation.navigate('TodoAppScreen')}
      />
      <Button
        title="TODO APP"
        onPress={() => navigation.navigate('TodoAppScreen2')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
});
