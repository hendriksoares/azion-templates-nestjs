FROM josebsf/base-script
WORKDIR /usr/src/app

COPY . .

RUN npm i 
RUN npm run build wordpress

CMD ["node", "dist/apps/wordpress/main.js"]