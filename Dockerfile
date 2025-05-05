# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json yarn.lock* ./
# Если у вас package-lock.json: замените на npm ci
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html   # Vite
# COPY --from=build /app/build /usr/share/nginx/html # CRA — если Create React App
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
