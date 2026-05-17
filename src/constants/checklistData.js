// 子分类配置
export const SUB_CATEGORIES = [
  { id: 'baby', name: '宝宝' },
  { id: 'mom', name: '妈妈' },
  { id: 'dad', name: '爸爸' },
  { id: 'mil', name: '婆婆' },
  { id: 'general', name: '通用' },
];

// 清单类型
export const CHECKLIST_TYPES = {
  DAY_TRIP: 'DAY_TRIP',
  MULTI_DAY: 'MULTI_DAY',
  HOMETOWN: 'HOMETOWN',
  STAY_HOME: 'STAY_HOME',
};

// 清单信息配置
export const CHECKLIST_INFO = {
  DAY_TRIP: {
    title: '一日游清单',
    icon: '☀️',
    color: '#3B82F6', // blue-500
    bgColor: '#EFF6FF', // blue-50
    textColor: '#2563EB', // blue-600
    iconBg: '#DBEAFE', // blue-100
    description: '短途出行必备',
  },
  MULTI_DAY: {
    title: '多日游清单',
    icon: '✈️',
    color: '#10B981', // emerald-500
    bgColor: '#ECFDF5', // emerald-50
    textColor: '#059669', // emerald-600
    iconBg: '#D1FAE5', // emerald-100
    description: '长途旅行准备',
  },
  HOMETOWN: {
    title: '回老家清单',
    icon: '🏠',
    color: '#F97316', // orange-500
    bgColor: '#FFF7ED', // orange-50
    textColor: '#EA580C', // orange-600
    iconBg: '#FED7AA', // orange-100
    description: '回家探亲必备',
  },
  STAY_HOME: {
    title: '宅家清单',
    icon: '🎮',
    color: '#8B5CF6', // purple-500
    bgColor: '#FAF5FF', // purple-50
    textColor: '#7C3AED', // purple-600
    iconBg: '#EDE9FE', // purple-100
    description: '居家休闲好物',
  },
};

// 默认清单项（添加子分类）
export const DEFAULT_CHECKLISTS = {
  DAY_TRIP: [
    { id: '1', text: '身份证', completed: false, subCategoryId: 'general' },
    { id: '2', text: '手机充电器', completed: false, subCategoryId: 'general' },
    { id: '3', text: '水杯', completed: false, subCategoryId: 'general' },
    { id: '4', text: '雨伞', completed: false, subCategoryId: 'general' },
    { id: '5', text: '防晒霜', completed: false, subCategoryId: 'general' },
    { id: '6', text: '纸巾', completed: false, subCategoryId: 'general' },
    { id: '7', text: '钱包', completed: false, subCategoryId: 'general' },
    { id: '8', text: '钥匙', completed: false, subCategoryId: 'general' },
  ],
  MULTI_DAY: [
    { id: '1', text: '行李箱', completed: false, subCategoryId: 'general' },
    { id: '2', text: '换洗衣物', completed: false, subCategoryId: 'general' },
    { id: '3', text: '洗漱用品', completed: false, subCategoryId: 'general' },
    { id: '4', text: '充电宝', completed: false, subCategoryId: 'general' },
    { id: '5', text: '相机', completed: false, subCategoryId: 'general' },
    { id: '6', text: '常用药品', completed: false, subCategoryId: 'general' },
    { id: '7', text: '身份证', completed: false, subCategoryId: 'general' },
    { id: '8', text: '手机充电器', completed: false, subCategoryId: 'general' },
  ],
  HOMETOWN: [
    { id: '1', text: '礼物', completed: false, subCategoryId: 'general' },
    { id: '2', text: '特产', completed: false, subCategoryId: 'general' },
    { id: '3', text: '换洗衣物', completed: false, subCategoryId: 'general' },
    { id: '4', text: '充电宝', completed: false, subCategoryId: 'general' },
    { id: '5', text: '身份证', completed: false, subCategoryId: 'general' },
    { id: '6', text: '钥匙', completed: false, subCategoryId: 'general' },
  ],
  STAY_HOME: [
    { id: '1', text: '零食', completed: false, subCategoryId: 'general' },
    { id: '2', text: '饮料', completed: false, subCategoryId: 'general' },
    { id: '3', text: '电影/剧集', completed: false, subCategoryId: 'general' },
    { id: '4', text: '游戏', completed: false, subCategoryId: 'general' },
    { id: '5', text: '书籍', completed: false, subCategoryId: 'general' },
    { id: '6', text: '舒适的家居服', completed: false, subCategoryId: 'general' },
  ],
};
