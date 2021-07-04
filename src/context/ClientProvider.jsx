import { useState } from 'react';
import { ClientContext } from './ClientContext';
import clientData from './client-data.js';

export const ClientContextProvider = ({ children }) => {
	const [userData, setUserData] = useState(clientData);
	const [currentClient, setCurrentClient] = useState({});

	const storeData = name => {
		name['id'] = userData.length + 1;
		name['transactions'] = [];
		setUserData([...userData, name]);
	};

	const getTransByInterval = (clientTrans, higher, lower) => {
		const higherLimitDate = new Date();
		higherLimitDate.setMonth(higherLimitDate.getMonth() - higher);
		const lowerLimitDate = new Date();
		lowerLimitDate.setMonth(lowerLimitDate.getMonth() - lower);
		const interval = clientTrans.transactions.filter(
			rew => rew.transDate > lowerLimitDate && rew.transDate < higherLimitDate
		);
		if (interval.length > 0) {
			const total = interval
				.map(item => item.reward)
				.reduce((prev, next) => prev + next);
			return total;
		} else {
			const total = 0;
			return total;
		}
	};

	const removeOlderTransactions = client => {
		const updatedTransClient = client;
		const higherLimitDate = new Date();
		higherLimitDate.setMonth(higherLimitDate.getMonth() - 0);
		const lowerLimitDate = new Date();
		lowerLimitDate.setMonth(lowerLimitDate.getMonth() - 3);
		const interval = updatedTransClient.transactions.filter(
			rew => rew.transDate > lowerLimitDate && rew.transDate < higherLimitDate
		);
		updatedTransClient.transactions = interval;
	};

	const fixCurrentClient = client => {
		removeOlderTransactions(client);
		setCurrentClient(client);
	};

	function rewards(purchase) {
		let reward;
		if (purchase <= 50) {
			reward = 0;
		} else if (purchase > 50 && purchase <= 100) {
			reward = purchase - 50;
		} else {
			reward = (purchase - 100) * 2 + 50;
		}
		let transDate = new Date();

		return { reward, transDate, purchase };
	}

	const addTransToClient = trans => {
		const transaction = rewards(trans);
		currentClient.transactions.push(transaction);
	};

	const context = {
		data: { userData, currentClient },
		commands: { storeData, fixCurrentClient, addTransToClient, getTransByInterval }
	};
	return (
		<ClientContext.Provider value={context}>{children}</ClientContext.Provider>
	);
};
