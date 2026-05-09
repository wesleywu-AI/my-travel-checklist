# 🚀 推送代码到GitHub并获取APK

## 当前状态

✅ Git已配置用户信息：
- Email: wesleywu637@gmail.com
- Name: Wesley Wu

✅ 代码已提交到本地仓库

---

## 第一步：创建GitHub仓库

### 方法A：使用GitHub网页（推荐）

1. **访问GitHub创建仓库页面**
   - 打开浏览器，访问：https://github.com/new
   - 如果未登录，先登录你的GitHub账号
   - （如果还没有账号，需要先注册：https://github.com/signup）

2. **填写仓库信息**
   - Repository name: `travel-checklist`
   - Description: `出游清单备忘录应用 - React Native`
   - 选择 **Public**（公开仓库）
   - ❌ 不要勾选 "Add a README file"（我们已经有README了）
   - ❌ 不要勾选 "Add .gitignore"（我们已经有了）
   - ❌ 不要选择 License（不需要）
   - 点击 **"Create repository"** 按钮

3. **记录仓库地址**
   创建完成后，你会看到仓库地址，类似：
   ```
   https://github.com/你的用户名/travel-checklist.git
   ```

---

## 第二步：推送代码到GitHub

在终端运行以下命令：

```bash
# 进入项目目录
cd /Users/wesley/travel-checklist

# 添加远程仓库（替换下面的用户名为你的GitHub用户名）
git remote add origin https://github.com/你的GitHub用户名/travel-checklist.git

# 推送代码到GitHub
git push -u origin main
```

**示例**（如果你的GitHub用户名是 wesleywu）：
```bash
git remote add origin https://github.com/wesleywu/travel-checklist.git
git push -u origin main
```

---

## 第三步：等待自动构建APK

1. **访问你的仓库**
   ```
   https://github.com/你的用户名/travel-checklist
   ```

2. **查看构建进度**
   - 点击仓库顶部的 **"Actions"** 标签
   - 你会看到一个正在运行的任务：**"Build Android APK"**
   - 点击这个任务查看详细进度

3. **等待构建完成**
   - 通常需要 5-10 分钟
   - 构建过程会显示：
     - ✓ Checkout code
     - ✓ Setup Node.js
     - ✓ Setup Java
     - ✓ Install dependencies
     - ✓ Build Debug APK
     - ✓ Build Release APK

---

## 第四步：下载APK安装包

1. **在Actions页面**
   - 点击已完成的构建任务
   - 滚动到页面底部 **"Artifacts"** 部分

2. **下载APK文件**
   你会看到两个文件：
   - **TravelChecklist-Debug** - 调试版APK（推荐下载）
   - **TravelChecklist-Release** - 正式版APK

3. **解压文件**
   - 下载的是ZIP压缩包
   - 解压后得到 `app-debug.apk` 或 `app-release.apk`

---

## 第五步：安装APK到手机

### 方法1：USB传输
1. 用USB线连接手机和电脑
2. 将APK文件复制到手机存储
3. 在手机上打开APK文件安装

### 方法2：邮件传输
1. 将APK文件发送到你的邮箱
2. 在手机上打开邮件
3. 下载并安装APK

### 方法3：微信/QQ传输
1. 通过微信/QQ文件传输助手发送APK
2. 在手机上接收并安装

### 方法4：云盘传输
1. 上传APK到百度网盘/iCloud等
2. 在手机上下载并安装

---

## 安装注意事项

### Android手机设置
1. **允许安装未知来源应用**
   - 设置 → 安全 → 未知来源 → 开启
   - 或在安装时点击"设置" → 允许

2. **安装步骤**
   - 打开APK文件
   - 点击"安装"
   - 等待安装完成
   - 点击"打开"运行应用

---

## 🎯 快速命令总结

```bash
# 1. 进入项目目录
cd /Users/wesley/travel-checklist

# 2. 添加远程仓库（替换用户名）
git remote add origin https://github.com/你的用户名/travel-checklist.git

# 3. 推送代码
git push -u origin main

# 4. 等待5-10分钟后，访问：
https://github.com/你的用户名/travel-checklist/actions

# 5. 下载APK并安装到手机
```

---

## 💡 提示

- **GitHub用户名**：你的GitHub账号用户名（不是邮箱）
- **首次推送**：可能需要输入GitHub用户名和密码
- **构建时间**：首次构建需要5-10分钟
- **免费服务**：GitHub Actions对公开仓库完全免费

---

## 🔧 如果遇到问题

### 问题1：推送失败
```bash
# 检查远程仓库
git remote -v

# 如果添加错误，删除重新添加
git remote remove origin
git remote add origin https://github.com/正确的用户名/travel-checklist.git
```

### 问题2：需要GitHub认证
- 使用GitHub Personal Access Token
- 或使用SSH密钥

### 问题3：构建失败
- 查看Actions日志
- 检查错误信息
- 修复后重新推送

---

## 📞 需要帮助？

告诉我你的GitHub用户名，我可以帮你：
1. 准备推送命令
2. 解决推送过程中的问题
3. 指导下载和安装APK

---

**准备好了吗？告诉我你的GitHub用户名，我们开始推送代码！**