import { useState } from 'react';
import { useClientContextProvider } from '../../context/ClientContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const ClientShow = () => {
	const [amount, setAmount] = useState('');
	const {
		data: { currentClient },
		commands: { addTransToClient, getTransByInterval }
	} = useClientContextProvider();

	const showTransactions = () => {
		return (
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>#</th>
						<th>Transaction Date</th>
						<th>Purchase Amount</th>
						<th>Reward</th>
					</tr>
				</thead>
				<tbody>
					{currentClient.transactions.map(trans => (
						<tr key={currentClient.transactions.indexOf(trans) + 1}>
							<td>{currentClient.transactions.indexOf(trans) + 1}</td>
							<td>{trans.transDate.toLocaleString()}</td>
							<td>{trans.purchase}</td>
							<td>{trans.reward}</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	};

	const handleOnChange = e => {
		e.preventDefault(e);
		setAmount(e.target.value);
	};

	const addTransaction = e => {
		e.preventDefault(e);
		addTransToClient(amount);
		setAmount('');
	};

	return (
		<Container className='mt-5 justify-content-start'>
			<Col xs='auto'>
				{currentClient?.clientName && (
					<Form onSubmit={addTransaction}>
						<Form.Group>
							<Row className='justify-content-start'>
								<Form.Label className='px-3'>
									<strong>Create New Transaction</strong>
								</Form.Label>
							</Row>
							<Row className='justify-content-start'>
								<Col xs='auto'>
									<Form.Control
										size='sm'
										className='mb-2'
										placeholder='Enter Amount'
										name='amount'
										onChange={handleOnChange}
										value={amount}
									/>
								</Col>
								<Col xs='auto'>
									<Button
										type='submit'
										variant='warning'
										className='mb-2'
										size='sm'
									>
										Add Transaction
									</Button>
								</Col>
							</Row>
						</Form.Group>
						<Row>
							<h3 className='p-3'>{`${currentClient.clientName}'s Transaction Summary:`}</h3>
						</Row>
						<Row>
							<p className='px-3'>
								Total reward points:{' '}
								<strong>{getTransByInterval(currentClient, 0, 3)}</strong>
							</p>
							<p className='px-3'>
								This Month:{' '}
								<strong>{getTransByInterval(currentClient, 0, 1)}</strong>
							</p>
							<p className='px-3'>
								Last Month:{' '}
								<strong>{getTransByInterval(currentClient, 1, 2)}</strong>
							</p>
							<p className='px-3'>
								2 Months ago:{' '}
								<strong>{getTransByInterval(currentClient, 2, 3)}</strong>
							</p>
						</Row>
					</Form>
				)}
				{currentClient?.transactions?.length > 0
					? showTransactions()
					: currentClient.clientName && (
							<Row className='justify-content-start px-3'>
								No valid transactions at the moment
							</Row>
					  )}
			</Col>
		</Container>
	);
};

export default ClientShow;
