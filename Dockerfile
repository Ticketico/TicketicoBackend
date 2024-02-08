FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000
ENV POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/TicketManager

CMD ["npm", "run", "dev"]
