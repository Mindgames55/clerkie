'use client'
import { createContext, useReducer } from 'react';

export const FriendsContext = createContext(null);
export const FriendsDispatchContext = createContext(null);

export function FriendsProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    friendsReducer,
    []
  );

  return (
    <FriendsContext.Provider value={tasks}>
      <FriendsDispatchContext.Provider value={dispatch}>
        {children}
      </FriendsDispatchContext.Provider>
    </FriendsContext.Provider>
  );
}

function friendsReducer(friends, action) {
  switch (action.type) {
    case 'add': {
      return [...friends, ...action.friends];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
