import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, //tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      //Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      //Check if we have existing cache
      const items = existing.slice(skip, skip + first).filter((x) => x);
      //IF
      //There are items
      //AND there aren't enough items to satisfy how many were requested
      //AND we are on the last page
      //THEN JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        //we don't have any items, we must go to the network to fetch them
        return false;
      }
      //If there are items, just return them from the cache and we don't need to go to the network
      if (items.length) {
        return items;
      }

      return false; //fallback to network just in case

      //First thing it does is ask the read function for those items
      //We can either do one of two things:
      //First thing we can do is return the items because they are already in the cache
      //The other thing we can do is to return false from here (make a network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      //This runs when the Apollo client comes back from the network with our products
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      //Finally we return the merged items from teh cache
      return merged;
    },
  };
}
