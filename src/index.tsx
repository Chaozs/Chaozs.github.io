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
import Profile from './components/profile';
import Experiences from './components/experiences';
import EmulatorSection from './components/emulator/EmulatorSection';
import Contact from './components/contact';
import Preloader from './components/preloader';
import LazySection from './components/LazySection';

const root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.Fragment>
            <MatrixBackground />
            <div className="app-content">
                <Navbar />
                <Intro />
                <LazySection minHeight={700} revealOnEvent="reveal-profile">
                    <Profile />
                </LazySection>
                <LazySection minHeight={900} revealOnEvent="reveal-experiences">
                    <Experiences />
                </LazySection>
                <EmulatorSection />
                <Contact />
                <Preloader />
            </div>
        </React.Fragment>
    );
}
