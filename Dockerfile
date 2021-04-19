# Dockerfile for publishing
# ARG VARIANT="14-buster"
FROM node:14.16.1-alpine3.10

COPY ./ /app
WORKDIR /app

RUN npm ci
RUN npm run build

# Mount point for external applications
VOLUME ['/app/sites']

EXPOSE 3000

ENTRYPOINT ["node", "/app/dist/app.js"]
