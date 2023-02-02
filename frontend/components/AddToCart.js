const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;
export default function AddToCart({ id }) {
  return <button type="button">Add To Cart 🛒</button>;
}
