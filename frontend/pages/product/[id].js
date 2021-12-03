import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "61a915a860f2650cfbbfc8ce" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  console.log({ data, loading, error });
  return <p>Hey Im a single product {query.id}</p>;
}
