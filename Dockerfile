FROM keymetrics/pm2:latest-alpine

COPY . /opt/slack

WORKDIR /opt/slack

RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "src/index.js"]