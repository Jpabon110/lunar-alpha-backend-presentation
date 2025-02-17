FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
