import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { CHECKLIST_INFO, DEFAULT_CHECKLISTS, SUB_CATEGORIES } from '../constants/checklistData';
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
  const [activeSubTab, setActiveSubTab] = useState('general');

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
        subCategoryId: activeSubTab,
      };
      await saveData([...items, newItem]);
    }
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleReset = async () => {
    const newItems = items.map(item =>
      item.completed ? { ...item, completed: false } : item
    );
    await saveData(newItems);
  };

  const currentItems = items.filter(item =>
    item.subCategoryId === activeSubTab || (!item.subCategoryId && activeSubTab === 'general')
  );

  const completedCount = currentItems.filter(item => item.completed).length;
  const progress = currentItems.length > 0 ? Math.round((completedCount / currentItems.length) * 100) : 0;

  const renderSubCategorySection = (subCategory) => {
    const subItems = items.filter(item =>
      item.subCategoryId === subCategory.id || (!item.subCategoryId && subCategory.id === 'general')
    );

    if (subItems.length === 0) return null;

    const subCompleted = subItems.filter(item => item.completed).length;

    return (
      <View key={subCategory.id} style={styles.subCategorySection}>
        <View style={styles.subCategoryHeader}>
          <View style={[styles.subCategoryIndicator, { backgroundColor: info.color }]} />
          <Text style={styles.subCategoryTitle}>{subCategory.name}</Text>
          <Text style={styles.subCategoryCount}>
            ({subCompleted}/{subItems.length})
          </Text>
        </View>
        <View style={styles.gridContainer}>
          {subItems.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              color={info.color}
              textColor={info.textColor}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: info.bgColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.headerIconContainer, { backgroundColor: info.iconBg }]}>
          <Text style={styles.headerIcon}>{info.icon}</Text>
        </View>
        <Text style={[styles.headerTitle, { color: info.textColor }]}>
          {info.title}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>总进度: {progress}%</Text>
            {completedCount > 0 && (
              <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: '#FFFFFF' }]}
                onPress={handleReset}
              >
                <Text style={[styles.resetButtonText, { color: info.textColor }]}>
                  ↻ 恢复
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.progressCount}>
            {completedCount}/{currentItems.length} 项
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: info.color },
            ]}
          />
        </View>
      </View>

      <View style={styles.subTabContainer}>
        <Text style={styles.subTabLabel}>添加至:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.subTabScroll}
        >
          {SUB_CATEGORIES.map(sub => (
            <TouchableOpacity
              key={sub.id}
              style={[
                styles.subTab,
                activeSubTab === sub.id && { backgroundColor: info.color },
              ]}
              onPress={() => setActiveSubTab(sub.id)}
            >
              <Text
                style={[
                  styles.subTabText,
                  activeSubTab === sub.id && styles.subTabTextActive,
                ]}
              >
                {sub.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>当前空空如也</Text>
          </View>
        ) : (
          SUB_CATEGORIES.map(renderSubCategorySection)
        )}
      </ScrollView>

      <View style={styles.bottomInput}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: info.color }]}
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ 添加事项</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#111827',
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  resetButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  subTabContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  subTabLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 8,
  },
  subTabScroll: {
    flex: 1,
  },
  subTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  subTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  subTabTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  subCategorySection: {
    marginBottom: 24,
  },
  subCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 4,
  },
  subCategoryIndicator: {
    width: 4,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  subCategoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  subCategoryCount: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bottomInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  addButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ChecklistScreen;