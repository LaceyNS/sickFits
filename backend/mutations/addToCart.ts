import { CartItem } from './../schemas/CartItem';
import { CartItemCreateInput } from './../.keystone/schema-types';
import { KeystoneContext } from "@keystone-next/types";

async function addToCart(
    root: any, { productId }: { productId: string}, 
    context: KeystoneContext): promise<CartItemCreateInput> {
    console.log('ADDING TO CART');
    // 1. query the current user, see if signed in
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }
    // 2. query the current users cart
    const allCartItems = await context.lists.CartItem.findMany({ where: { user: {id: sesh.itemId}, product: { id: productId}}});
    // 3. see if the current item is in their cart
    // 4. a. if it is, increment by 1
    // 4. b. if it isnt, create a new cart item
}

export default addToCart;