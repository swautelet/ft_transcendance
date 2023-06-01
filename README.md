# ft_transcendance

## Usage -- 👈

first you need to install docker on you machine
Then you need to set a .env with tsome variable required by the project like this 
```bash
# Database Environment Variables
POSTGRES_USERNAME=myUsername
POSTGRES_PASSWORD=myPassword
POSTGRES_DB_NAME=myDatabase

PGADMIN_DEFAULT_EMAIL=test@email.com
PGADMIN_DEFAULT_PASSWORD=emailmdp

# OAuth2 Environment Variables
CLIENT_ID="cant give it on github"
CLIENT_SECRET="cant give on github"

JWT_SECRET=your_secret_key_here
TWOFA_SECRET=your_2fa_secret_key_here
```

```bash
git clone https://github.com/swautelet/ft_transcendance.git && cd ft_transcendance && make
```

## Topics -- 🗝
- Docker
- Typescipt
- React
- NestJS
- PostgreSQL

## Challenge -- 💡

this project is a website for playing pong. it runs on docker with 3 container one for the frontend in react one for the backend in NestJS and one for the database with PostgreSQL.
there is a system of chat, a leaderboard and private or public games. you can choose if you activate bonus or not. the visuals is still in work for some details as the apparence of bonus. 
