import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CHECKLIST_TYPES, CHECKLIST_INFO } from '../constants/checklistData';
import { loadChecklist } from '../utils/storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    const newProgressData = {};
    for (const type of Object.values(CHECKLIST_TYPES)) {
      const data = await loadChecklist(type);
      if (data && data.length > 0) {
        const completed = data.filter(item => item.completed).length;
        newProgressData[type] = {
          total: data.length,
          completed,
          percentage: Math.round((completed / data.length) * 100),
        };
      } else {
        newProgressData[type] = { total: 0, completed: 0, percentage: 0 };
      }
    }
    setProgressData(newProgressData);
  };

  const handleCardPress = (type) => {
    navigation.navigate('Checklist', { type });
  };

  const renderCard = (type) => {
    const info = CHECKLIST_INFO[type];
    const progress = progressData[type] || { total: 0, completed: 0, percentage: 0 };

    return (
      <TouchableOpacity
        key={type}
        style={[styles.card, { backgroundColor: info.color }]}
        onPress={() => handleCardPress(type)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{info.icon}</Text>
          <Text style={styles.cardTitle}>{info.title}</Text>
        </View>
        <Text style={styles.cardDescription}>{info.description}</Text>
        {progress.total > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress.percentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {progress.completed}/{progress.total} 已完成
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>出游清单</Text>
        <Text style={styles.headerSubtitle}>轻松准备每一次出行</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.values(CHECKLIST_TYPES).map(renderCard)}
      </ScrollView>
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
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 10,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 5,
  },
});

export default HomeScreen;