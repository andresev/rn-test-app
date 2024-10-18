import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const SmallButton = ({text, onPress, color, textColor}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});
