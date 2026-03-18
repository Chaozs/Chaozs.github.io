import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

//import css in order
import 'normalize.css';
import './animate.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

//import components
import Navbar from './components/navbar';
import MatrixBackground from './components/matrix-background';
import Intro from './components/intro';
import Profile from './components/profile';
import Experiences from './components/experiences';
import EmulatorSection from './components/emulator/EmulatorSection';
import Contact from './components/contact';
import LazySection from './components/LazySection';

const App: React.FC = () => {
    const [showMatrixBackground, setShowMatrixBackground] = useState(false);

    useEffect(() => {
        let timeoutId: number | null = null;
        const frameId = window.requestAnimationFrame(() => {
            timeoutId = window.setTimeout(() => {
                setShowMatrixBackground(true);
            }, 0);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    return (
        <React.Fragment>
            {showMatrixBackground ? <MatrixBackground /> : null}
            <a className="skip-link" href="#main-content">
                Skip to main content
            </a>
            <div className="app-content">
                <Navbar />
                <main id="main-content" className="app-main">
                    <Intro />
                    <LazySection minHeight={700} revealOnEvent="reveal-profile">
                        <Profile />
                    </LazySection>
                    <LazySection minHeight={900} revealOnEvent="reveal-experiences">
                        <Experiences />
                    </LazySection>
                    <EmulatorSection />
                    <Contact />
                </main>
            </div>
        </React.Fragment>
    );
};

const root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
