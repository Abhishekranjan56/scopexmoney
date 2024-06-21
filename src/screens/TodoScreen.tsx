import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Alert, TextInput, Button, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import TodoCard from '../components/TodoCard';
import { useNavigation } from '@react-navigation/native';

type TodoItem = string;

const TodoScreen = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');

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
  };

  const addTodo = () => {
    if (newTodo.trim().length === 0) {
      Alert.alert('Error', 'Please enter a valid todo item.');
      return;
    }
    setItems([...items, newTodo]);
    setNewTodo('');
    toggleModal();
  };

  const renderItem = ({ item }: { item: TodoItem }) => <TodoCard todo={item} />;

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
          <Text style={styles.modalTitle}>Add New Todo</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new todo"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={toggleModal} color="#ff5c5c" />
            <Button title="Save" onPress={addTodo} />
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default TodoScreen;
