FROM node
RUN rm -rf /app
RUN mkdir /app
WORKDIR /app
COPY . /app
EXPOSE 3005
CMD [ "node", "app" ]