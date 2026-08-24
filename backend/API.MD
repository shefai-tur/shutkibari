Login
POST http://localhost:5000/api/auth/login
{
"email": "customer@test.com",
"password": "12345678"
}

POST http://localhost:5000/api/auth/register

{
"name": "Test Customer",
"email": "customer@test.com",
"password": "12345678"
}

POST http://localhost:5000/api/auth/logout

GET http://localhost:5000/api/auth/me

Google Login
http://localhost:5000/api/auth/google

Google Cloud Redirect URI
http://localhost:5000/api/auth/google/callback
