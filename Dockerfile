FROM node:16
LABEL maintainer="Bruno Uemura"
WORKDIR /usr/app
COPY package*.json ./
COPY .env.local .
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
