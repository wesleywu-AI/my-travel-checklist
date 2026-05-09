# 在手机上运行出游清单应用

## 方法一：使用Android手机（推荐）

### 1. 准备工作
- 一台Android手机（Android 5.0以上）
- USB数据线
- 电脑上已安装Android Studio和Android SDK

### 2. 开启开发者选项
1. 打开手机的 **设置**
2. 找到 **关于手机**
3. 连续点击 **版本号** 7次，直到提示"您已处于开发者模式"
4. 返回设置，找到 **开发者选项**
5. 开启 **USB调试**

### 3. 连接手机
1. 用USB线连接手机和电脑
2. 手机上会弹出"允许USB调试"，点击 **确定**
3. 在终端运行：
   ```bash
   adb devices
   ```
   确认能看到你的设备

### 4. 运行应用
```bash
cd travel-checklist
npx react-native run-android
```

---

## 方法二：使用iPhone（需要Mac电脑）

### 1. 准备工作
- 一台iPhone（iOS 11.0以上）
- Mac电脑
- Apple ID
- Xcode（从App Store安装）

### 2. 安装CocoaPods依赖
```bash
cd travel-checklist/ios
sudo gem install cocoapods  # 如果没安装过
pod install
cd ..
```

### 3. 运行应用
```bash
npx react-native run-ios
```

或者：
1. 用Xcode打开 `travel-checklist/ios/TravelChecklist.xcworkspace`
2. 选择你的iPhone作为目标设备
3. 点击运行按钮（▶️）

---

## 方法三：使用Expo（最简单，推荐新手）

### 1. 安装Expo CLI
```bash
npm install -g expo-cli
```

### 2. 创建Expo版本项目
由于当前项目是React Native CLI版本，我们需要创建一个Expo版本：

```bash
# 在travel-checklist的父目录
npx create-expo-app TravelChecklistExpo --template blank
cd TravelChecklistExpo
```

### 3. 复制代码文件
将以下文件从原项目复制到Expo项目：
- `src/` 整个目录
- `App.tsx` 的内容需要适配Expo

### 4. 安装依赖
```bash
npx expo install @react-navigation/native @react-navigation/stack @react-native-async-storage/async-storage react-native-screens react-native-safe-area-context
```

### 5. 运行应用
```bash
npx expo start
```

### 6. 在手机上查看
1. 在手机上下载 **Expo Go** 应用
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
2. 扫描终端显示的二维码
3. 应用会在Expo Go中打开

---

## 方法四：使用Android模拟器（无需真机）

### 1. 打开Android Studio
2. 点击 **More Actions** → **Virtual Device Manager**
3. 创建一个新的虚拟设备（推荐Pixel 4）
4. 启动模拟器
5. 运行应用：
   ```bash
   npx react-native run-android
   ```

---

## 方法五：使用iOS模拟器（Mac电脑）

### 1. 打开Xcode
2. 菜单栏 → **Xcode** → **Open Developer Tool** → **Simulator**
3. 选择一个iPhone型号
4. 运行应用：
   ```bash
   npx react-native run-ios
   ```

---

## 常见问题解决

### Android问题

**问题1：adb devices看不到设备**
- 确认USB调试已开启
- 尝试更换USB线或USB端口
- 安装手机驱动程序

**问题2：构建失败**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

**问题3：应用闪退**
```bash
adb logcat *:S ReactNative:V ReactNativeJS:V
```
查看错误日志

### iOS问题

**问题1：pod install失败**
```bash
sudo gem install cocoapods
cd ios
pod deintegrate
pod install
```

**问题2：签名问题**
- 在Xcode中选择你的开发团队
- 修改Bundle Identifier

**问题3：Xcode版本太旧**
- 更新Xcode到最新版本

---

## 推荐方案

### 如果你有一台Android手机：
👉 使用 **方法一**（直接连接真机）

### 如果你有一台iPhone和Mac：
👉 使用 **方法二**（直接连接真机）

### 如果你是新手，没有真机：
👉 使用 **方法三**（Expo + Expo Go应用）

### 如果你有Android Studio：
👉 使用 **方法四**（Android模拟器）

---

## 快速测试命令

```bash
# 检查环境
npx react-native doctor

# 检查Android设备
adb devices

# 清理缓存
npx react-native start --reset-cache

# 重新构建
npx react-native run-android --reset-cache
```

---

## 需要帮助？

如果遇到问题，可以：
1. 查看错误日志
2. 运行 `npx react-native doctor` 检查环境
3. 查看React Native官方文档：https://reactnative.dev/docs/environment-setup
