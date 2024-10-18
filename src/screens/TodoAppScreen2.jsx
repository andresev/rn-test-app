import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SmallButton} from '../components';
import {useToast} from '../hooks';

export const TodoAppScreen2 = () => {
  const {isOpen, setIsOpen, Toast, setToastItem} = useToast();
  // TextInput
  const [textInput, setTextInput] = useState('');
  // Items
  const [todoList, setTodoList] = useState([
    'clean room',
    'study',
    'play guitar',
  ]);

  const handleAddTodo = () => {
    setTodoList(prev => [...prev, textInput]);
    setTextInput('');
  };

  const handleItemDelete = index => {
    setTodoList(prev => prev.filter((item, itemIndex) => itemIndex !== index));
  };

  const RenderItem = ({item, index}) => {
    const handleItemOnPress = () => {
      setToastItem(item);
      setIsOpen(true);
    };

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={handleItemOnPress}>
        <Text>{item}</Text>
        <SmallButton
          text={'DELETE'}
          color={'red'}
          onPress={() => handleItemDelete(index)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isOpen ? <Toast /> : null}
      {/* Text Input */}
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setTextInput(text)}
          value={textInput}
        />
        <Button title="ADD" onPress={handleAddTodo} />
      </View>

      {/* List of To-do's */}
      <FlatList
        data={todoList}
        style={styles.flatListContainer}
        renderItem={RenderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 10, backgroundColor: 'green'}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '10%',
  },
  textInput: {
    alignSelf: 'center',
    width: 300,
    height: 54,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    paddingHorizontal: '10%',
  },
});
