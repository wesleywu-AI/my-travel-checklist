import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const ChecklistItem = ({ item, onToggle, onDelete, onEdit }) => {
  const handleLongPress = () => {
    Alert.alert(
      '操作选项',
      '请选择操作',
      [
        { text: '编辑', onPress: () => onEdit(item) },
        { text: '删除', onPress: () => onDelete(item.id), style: 'destructive' },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onToggle(item.id)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.text, item.completed && styles.textCompleted]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
});

export default ChecklistItem;