export const CHECKLIST_TYPES = {
  DAY_TRIP: 'DAY_TRIP',
  MULTI_DAY: 'MULTI_DAY',
  HOMETOWN: 'HOMETOWN',
  STAY_HOME: 'STAY_HOME',
};

export const CHECKLIST_INFO = {
  DAY_TRIP: {
    title: '一日游清单',
    icon: '☀️',
    color: '#FF6B6B',
    description: '短途出行必备',
  },
  MULTI_DAY: {
    title: '多日游清单',
    icon: '✈️',
    color: '#4ECDC4',
    description: '长途旅行准备',
  },
  HOMETOWN: {
    title: '回老家清单',
    icon: '🏠',
    color: '#95E1D3',
    description: '回家探亲必备',
  },
  STAY_HOME: {
    title: '宅家清单',
    icon: '🎮',
    color: '#F38181',
    description: '居家休闲好物',
  },
};

export const DEFAULT_CHECKLISTS = {
  DAY_TRIP: [
    { id: '1', text: '身份证', completed: false },
    { id: '2', text: '手机充电器', completed: false },
    { id: '3', text: '水杯', completed: false },
    { id: '4', text: '雨伞', completed: false },
    { id: '5', text: '防晒霜', completed: false },
    { id: '6', text: '纸巾', completed: false },
    { id: '7', text: '钱包', completed: false },
    { id: '8', text: '钥匙', completed: false },
  ],
  MULTI_DAY: [
    { id: '1', text: '行李箱', completed: false },
    { id: '2', text: '换洗衣物', completed: false },
    { id: '3', text: '洗漱用品', completed: false },
    { id: '4', text: '充电宝', completed: false },
    { id: '5', text: '相机', completed: false },
    { id: '6', text: '常用药品', completed: false },
    { id: '7', text: '身份证', completed: false },
    { id: '8', text: '手机充电器', completed: false },
  ],
  HOMETOWN: [
    { id: '1', text: '礼物', completed: false },
    { id: '2', text: '特产', completed: false },
    { id: '3', text: '换洗衣物', completed: false },
    { id: '4', text: '充电宝', completed: false },
    { id: '5', text: '身份证', completed: false },
    { id: '6', text: '钥匙', completed: false },
  ],
  STAY_HOME: [
    { id: '1', text: '零食', completed: false },
    { id: '2', text: '饮料', completed: false },
    { id: '3', text: '电影/剧集', completed: false },
    { id: '4', text: '游戏', completed: false },
    { id: '5', text: '书籍', completed: false },
    { id: '6', text: '舒适的家居服', completed: false },
  ],
};
