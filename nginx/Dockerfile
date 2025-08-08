FROM node:18.20.4-alpine as build
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend .
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:1.19.8-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
