# 使用Node.js 18作为基础镜像
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /app

# 安装pnpm和vite
RUN npm install -g pnpm vite

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建项目
RUN pnpm run build:prod

# 使用Nginx作为生产环境
FROM nginx:alpine

# 从构建阶段复制构建好的文件到Nginx的HTML目录
COPY --from=builder /app/dist /usr/share/nginx/html


# 暴露80端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]