### 项目结构

- src: 源码
- Dockerfile: 部署文件
- Readme.md: 项目说明

### 项目说明

- 项目使用 koa2 搭建，使用 chatgpt4o-mini 模型
- 项目使用 docker 部署

### 本地运行

```bash
npm install
npm run start:dev
```

### 部署

- pm2 管理
  `ecosystem.config.cjs`
- docker 部署
  `Dockerfile`
