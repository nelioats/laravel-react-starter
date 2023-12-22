<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
           
            'email' => 'required|email|exists:users,email', //unique:users(tabela),email(coluna)
            'password' => 'required'
        ];
    }
    public function messages()
    {
        return [
          
            'email.required' => 'O campo :attribute é obrigatório.',
            'email.email' => 'O :attribute não é válido.',
            'email.exists' => 'Não foi encontrado :attribute informado.',
            'password.required' => 'O campo :attribute é obrigatório.',
            'email.email' => 'O campo :attribute deve ser um endereço de e-mail válido.',
        ];
    }
}
