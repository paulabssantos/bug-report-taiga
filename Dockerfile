FROM node:18 AS build

WORKDIR /usr/app

COPY package.json ./
RUN yarn

COPY . .

RUN yarn build

FROM node:16-alpine

WORKDIR /usr/app

COPY --from=build /usr/app ./

CMD ["yarn", "start:prod"]
