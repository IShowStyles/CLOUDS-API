
## Installation



Requirements Node.js 18 or newest

# install packages


run database by docker

```bash
docker-compose up -d
```

Backend - API


```bash
cd api && npm i && npx prisma migrate prod --name init 
```

Front-end - Client part

```bash
cd client && npm i 
```


