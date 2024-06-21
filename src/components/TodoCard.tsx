import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

type TodoCardProps = {
  todo: string;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.todoText}>{todo}</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="pencil-outline" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <IonIcons name="trash-bin-outline" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
        <Icon name="check" size={24} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 32,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  todoText: {
    fontSize: 18,
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default TodoCard;
