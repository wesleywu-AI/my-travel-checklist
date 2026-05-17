import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const ChecklistItem = ({ item, color, textColor, onToggle, onDelete, onEdit }) => {
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
      style={[styles.container, { width: '48%' }]}
      onPress={() => onToggle(item.id)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && { borderColor: color }]}
          onPress={() => onToggle(item.id)}
        >
          {item.completed && (
            <View style={[styles.checkmark, { backgroundColor: color }]}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            item.completed && styles.textCompleted,
          ]}
          numberOfLines={2}
        >
          {item.text}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 4,
  },
  deleteIcon: {
    fontSize: 16,
    color: '#D1D5DB',
    fontWeight: '300',
  },
});

export default ChecklistItem;