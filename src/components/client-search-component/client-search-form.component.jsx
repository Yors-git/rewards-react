import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useClientContextProvider } from '../../context/ClientContext';

const ClientSearchForm = () => {
	const {
		data: { userData },
		commands: { fixCurrentClient }
	} = useClientContextProvider();
	const [client, setClient] = useState({ clientName: '' });

	const handleOnChange = e => {
		e.preventDefault();
		setClient({ [e.target.name]: e.target.value });
	};

	const handleOnSubmit = e => {
		e.preventDefault(e);
		const foundClient = userData.find(
			it => it.clientName === client.clientName
		);
		if (foundClient) {
			fixCurrentClient(foundClient);
			setClient({ clientName: '' });
		} else {
			setClient({ clientName: '' });
			return alert("User doesn't exists please create it first");
		}
	};

	return (
		<Row className='justify-content-md-center p-3'>
			<Form onSubmit={handleOnSubmit}>
				<Form.Group className='align-items-center col-xs-3'>
					<Form.Label><h5>Search Client</h5></Form.Label>
					<Form.Control
						className='mb-2'
						placeholder='Enter name please'
						onChange={handleOnChange}
						value={client.clientName}
            name='clientName'
					/>
				</Form.Group>
				<Button type='submit' variant='success' className='mb-2'>
					Search Client
				</Button>
			</Form>
		</Row>
	);
};

export default ClientSearchForm;
