FROM node:20
WORKDIR /miniFilom_Frontend
COPY package*.json /miniFilom_Frontend/
COPY . /miniFilom_Frontend/
RUN npm install
EXPOSE 3030
CMD [ "npm", "run", "dev" ]