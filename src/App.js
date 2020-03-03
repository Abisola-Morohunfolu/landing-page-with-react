import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import gsap from 'gsap';
import Header from './components/Header';
import './styles/App.scss';
import Home from './pages/Home';
import About from './pages/About';
import Approach from './pages/Approach';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Navigation from './components/Navigation';
import { useState } from 'react';

const routes = [
	{ path: '/', name: 'Home', Component: Home },
	{ path: '/case-studies', name: 'Case Studies', Component: CaseStudies },
	{ path: '/about-us', name: 'About Us', Component: About },
	{ path: '/approach', name: 'Approach', Component: Approach },
	{ path: '/services', name: 'Services', Component: Services }
];

//debounce function
function debounce(fn, ms) {
	let timer;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			fn.apply(this, arguments);
		}, ms);
	};
}

function App() {
	//prevent flashing
	gsap.to('body', 0, { css: { visibility: 'visible' } });

	//state
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});

	useEffect(() => {
		let vh = dimensions.height * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		const debouncedHandledResize = debounce(function() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth
			});
		}, 1000);

		// setDimensions({
		// 	height: window.innerHeight,
		// 	width: window.innerWidth
		// });

		window.addEventListener('resize', debouncedHandledResize);
		// alert(dimensions);

		return () => {
			window.removeEventListener('resize', debouncedHandledResize);
		};
	});

	return (
		<>
			<Header />
			{console.log(dimensions)}
			<div className="App">
				{routes.map(({ path, Component }) => (
					<Route exact path={path} key={path}>
						<Component />
					</Route>
				))}
			</div>
			<Navigation />
		</>
	);
}

export default App;
