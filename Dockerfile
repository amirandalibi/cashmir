FROM node:alpine

WORKDIR /cashmir
RUN chown -R node:node /cashmir
COPY --chown=node:node ./package*.json ./

USER node
RUN npm install

COPY --chown=node:node ./app/index.js ./

EXPOSE 8000
ENTRYPOINT []
CMD ["npx", "nodemon", "index.js"]
