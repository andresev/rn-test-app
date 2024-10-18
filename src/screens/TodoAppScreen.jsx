import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
} from 'react-native';
import {SmallButton} from '../components';

const taskArray = [
  'Study',
  'Feed the dog',
  'Read',
  'Go for a walk',
  'Meditate',
  'Eat food',
];

export const TodoAppScreen = () => {
  const [taskList, setTaskList] = useState(taskArray);
  const [todoTextInput, setTodoTextInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTextInput, setModalTextInput] = useState('');
  const currentTaskIndex = useRef(null);

  const handleAddTask = () => {
    if (todoTextInput.length === 0) return;
    setTaskList(prev => [...prev, todoTextInput]);
    setTodoTextInput('');
  };

  const handleEdit = index => {
    // setModalVisible(true);
    // currentTaskIndex.current = index;
    Alert.prompt(
      'Enter the new task:',
      '',
      text => {
        console.log('Index:', index, 'Text:', text);
        setTaskList(prev => {
          const updateTask = [...prev];
          updateTask[index] = text;
          return updateTask;
        });
      },
      'plain-text',
    );
  };

  const handleDelete = index => {
    setTaskList(prev => prev.filter((item, itemIndex) => itemIndex !== index));
  };

  const handleTextInput = text => {
    setTodoTextInput(text);
  };

  const getFilteredList = () => {
    if (!todoTextInput && todoTextInput.length <= 0) return taskList;

    return taskList.filter(task =>
      task.toLowerCase().includes(todoTextInput.toLowerCase()),
    );
  };

  const handleModalClose = () => {
    setModalVisible(!modalVisible);
  };

  const handleModalUpdate = () => {
    const index = currentTaskIndex.current;
    if (index !== null) {
      setTaskList(prev => {
        const updatedTask = [...prev];
        updatedTask[index] = modalTextInput;
        return updatedTask;
      });
    }
    setModalVisible(!modalVisible);
    setModalTextInput('');
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem}>
        <Text>{item}</Text>
        <View style={styles.renderItemButtonContainer}>
          <SmallButton
            text={'EDIT'}
            color={'green'}
            onPress={() => handleEdit(index)}
          />
          <SmallButton
            text={'DELETE'}
            color={'red'}
            onPress={() => handleDelete(index)}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.titleScreen}>AndresForGeeks</Text>
          <Text style={styles.appName}>Todo App</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Add Todo"
            onChangeText={text => handleTextInput(text)}
            value={todoTextInput}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addTaskButton}
            onPress={handleAddTask}>
            <Text style={styles.addTaskText}>ADD TASK</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={getFilteredList()}
          renderItem={renderItem}
          style={styles.flatList}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => (
            <View style={{height: 4, backgroundColor: 'green'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Edit Task"
              onChangeText={text => setModalTextInput(text)}
              value={modalTextInput}
            />
            <Button title="UPDATE" onPress={handleModalUpdate} />
            <Button title="CLOSE" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: '10%',
    rowGap: 10,
  },
  topContainer: {
    width: '100%',
    rowGap: 10,
  },
  titleScreen: {
    fontSize: 24,
    fontWeight: '900',
    color: 'green',
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  flatList: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    // flex: 1,
  },
  addTaskButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  addTaskText: {
    fontWeight: '900',
    color: 'white',
  },
  renderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
  },
  renderItemButtonContainer: {
    flexDirection: 'row',
    columnGap: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextInput: {
    minWidth: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingHorizontal: 10,
  },
});
