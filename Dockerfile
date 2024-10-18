# 使用 Node.js 官方镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

RUN npm build
# 复制项目源代码
COPY . .

# 安装 PM2
RUN npm install pm2 -g

# 启动 PM2 运行应用
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]