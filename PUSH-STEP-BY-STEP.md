# 🚀 推送代码到GitHub - 完整指南

## 当前状态

✅ Git仓库已配置
✅ 远程仓库已添加：https://github.com/wesleywu-AI/travel-checklist.git
✅ 代码已提交（73个文件）
⏳ 需要GitHub认证才能推送

---

## 第一步：创建GitHub仓库

### 1. 访问GitHub创建仓库页面
打开浏览器，访问：**https://github.com/new**

### 2. 填写仓库信息
- **Repository name**: `travel-checklist`
- **Description**: `出游清单备忘录应用 - React Native`
- **选择 Public**（公开仓库）
- **❌ 不要勾选任何初始化选项**：
  - 不要勾选 "Add a README file"
  - 不要勾选 "Add .gitignore"
  - 不要选择 License
- 点击 **"Create repository"** 按钮

### 3. 仓库创建成功
创建后，你的仓库地址是：
```
https://github.com/wesleywu-AI/travel-checklist
```

---

## 第二步：推送代码（需要认证）

### 方法A：使用Personal Access Token（推荐）

#### 1. 创建Personal Access Token
1. 访问：**https://github.com/settings/tokens**
2. 点击 **"Generate new token (classic)"**
3. 设置：
   - **Note**: `travel-checklist-push`
   - **Expiration**: `No expiration` 或选择一个时间段
   - **勾选权限**: `repo`（勾选整个repo部分）
4. 点击 **"Generate token"**
5. **⚠️ 立即复制token**（只显示一次，无法再次查看）

#### 2. 在终端推送代码
打开终端（Terminal），运行：

```bash
cd /Users/wesley/travel-checklist
git push -u origin main
```

当提示输入用户名和密码时：
- **Username**: 输入 `wesleywu-AI`
- **Password**: 粘贴你的Personal Access Token（不是GitHub密码）

---

### 方法B：使用SSH密钥

#### 1. 生成SSH密钥
```bash
ssh-keygen -t ed25519 -C "wesleywu637@gmail.com"
# 按Enter使用默认路径
# 可以设置密码或直接按Enter跳过
```

#### 2. 查看并复制公钥
```bash
cat ~/.ssh/id_ed25519.pub
# 复制输出的全部内容
```

#### 3. 添加SSH密钥到GitHub
1. 访问：**https://github.com/settings/ssh/new**
2. **Title**: `MacBook`
3. **Key**: 粘贴刚才复制的公钥内容
4. 点击 **"Add SSH key"**

#### 4. 更改远程仓库地址为SSH
```bash
cd /Users/wesley/travel-checklist
git remote set-url origin git@github.com:wesleywu-AI/travel-checklist.git
git push -u origin main
```

---

### 方法C：使用GitHub Desktop（最简单）

#### 1. 下载GitHub Desktop
访问：**https://desktop.github.com/** 并安装

#### 2. 登录GitHub账号
- 打开GitHub Desktop
- File → Options → Accounts → Sign in
- 使用浏览器登录你的GitHub账号

#### 3. 添加本地仓库
- File → Add Local Repository
- 选择路径：`/Users/wesley/travel-checklist`
- 点击 "Add repository"

#### 4. 发布仓库
- 点击 "Publish repository"
- Repository name: `travel-checklist`
- **取消勾选** "Keep this code private"
- 点击 "Publish repository"

---

## 第三步：等待自动构建APK

### 1. 推送成功后
访问你的仓库：**https://github.com/wesleywu-AI/travel-checklist**

### 2. 查看构建进度
- 点击顶部的 **"Actions"** 标签
- 你会看到正在运行的任务：**"Build Android APK"**
- 点击任务查看详细进度

### 3. 等待时间
- 通常需要 **5-10分钟**
- 构建过程会显示：
  - ✓ Checkout code
  - ✓ Setup Node.js
  - ✓ Setup Java
  - ✓ Install dependencies
  - ✓ Build Debug APK
  - ✓ Build Release APK

---

## 第四步：下载APK安装包

### 1. 构建完成后
- 在Actions页面，点击已完成的构建任务
- 滚动到页面底部 **"Artifacts"** 部分

### 2. 下载APK文件
你会看到两个文件：
- **TravelChecklist-Debug** - 调试版APK（推荐）
- **TravelChecklist-Release** - 正式版APK

点击下载，会下载一个ZIP压缩包

### 3. 解压APK
- 解压下载的ZIP文件
- 得到 `app-debug.apk` 或 `app-release.apk`

---

## 第五步：安装APK到手机

### 传输APK到手机
选择以下任一方式：

1. **USB传输**
   - 用USB线连接手机和电脑
   - 将APK复制到手机存储

2. **邮件传输**
   - 发送APK到你的邮箱
   - 在手机上下载

3. **微信/QQ传输**
   - 通过文件传输助手发送

4. **云盘传输**
   - 上传到百度网盘/iCloud
   - 在手机上下载

### 安装APK
1. 在手机上打开APK文件
2. 允许"安装未知来源应用"
3. 点击"安装"
4. 安装完成后点击"打开"

---

## 🎯 快速命令总结

```bash
# 1. 进入项目目录
cd /Users/wesley/travel-checklist

# 2. 推送代码（使用Token认证）
git push -u origin main
# Username: wesleywu-AI
# Password: [粘贴你的Personal Access Token]

# 3. 访问Actions页面查看构建
# https://github.com/wesleywu-AI/travel-checklist/actions

# 4. 下载APK并安装到手机
```

---

## 💡 推荐顺序

**最简单**：方法C（GitHub Desktop）
- 图形界面，无需命令行
- 自动处理认证
- 一键推送

**最快速**：方法A（Personal Access Token）
- 只需创建一次token
- 推送时粘贴token即可

**最安全**：方法B（SSH密钥）
- 无需每次输入密码
- 更安全可靠

---

## 📞 需要帮助？

如果遇到问题：
1. 告诉我具体的错误信息
2. 我会提供解决方案

**现在开始第一步：创建GitHub仓库！**
访问：https://github.com/new