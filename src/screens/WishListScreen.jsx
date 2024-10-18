import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export const WishListScreen = () => {
  const names = ['Andres', 'Jose', 'Noe', 'Nick', 'Jason', 'Noah', 'Ricky'];
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState(names);

  const handleAdd = () => {
    setItemList(prev => [...prev, textItem]);
  };

  const handleOnChangeText = text => {
    setTextItem(text);
    if (text) {
      setItemList(
        itemList.filter(item =>
          item.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    } else {
      setItemList(names);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleOnChangeText}
        value={textItem}
        placeholder="Add Item Here"
      />
      <Button title="ADD" onPress={handleAdd} />
      <FlatList data={itemList} renderItem={renderItem} scrollEnabled />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
