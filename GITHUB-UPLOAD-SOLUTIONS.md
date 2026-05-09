# GitHub上传解决方案

## 问题：一次性上传太多文件

GitHub网页版有以下限制：
- 单次最多上传100个文件
- 单个文件最大25MB
- 总大小限制

---

## 🎯 解决方案一：使用Git命令行（推荐）

Git命令行没有文件数量限制，可以一次性推送所有文件。

### 步骤：

```bash
# 1. 进入项目目录
cd /Users/wesley/travel-checklist

# 2. 检查Git状态
git status

# 3. 添加远程仓库（替换你的GitHub用户名）
git remote add origin https://github.com/你的用户名/travel-checklist.git

# 4. 推送代码
git push -u origin main
```

### 如果需要GitHub认证：

**方法A：使用Personal Access Token**
1. 访问：https://github.com/settings/tokens
2. Generate new token (classic)
3. 勾选 `repo` 权限
4. 生成token并复制
5. 推送时输入：
   - Username: 你的GitHub用户名
   - Password: 粘贴token（不是GitHub密码）

**方法B：使用SSH**
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "wesleywu637@gmail.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 复制公钥到GitHub：Settings → SSH and GPG keys → New SSH key

# 使用SSH地址推送
git remote set-url origin git@github.com:你的用户名/travel-checklist.git
git push -u origin main
```

---

## 🎯 解决方案二：删除node_modules后上传

node_modules文件夹包含大量文件，可以删除后上传。

### 步骤：

```bash
# 1. 进入项目目录
cd /Users/wesley/travel-checklist

# 2. 删除node_modules（已在.gitignore中，不会影响项目）
rm -rf node_modules

# 3. 查看剩余文件数量
find . -type f | wc -l

# 4. 现在文件数量大大减少，可以上传了
```

### 上传方法：

**使用GitHub网页版：**
1. 访问：https://github.com/new
2. 创建仓库 `travel-checklist`
3. 点击 "uploading an existing file"
4. 拖拽所有文件（除了node_modules）
5. 点击 "Commit changes"

**注意：** node_modules已在.gitignore中，GitHub Actions会自动安装依赖。

---

## 🎯 解决方案三：使用GitHub Desktop（图形界面）

### 步骤：

1. **下载GitHub Desktop**
   - https://desktop.github.com/

2. **添加本地仓库**
   - File → Add Local Repository
   - 选择 `/Users/wesley/travel-checklist`

3. **发布仓库**
   - 点击 "Publish repository"
   - Repository name: `travel-checklist`
   - 取消勾选 "Keep this code private"
   - 点击 "Publish repository"

---

## 🎯 解决方案四：分批上传

如果坚持使用网页版，可以分批上传：

### 第一批：核心配置文件
```
package.json
package-lock.json
App.tsx
index.js
babel.config.js
metro.config.js
tsconfig.json
app.json
README.md
```

### 第二批：源代码
```
src/ 整个文件夹
```

### 第三批：Android项目
```
android/ 整个文件夹
```

### 第四批：iOS项目
```
ios/ 整个文件夹
```

### 第五批：GitHub配置
```
.github/ 整个文件夹
```

---

## 💡 推荐方案

**最简单：使用Git命令行**
```bash
cd /Users/wesley/travel-checklist
git remote add origin https://github.com/你的用户名/travel-checklist.git
git push -u origin main
```

**最方便：使用GitHub Desktop**
- 图形界面，无需命令行
- 自动处理认证
- 一键推送

**最快速：删除node_modules后上传**
```bash
rm -rf node_modules
# 然后使用网页版上传
```

---

## 📊 当前项目文件统计

让我帮你检查一下：

```bash
# 查看文件总数
find . -type f | wc -l

# 查看node_modules文件数
find node_modules -type f | wc -l

# 查看项目大小
du -sh .
```

---

## 🚀 立即执行（推荐）

```bash
# 1. 进入项目目录
cd /Users/wesley/travel-checklist

# 2. 查看当前状态
git status

# 3. 添加远程仓库
git remote add origin https://github.com/你的用户名/travel-checklist.git

# 4. 推送代码
git push -u origin main
```

---

## 📞 需要帮助？

告诉我：
1. 你的GitHub用户名
2. 遇到的具体错误信息

我会提供详细的解决方案！
