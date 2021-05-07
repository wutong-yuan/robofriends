import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
		robots: [],
		searchfiled: ''	
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfiled: event.target.value})
	}

	render() {
		const { robots, searchfiled } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfiled.toLowerCase());
		})
		return !robots.length ?
			<h1>Loading</h1> :
			(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots}/>
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}


// const App = () => {
// 	return (
// 		<div className='tc'>
// 			<h1>RoboFriends</h1>
// 			<SearchBox />
// 			<CardList robots={robots}/>
// 		</div>
// 	);
// }

export default App;