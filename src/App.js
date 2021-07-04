import { ClientContextProvider } from './context/ClientProvider.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ClientSearchForm from './components/client-search-component/client-search-form.component';
import ClientCreateForm from './components/client-create-component/client-create.component';
import ClientShow from './components/client-show/client-show.component';
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {
	return (
		<ClientContextProvider>
			<Container className='pt-3'>
				<Row className='justify-content-center'>
					<h1 className='pt-5'>Rewards App</h1>
				</Row>
				<Row className='justify-content-around'>
					<ClientSearchForm />
					<ClientCreateForm />
				</Row>
				<Row>
					<ClientShow />
				</Row>
			</Container>
		</ClientContextProvider>
	);
};

export default App;
