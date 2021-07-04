import { createContext, useContext } from 'react';

const defaultContext = Object.freeze({});
export const ClientContext = createContext(defaultContext);

export const useClientContextProvider = () => {
	const context = useContext(ClientContext);
	return context;
};
