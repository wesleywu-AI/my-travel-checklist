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
        style={[styles.card, { backgroundColor: info.bgColor }]}
        onPress={() => handleCardPress(type)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: info.iconBg }]}>
            <Text style={styles.cardIcon}>{info.icon}</Text>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, { color: info.textColor }]}>
              {info.title}
            </Text>
            <Text style={styles.cardDescription}>{info.description}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          {progress.total > 0 ? (
            <>
              <Text style={[styles.progressText, { color: info.textColor }]}>
                {progress.completed}/{progress.total} 已完成
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress.percentage}%`, backgroundColor: info.color },
                  ]}
                />
              </View>
            </>
          ) : (
            <View style={styles.emptyTag}>
              <Text style={styles.emptyTagText}>去创建</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>出游清单</Text>
        <Text style={styles.headerSubtitle}>点击卡片进入对应场景清单</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.values(CHECKLIST_TYPES).map(renderCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressSection: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },
  emptyTagText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default HomeScreen;