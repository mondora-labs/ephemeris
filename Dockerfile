FROM node
WORKDIR /
RUN mkdir /app.documentiq
ADD ./ /app.documentiq/
WORKDIR /app.documentiq
RUN npm install
RUN node_modules/bower/bin/bower install --allow-root
RUN npm run web.prod
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
