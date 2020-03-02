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

const routes = [
	{ path: '/', name: 'Home', Component: Home },
	{ path: '/case-studies', name: 'Case Studies', Component: CaseStudies },
	{ path: '/about-us', name: 'About Us', Component: About },
	{ path: '/approach', name: 'Approach', Component: Approach },
	{ path: '/services', name: 'Services', Component: Services }
];

function App() {
	useEffect(() => {
		//prevent flashing
		gsap.to('body', 0, { css: { visibility: 'visible' } });
	}, []);

	return (
		<>
			<Header />
			<div className="App">
				{routes.map(({ path, Component }) => (
					<Route exact path={path} key={path}>
						<Component />
					</Route>
				))}
			</div>
		</>
	);
}

export default App;
