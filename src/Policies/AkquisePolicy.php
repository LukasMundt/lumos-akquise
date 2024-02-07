<?php

namespace Lukasmundt\Akquise\Policies;

use App\Models\Team;
use App\Models\User;
use Lukasmundt\Akquise\Models\Akquise;

class AkquisePolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if (Team::where('id', session()->get("team"))->first()->permissions()->where('name', 'lumos-akquise-basic')->count() < 1) {
            return false;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        setPermissionsTeamId(0);
        $user->unsetRelation('roles');
        $user->unsetRelation('permissions');

        return $user->hasAnyPermission(['lumos-akquise-view-own-projects', 
        'lumos-akquise-view-all-projects']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Akquise $akquise): bool
    {
        setPermissionsTeamId(0);
        $user->unsetRelation('roles');
        $user->unsetRelation('permissions');

        if($user->hasAnyPermission(['lumos-akquise-view-all-projects']))
        {
            return true;
        }
        // prüfen, ob akquise aktuellem benutzer gehört
        else if($user->hasAnyPermission(['lumos-akquise-view-own-projects']))
        {
            return false;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Team $team): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Team $team): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Team $team): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Team $team): bool
    {
        return false;
    }
}
