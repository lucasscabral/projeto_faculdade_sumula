FROM node               

WORKDIR /usr/src         

COPY . .                 

EXPOSE 5001

RUN npm i 

CMD ["npm","run","dev:docker"]