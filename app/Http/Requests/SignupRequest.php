<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email', //unique:users(tabela),email(coluna)
            'password' => 
                    [
                    'required',
                    'confirmed',
                    Password::min(8)
                    ->letters()
                    ->symbols()
                    ]
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'O campo :attribute é obrigatório.',
            'email.required' => 'O campo :attribute é obrigatório.',
            'email.unique' => 'Já existe esse :attribute registrado.',
            'password.required' => 'O campo :attribute é obrigatório.',
            'password.confirmed' => 'O campo confirme o :attribute não confere.',
            'email.email' => 'O campo :attribute deve ser um endereço de e-mail válido.',
            'password.letters' => 'O Campo :attribute deve ter uma letra.',
            'password.symbols' => 'O campo :attribute deve ter um caractere especial.',
        ];
    }
}
