import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export const useToast = () => {
  const [toastItem, setToastItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const Toast = () => {
    return (
      <View style={styles.toastContainer}>
        <Text>{toastItem}</Text>
        <Button title="CLOSE" onPress={() => setIsOpen(false)} />
      </View>
    );
  };

  return {isOpen, setIsOpen, Toast, toastItem, setToastItem};
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
    width: 200,
    height: 220,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    zIndex: 10,
  },
});
