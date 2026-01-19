import React from 'react';
import ReactDOM from 'react-dom/client';

//import css in order
import 'normalize.css';
import './animate.css';
import 'bootstrap/dist/css/bootstrap.css';
import './img/icons/css/ionicons.css';
import './img/font-awesome/css/font-awesome.css';
import './style.css';

//import js libraries
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';


//import components
import Navbar from './components/navbar';
import MatrixBackground from './components/matrix-background';
import Intro from './components/intro';
import About from './components/about';
import Portfolio from './components/portfolio';
import Contact from './components/contact';
import BackToTop from './components/back-top';
import Preloader from './components/preloader';

const root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.Fragment>
            <MatrixBackground />
            <div className="app-content">
                <Navbar />
                <Intro />
                <About />
                <Portfolio />
                <Contact />
                <BackToTop />
                <Preloader />
            </div>
        </React.Fragment>
    );
}
