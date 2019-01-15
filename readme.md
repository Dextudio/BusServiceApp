# Installation

Clone the repository and run the following commands

```
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Create db user and database with `GRANT` access for him.

Fill `.env` fields described below to set up db connection.

```
DB_CONNECTION=mysql
DB_HOST=<ip or domain name>
DB_PORT=<port>
DB_DATABASE=<db name>
DB_USERNAME=<user name>
DB_PASSWORD=<user password>
```

Apply migrations and run seeds.

```
php artisan migrate
php artisan db:seed
```

Install react dependencies and compile js and css.

```
npm install && npm run dev
```

Create virtual host on your web server and set up his root directory to `public` folder inside folder with repo.