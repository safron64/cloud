import Link from 'next/link'
import { store } from '../reducers'
import { Provider } from 'react-redux'

const Index = () => {
	return (
		<Provider store={store}>
			<div>
				<div>
					<Link href="/">Главная страница</Link>
				</div>
				<h1>Главная страница </h1>
			</div>
		</Provider>
	)
}

export default Index
