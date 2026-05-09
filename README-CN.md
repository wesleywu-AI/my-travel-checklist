# 出游清单备忘录应用

一个基于React Native开发的出游清单手机备忘录应用，帮助您轻松准备每一次出行。

## 功能特点

- **四种清单类型**：
  - ☀️ 一日游清单 - 短途出行必备
  - ✈️ 多日游清单 - 长途旅行准备
  - 🏠 回老家清单 - 回家探亲必备
  - 🎮 宅家清单 - 居家休闲好物

- **清单项管理**：
  - 添加自定义清单项
  - 编辑清单项内容
  - 删除清单项
  - 勾选完成状态

- **数据持久化**：使用AsyncStorage本地保存所有数据
- **进度显示**：显示每个清单的完成进度

## 技术栈

- React Native 0.85.3
- React Navigation (导航)
- AsyncStorage (本地存储)
- React Hooks (状态管理)

## 安装和运行

### 前置要求

- Node.js (>= 12)
- npm 或 yarn
- React Native CLI
- Android Studio (Android开发) 或 Xcode (iOS开发)

### 安装依赖

```bash
npm install
```

### 运行应用

#### Android

```bash
npx react-native run-android
```

#### iOS

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

## 项目结构

```
travel-checklist/
├── App.tsx                 # 应用入口
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # 主页（清单类型选择）
│   │   └── ChecklistScreen.js  # 清单详情页
│   ├── components/
│   │   ├── ChecklistItem.js    # 清单项组件
│   │   └── AddItemModal.js     # 添加/编辑项模态框
│   ├── utils/
│   │   └── storage.js          # AsyncStorage工具函数
│   └── constants/
│       └── checklistData.js    # 预设清单数据
```

## 使用说明

1. **主页**：显示四种清单类型卡片，点击进入对应清单
2. **清单详情页**：
   - 点击清单项可勾选完成状态
   - 长按清单项可编辑或删除
   - 点击底部按钮添加新清单项
3. **进度显示**：每个清单卡片和详情页都显示完成进度

## 预设清单项

### 一日游清单
- 身份证、手机充电器、水杯、雨伞、防晒霜、纸巾、钱包、钥匙

### 多日游清单
- 行李箱、换洗衣物、洗漱用品、充电宝、相机、常用药品、身份证、手机充电器

### 回老家清单
- 礼物、特产、换洗衣物、充电宝、身份证、钥匙

### 宅家清单
- 零食、饮料、电影/剧集、游戏、书籍、舒适的家居服

## 开发说明

- 所有数据存储在本地，无需网络连接
- 支持自定义添加、编辑、删除清单项
- 数据在应用关闭后仍然保留

## 许可证

MIT
