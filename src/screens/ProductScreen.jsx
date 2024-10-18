import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const ProductScreen = ({route, navigation}) => {
  const {title, price, image} = route.params;
  const {setOptions} = useNavigation();

  useEffect(() => {
    navigation.setOptions({headerTitle: title});
  }, [title, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} width={220} height={320} />
      </View>
      <View style={styles.textContainer}>
        <Text>{title}</Text>
        <Text>{`$${price}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '10%',
  },
  button: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'teal',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
  },
});
