<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//php artisan migrate  sqlite
//npm create vite@latest
//cd pasta react (laravevlfront)
//npm install
//npm install react-router-dom -S
//50:48
//59:51 - axios, requisicao com servidor
//npm install -S axios
//1:05:53
//1:16:37 iniciando backend
//php artisan make:controller Api/AuthController
//php artisan make:request LoginRequest
//php artisan make:request SignupRequest
//routes/api.php
//1:42:46
//php artisan make:controller Api/UserController --model=User --resource --requests --api
//1:52:33
//php artisan make:resource UserResource
//2:03:33 - usando seeders
//php artisan db:seed
//2:32:31
//2:38:50
//npm run build - para transformar o "executavel react"
//2:00:00 hospedando na hostinger
//2:50:00 - ssh laravel
//2:53:00 - criando subdominio