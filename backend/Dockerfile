# Используем Debian-based образ
FROM node:20-bullseye

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код
COPY . .

# Генерация Prisma клиента
RUN npx prisma generate

# Экспонируем порт
EXPOSE 4000

# Команда запуска
CMD ["npm", "run", "dev"]