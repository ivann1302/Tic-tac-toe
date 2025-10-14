# Базовый образ с Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем простой веб-сервер
RUN npm install -g serve

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000"]
