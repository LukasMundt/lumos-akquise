<?php

namespace Lukasmundt\Akquise\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FirstCreateAkquiseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'strasse' => ['required', 'string', 'max:255'],
            // 'hausnummer' => ['required', 'string', 'max:255'],
        ];
    }
}
