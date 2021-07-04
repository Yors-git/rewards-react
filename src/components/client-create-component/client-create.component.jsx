import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useClientContextProvider } from '../../context/ClientContext';

const ClientCreateForm = () => {
	const {
		data: { userData },
		commands: { storeData, fixCurrentClient }
	} = useClientContextProvider();
	const [client, setClient] = useState({ clientName: '' });

	const handleOnChange = e => {
		e.preventDefault();
		setClient({ [e.target.name]: e.target.value });
	};

	const handleOnSubmit = e => {
		e.preventDefault(e);
		if (userData.find(it => it.clientName === client.clientName)) {
			setClient({ clientName: '' });
			return alert('User already exists, please try another one');
		}
		storeData(client);
		fixCurrentClient(client);
		setClient({ clientName: '' });
	};

	return (
		<Row className='justify-content-md-center p-3'>
			<Form onSubmit={handleOnSubmit}>
				<Form.Group className='align-items-center'>
					<Form.Label>
						<h5>Create New Client</h5>
					</Form.Label>
					<Form.Control
						className='mb-2'
						placeholder='Enter name please'
						onChange={handleOnChange}
						value={client.clientName}
						name='clientName'
					/>
				</Form.Group>
				<Button type='submit' variant='primary' className='mb-2'>
					Create Client
				</Button>
			</Form>
		</Row>
	);
};

export default ClientCreateForm;
