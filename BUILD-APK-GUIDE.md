# 生成Android APK安装包指南

## 方案一：在Mac上生成APK（推荐）

### 1. 安装Java JDK
```bash
# 使用Homebrew安装
brew install openjdk@17

# 配置Java环境
sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

### 2. 配置Android SDK
确保已安装Android Studio和Android SDK

### 3. 生成APK
```bash
cd travel-checklist/android

# 生成调试版APK（简单快速）
./gradlew assembleDebug

# APK位置
# android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. 生成正式版APK（需要签名）
```bash
# 生成签名密钥
keytool -genkeypair -v -storetype PKCS12 -keystore travel-checklist.keystore -alias travel-checklist -keyalg RSA -keysize 2048 -validity 10000

# 配置签名信息
# 编辑 android/app/build.gradle，添加：
android {
    ...
    signingConfigs {
        release {
            storeFile file('../../travel-checklist.keystore')
            storePassword 'your_password'
            keyAlias 'travel-checklist'
            keyPassword 'your_password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}

# 生成正式版APK
./gradlew assembleRelease

# APK位置
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 方案二：使用在线构建服务（无需配置环境）

### 使用Expo Application Services (EAS)

1. **安装EAS CLI**
```bash
npm install -g eas-cli
```

2. **登录Expo账号**
```bash
eas login
```
（如果没有账号，需要先注册：https://expo.dev）

3. **配置项目**
```bash
# 在travel-checklist目录
eas build:configure
```

4. **构建APK**
```bash
eas build --platform android --profile preview
```

5. **下载APK**
构建完成后，会提供下载链接

---

## 方案三：使用GitHub Actions自动构建

### 1. 创建GitHub仓库
```bash
cd travel-checklist
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/travel-checklist.git
git push -u origin main
```

### 2. 创建 `.github/workflows/build-apk.yml`
```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Setup Java
      uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Install dependencies
      run: npm install

    - name: Build APK
      run: |
        cd android
        chmod +x gradlew
        ./gradlew assembleDebug

    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-debug
        path: android/app/build/outputs/apk/debug/app-debug.apk
```

### 3. 推送代码
```bash
git add .
git commit -m "Add GitHub Actions"
git push
```

### 4. 下载APK
- 访问GitHub仓库
- 点击 "Actions" 标签
- 选择最新的构建
- 下载生成的APK文件

---

## 方案四：使用React Native在线构建平台

### 使用Bitrise、CircleCI或Codemagic

这些平台提供免费额度，可以在线构建APK：

1. **Bitrise** (https://www.bitrise.io)
   - 免费额度：每月200分钟
   - 支持React Native项目

2. **Codemagic** (https://codemagic.io)
   - 专门为移动应用设计
   - 提供免费额度

3. **CircleCI** (https://circleci.com)
   - 免费额度：每月6000分钟

---

## 推荐方案

### 如果你不想配置环境：
👉 使用 **方案二**（EAS在线构建）或 **方案三**（GitHub Actions）

### 如果你想快速生成：
👉 使用 **方案一**，先安装Java，然后运行 `./gradlew assembleDebug`

---

## 我可以帮你做什么？

1. **安装Java并生成APK**（如果你想在本地构建）
2. **配置GitHub Actions**（自动在线构建）
3. **创建Expo版本**（使用EAS构建）

请告诉我你想用哪种方式，我会提供详细的步骤指导！

---

## APK文件位置

生成后的APK文件位于：
- **调试版**：`android/app/build/outputs/apk/debug/app-debug.apk`
- **正式版**：`android/app/build/outputs/apk/release/app-release.apk`

## 安装APK到手机

1. 将APK文件传输到手机（通过USB、邮件、云盘等）
2. 在手机上打开APK文件
3. 允许"安装未知来源应用"
4. 点击"安装"
