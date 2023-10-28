FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM node:20-alpine

WORKDIR /app
COPY --from=build /app .

ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
CMD ["node", "build"]
