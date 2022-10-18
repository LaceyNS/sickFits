import { createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  //This is our own custom provider! We will store data (state) and functionality (updateres) in here and anyone can access it via the consumer!
  const cartOpen = true;

  return (
    <LocalStateProvider value={{ cartOpen }}>{children}</LocalStateProvider>
  );
}
export { CartStateProvider };
