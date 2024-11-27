# 使用 Node.js 官方镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目源代码
COPY . .

# 运行构建
RUN npm run build


# 启动 PM2 运行应用
CMD ["npx","pm2-runtime", "ecosystem.config.cjs", "--env", "production"]