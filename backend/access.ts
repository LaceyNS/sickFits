import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
//At it's simplest, the access control returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs){
    return !!session;
}

const generatedPermissions = Object.fromEntries(permissionsList.map((permission) => [
    permission,
    function({session}: ListAccessArgs) {
        return !!session?.data.role?.[permission]
    }
]));

//Permissions check if someone meets a crriteria - yes or no
export const permissions = {
    ...generatedPermissions,
    isAwesome({ session }: ListAccessArgs): boolean {
        return session?.data.name.includes('Lacey');
    },
};

//Rule based functions
//Rules can retun a boolean or a filter that limits which products they can CRUD

export const rules = {
    canManageProducts({session}: ListAccessArgs) {

        //1. Do they have the permission of canManageProducts
        if(permissions.canManageProducts({session})) {
            return true;
        }
        //2. If not, do they own this item?
        return { user: {id:session.itemId}};
        
    },
    canOrder({session}: ListAccessArgs) {

        //1. Do they have the permission of canManageCart
        if(permissions.canManageCart({session})) {
            return true;
        }
        //2. If not, do they own this item?
        return { user: {id:session.itemId}};
        
    },

    canReadProducts({session}: ListAccessArgs) {
        if(permissions.canManageProducts({session})) {
            return true //They can read everything
        }
        //They should only see available products based on the status field
        return { status: 'AVAILABLE'}
    }
};