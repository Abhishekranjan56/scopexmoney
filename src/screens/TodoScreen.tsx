import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import TodoCard from '../components/TodoCard';
import { useNavigation } from '@react-navigation/native';

type TodoItem = string;

const TodoScreen = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name="plus"
          size={24}
          color="#007aff"
          backgroundColor="transparent"
          underlayColor="transparent"
          onPress={toggleModal}
        />
      ),
    });
  }, [navigation]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setError(null);
  };

  const showToast = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100
    );
  };

  const addOrUpdateTodo = async () => {
    if (newTodo.trim().length === 0) {
      setError('Please enter a valid todo item.');
      return;
    }
    setLoading(true);
    try {
      if (editingIndex !== null) {
        const updatedItems = items.map((item, index) =>
          index === editingIndex ? newTodo : item
        );
        setItems(updatedItems);
        showToast('Todo updated');
        setEditingIndex(null);
      } else {
        setItems([...items, newTodo]);
        showToast('Todo added');
      }
      setNewTodo('');
      toggleModal();
    } catch (err) {
      setError('An error occurred while saving the todo.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (index: number) => {
    setLoading(true);
    try {
      setItems(items.filter((_, i) => i !== index));
      showToast('Todo deleted');
    } catch (err) {
      setError('An error occurred while deleting the todo.');
    } finally {
      setLoading(false);
    }
  };

  const editTodo = (index: number) => {
    setNewTodo(items[index]);
    setEditingIndex(index);
    toggleModal();
  };

  const renderItem = ({ item, index }: { item: TodoItem; index: number }) => (
    <TodoCard todo={item} onDelete={() => deleteTodo(index)} onEdit={() => editTodo(index)} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 20 }} />;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{editingIndex !== null ? 'Edit Todo' : 'Add New Todo'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new todo"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#ff5c5c' }]} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#007aff' }]} onPress={addOrUpdateTodo}>
              <Text style={styles.buttonText}>{editingIndex !== null ? 'Update' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TodoScreen;
