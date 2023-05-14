import React, { useState, createContext } from 'react';

export const Context = createContext(null);

export default function AppContext({ children }) {
  const [store, setStore] = useState({
    user: [],
    socket: null,
    // ressources: [],
    // buildings: [],
    // infos: [],
    // battles: [],
    // missions: [],
    // researchs: [],
    // spaceships: [],
    // planets: [],
  });

  return <Context.Provider value={{ store, setStore }}>{children}</Context.Provider>;
}
