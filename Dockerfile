FROM node:14.15.3-alpine

ENV NODE_ENV=production
ENV PORT=8080

RUN mkdir /service
WORKDIR /service

COPY package.json package-lock.json ./
RUN npm i npm -g
RUN npm ci --production

COPY . /service

CMD ["npm", "start"]
