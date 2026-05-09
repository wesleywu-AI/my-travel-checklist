import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { CHECKLIST_INFO, DEFAULT_CHECKLISTS } from '../constants/checklistData';
import { loadChecklist, saveChecklist } from '../utils/storage';
import ChecklistItem from '../components/ChecklistItem';
import AddItemModal from '../components/AddItemModal';

const ChecklistScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params;
  const info = CHECKLIST_INFO[type];

  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [type])
  );

  const loadData = async () => {
    const savedData = await loadChecklist(type);
    if (savedData) {
      setItems(savedData);
    } else {
      setItems(DEFAULT_CHECKLISTS[type] || []);
    }
  };

  const saveData = async (newItems) => {
    await saveChecklist(type, newItems);
    setItems(newItems);
  };

  const handleToggle = async (id) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    await saveData(newItems);
  };

  const handleDelete = (id) => {
    Alert.alert(
      '删除清单项',
      '确定要删除这个清单项吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            const newItems = items.filter(item => item.id !== id);
            await saveData(newItems);
          },
        },
      ]
    );
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const handleSaveItem = async (text) => {
    if (editingItem) {
      const newItems = items.map(item =>
        item.id === editingItem.id ? { ...item, text } : item
      );
      await saveData(newItems);
    } else {
      const newItem = {
        id: Date.now().toString(),
        text,
        completed: false,
      };
      await saveData([...items, newItem]);
    }
    setModalVisible(false);
    setEditingItem(null);
  };

  const renderItem = ({ item }) => (
    <ChecklistItem
      item={item}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );

  const completedCount = items.filter(item => item.completed).length;
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: info.color }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>{info.icon}</Text>
          <Text style={styles.headerTitle}>{info.title}</Text>
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {completedCount}/{items.length} 已完成 ({progress}%)
          </Text>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>还没有清单项</Text>
            <Text style={styles.emptySubtext}>点击下方按钮添加</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: info.color }]}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+ 添加清单项</Text>
      </TouchableOpacity>

      <AddItemModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialValue={editingItem?.text || ''}
        title={editingItem ? '编辑清单项' : '添加清单项'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerIcon: {
    fontSize: 36,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressInfo: {
    marginTop: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#999999',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ChecklistScreen;