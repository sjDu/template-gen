import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Header2 from './header2';

// Code-splitting is automated for routes
import Home from '../routes/home';
// import Profile from '../routes/profile';

var formattor = require("formattor");

const headers = {
	header: () => <Header/>,
	header2: () => <Header2/>
}

export default class App extends Component {

	state = {
		selectHeader: 'header',
		html: ''
	}

	componentDidMount() {
		this.setState({html: getHtml()})
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.selectHeader != this.state.selectHeader) {
			this.setState({html: getHtml()})
		}
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

	render({}, {selectHeader, html}) {
		return (
			<div id="app">
				{/* <Header /> */}
				{headers[selectHeader]()}
				<Home path="/" onSelect={this.handleSelectHeader} 
					selectHeader={selectHeader}
					html={html}
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

function getHtml() {
	var a = document.getElementById('app')
	return formattor(a.innerHTML, {method: 'xml'})
}