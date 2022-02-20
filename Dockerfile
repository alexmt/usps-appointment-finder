FROM node:16

WORKDIR /src

ADD ["package.json", "yarn.lock", "./"]
RUN yarn install --network-timeout 100000
ADD main.js .
ENTRYPOINT [ "sh", "-c", "node main.js $ZIP" ]