import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import axios from 'axios';
import {
  pushProductToAPI,
  getProductsFromAPI,
} from '../services/products.services';

export const ProductsListScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [productTextInput, setProductTextInput] = useState();
  const [modalVisible, setModalVisible] = useState(true);

  const getProducts = async () => {
    try {
      const res = await getProductsFromAPI();
      const products = await res.json();
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleItemPress = item => {
    setModalVisible(!modalVisible);
    navigation.navigate('ProductScreen', {
      title: item.title,
      price: item.price,
      image: item.image,
    });
  };

  const getFilteredList = () => {
    if (!productTextInput) return products;

    return products.filter(item =>
      item.title.toLowerCase().includes(productTextInput.toLowerCase()),
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        activeOpacity={0.8}
        onPress={() => handleItemPress(item)}>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.itemInfoContainer}>
          <Text>{item.title}</Text>
          <View style={styles.itemPriceContainer}>
            <Text>Price:</Text>
            <Text>{`$${item.price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Search..."
          onChangeText={text => setProductTextInput(text)}
          value={productTextInput}
        />
        <Button
          title="CLOSE"
          onPress={
            () => setModalVisible(!modalVisible)
            // pushProductToAPI({
            //   title: productText,
            //   price: 13.5,
            //   description: 'lorem ipsum set',
            //   image: 'https://i.pravatar.cc',
            //   category: 'electronic',
            // })
          }
        />
        <FlatList
          data={getFilteredList()}
          renderItem={renderItem}
          style={styles.flatList}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={item => item.id.toString()}
          scrollEnabled
          // onEndReached={}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'darkgray',
    paddingTop: 30,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10,
    height: 100,
    width: '100%',
    paddingRight: '5%',
    backgroundColor: '#FFB563',
  },
  itemImage: {
    width: '25%',
    height: '100%',
  },
  flatList: {},
  contentContainer: {
    // paddingHorizontal: '5%',
    paddingBottom: 120,
  },
  itemPriceContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  itemInfoContainer: {
    flex: 3,
    height: '100%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 300,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
