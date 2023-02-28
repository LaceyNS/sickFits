import { CartItemCreateInput } from './../.keystone/schema-types';
import { OrderCreateInput } from '../.keystone/schema-types';
/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';

const graphql = String.raw;

interface Arguments {
    token: string
}

async function checkout(
  root: any,
  { token }: Arguments, 
  context: KeystoneContext
): Promise<OrderCreateInput> {
    //1. make sure they are signed in
    const userId = context.session.itemId;
    if(!userId) {
        throw new Error(`Sorry! You must be signed in to create an order!`)
    }
    //Query the current user
    const user = await context.lists.User.findOne({
        where: { id: userId},
        resolveFields: graphql`
        id
        name
        email
        cart{
            id
            quantity
            product {
                name
                price
                description
                id
                photo {
                    id
                    publicUrlTransformed
                }
            }
        }`
    });
    console.dir(user, {depth: null})
    //2. calculate the total price for their cart
    const cartItems = user.cart.filter(cartItem => cartItem.product);
    const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput) {
        return tally + cartItem.quantity * cartItem.product.price;
    }, 0)
    console.log(amount);
    //3. create the payment withthe stripe library
    //4. convert the cartItems to OrderItems
    //5. create the order and return it
  
}

export default checkout;