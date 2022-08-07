FROM node:18.7.0

WORKDIR /app
COPY ./package.json ./

COPY ./package-lock.json ./
RUN ls
RUN npm install 
 
COPY . .

EXPOSE 3000

CMD ["npm", "start"]