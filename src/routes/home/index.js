import { h, Component } from 'preact';
// import style from './style';
// import './style.css';
var formattor = require("formattor");

class Home extends Component {
	state = {
		// html: '',
		// css: ''
	}
	handleClick = () => {
		this.props.onSelect('header')
	}

	handleClick2 = () => {
		this.props.onSelect('header2')
	}

	render({selectHeader, html}) {
		return (
			<div class={'home'}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<button onClick={this.handleClick}>
					click
				</button>
				<button onClick={this.handleClick2}>
					click2
				</button>
				<div>
					<textarea value={html}>
					</textarea>	
					<textarea value={getCss([selectHeader])}/>
				</div>
			</div>
		);
	}
}


export default Home;


function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    xml.split('\r\n').map(function(node,index) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

function queryCondition(selectorText, classNames = []) {
	for (let c of classNames) {
		for (let t of selectorText.split(' ')) {
			// if(selectorText.indexOf('.'+c) > -1) {
			if(t === ('.'+c) ) {
				return true
			}
		}
	}
	return false
}

function getHtml() {
	var a = document.getElementById('app')
	return formattor(a.innerHTML, {method: 'xml'})
}

function getCss(classNames) {
	let r = document.styleSheets[0].rules
		let css = ''
		for (let i in r) {
			if(r[i].cssText) {
				if(queryCondition(r[i].selectorText, classNames)) {
				// if(r[i].selectorText.indexOf('.header') > -1) {
					css = css + r[i].cssText + '\n'
				}
			}
		}

		return formattor(css, {method: 'css'})
}