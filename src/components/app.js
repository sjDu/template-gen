import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Header2 from './header2';

// Code-splitting is automated for routes
import Home from '../routes/home';
// import Profile from '../routes/profile';

const headers = {
	header: () => <Header/>,
	header2: () => <Header2/>
}

export default class App extends Component {

	state = {
		selectHeader: 'header'
	}
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	handleSelectHeader = (h) => {
		this.setState({
			selectHeader: h
		})
	}

	render({}, {selectHeader}) {
		return (
			<div id="app">
				{/* <Header /> */}
				{headers[selectHeader]()}
				<Home path="/" onSelect={this.handleSelectHeader} 
					selectHeader={selectHeader}
				/>
				{/* <Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router> */}
			</div>
		);
	}
}
