## React Sample Docker

### Clone Project
```bash
git clone https://github.com/jutionck/react-sample-docker.git
```
## Nginx
### Configuration
Buka file `default.conf` ini merupakan file nginx configuration untuk melakuakn `reverse proxy`.
```
upstream todoapp {
  server       todo-be:8080;
}
server {
    listen       80;
    server_name  _;

    location / {
	root /usr/share/nginx/html;
    }
    location /todos {
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
            proxy_pass http://todoapp/v1/api;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```
## Docker
### Dockerfile
```
FROM node:lts-alpine3.15 as build-env

WORKDIR /src

COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-env /src/build/ /usr/share/nginx/html/
```

### Docker Build
```bash
docker build -t todo-app-fe . 
```

### Docker Run
- Sebelum dijalankan pastikan `BE` sudah berjalan, untuk `BE` bisa klik link berikut https://github.com/jutionck/spring-sample-docker/tree/4-rest-api silahkan clone dan ikuti sesuai `README.md`.
- Pastikan berjalan untuk memastikan coba cek `docker ps -a`
    ```bash
    CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS                  PORTS                    NAMES
    ff99d144650d   todo-app-be           "java -jar /spring-s…"   5 minutes ago   Up 5 minutes            0.0.0.0:8080->8080/tcp   todo-be
    7a8d27d2adb0   postgres:alpine3.17   "docker-entrypoint.s…"   5 minutes ago   Up 5 minutes            5432/tcp                 todo-db
    
    ```
- Jika sudah makan bisa melanjutkan untuk menjalankan `FE` dengan perintah berikut.
    ```bash
    docker run --network=spring-sample-docker_todo-network --name todo-fe -p 3000:80 --rm todo-app-fe
    ```
Catatan:
- Kita harus menghubungkan dengan `network` yang sudah dibuat sebelum untuk `BE` agar mereka saling berkomunikasi.
- Network disini adalah `spring-sample-docker_todo-network` (jangan sampai ini tidak disertakan).