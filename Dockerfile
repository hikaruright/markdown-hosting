# Dockerfile for publishing
ARG VARIANT="14-buster"

FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

COPY ./ /app
WORKDIR /app

RUN npm ci
RUN npm run build

# Mount point for external applications
VOLUME ['/app/sites']

EXPOSE 3000

ENTRYPOINT ["node", "/app/dist/app.js"]
