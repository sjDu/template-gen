import { h } from 'preact';
import { Link } from 'preact-router/match';
// import './style';

const Header = () => (
	<header class={'header2'}>
		<h1>Preact App2</h1>
		<nav>
			<Link activeClassName={'active'} href="/profile">Me</Link>
			<Link activeClassName={'active'} href="/">Home</Link>
			<Link activeClassName={'active'} href="/profile/john">John</Link>
		</nav>
	</header>
);

export default Header;
