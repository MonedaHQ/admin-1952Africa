import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueriesData('user');

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('UserContext was used outside of MenuToggleProvider');
  return context;
}

export { UserProvider, useUser };
