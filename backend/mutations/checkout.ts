import { CartItem } from './../schemas/CartItem';
import { Product } from './../schemas/Product';
import { products } from './../seed-data/data';
import { CartItemCreateInput } from './../.keystone/schema-types';
import { OrderCreateInput } from '../.keystone/schema-types';
/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import stripeConfig from '../lib/stripe';

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
    //3. create the charge withthe stripe library
    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token,
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    });
    console.log(charge);
    //4. convert the cartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
        const orderItem = {
            name: cartItem.product.name,
            description: cartItem.product.description,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            photo: { connect: { id: cartItem.product.photo.id}},
        }
        return orderItem;
    })
    //5. create the order and return it
    const order = await context.lists.Order.createOne({
        data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: userId }}
        }
    })
  //6. clean up any old cart items
  const CartItemIds= cartItems.map(cartItem => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: CartItemIds
  });
  return order;
}

export default checkout;