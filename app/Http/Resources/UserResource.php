<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false; //remove dados de agrupamento padrão, deixaando o envio somente dos dados solicitados na requisição. Ou seja, remove, data.data
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    //serve para serializar os dados do servidor para o frontend no formato json
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
