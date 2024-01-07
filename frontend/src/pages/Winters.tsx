import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import warn from '../assets/images/winter-warn.png';
import DuringWinter from './guides/DuringWinter';
import GeneratorSafety from './guides/GeneratorSafety';
import ProtectFromWinter from './guides/ProtectFromWinter';
import WinterText from './guides/WinterText';
import { useNavigate } from 'react-router-dom';

// Defining the Guide interface for TypeScript type checking
interface Guide {
    _id: string;
    title: string;
    content: string;
    category: string;
    updatedAt: string;
}

// Mapping of guide categories to image file names
const imageMap: { [key: string]: string } = {
    floods: 'floods.jpg',
    earthquakes: 'earthquake.jpg',
    wildfires: 'wildfire2.jpg',
    tornadoes: 'tornado.jpg',
    winters: 'winter.jpg',
    other: 'wildfire2.jpg'
};

const Winters: React.FC = () => {

    // Using the useLocation hook to access the state passed from the navigate function
    const location = useLocation();
    const { guide } = location.state as { guide: Guide }; // Casting the state to the Guide type
    const [darkMode, setDarkMode] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);


    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Styles for dark mode
    const darkModeStyles = {
        backgroundColor: 'black',
        color: 'white'
    };

    // Apply dark mode styles if darkMode is true, otherwise use empty object
    const currentStyles = darkMode ? darkModeStyles : {};
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    // Hook to navigate programmatically
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/guidePreview');
    };
    const imageName = imageMap[guide.category];
    const imageUrl = `${process.env.PUBLIC_URL}/${imageName}`;
    // Component rendering logic goes here
    return (
        <div className="flex h-full">
            <Sidebar />
            <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                <div style={{ maxWidth: '100%', overflowY: 'auto' }}>
                    <div className="w-full h-72 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                    <div className="flex justify-center items-center space-x-4 my-4">
                    <button
                                onClick={toggleDarkMode}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring"
                            >
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>

                            {/* Tooltip */}
                            {showTooltip && (
                                <div className="absolute top-80 left-100 bg-cyan-600 text-white p-3 rounded-full shadow hover:bg-cyan-700 transition duration-300">
                                    <span className="text-sm">
                                        Every website has a carbon footprint but by choosing to view ours in dark mode, you can reduce the screen power and carbon emissions generated by your visit. Try it here.
                                    </span>
                                </div>
                            )}
                        <button
                            onClick={() => scrollToSection('section1')}
                            className="border-2 border-transparent shadow-md shadow-cyan-700 text-cyan-600 py-2 px-4 hover:bg-cyan-700 hover:text-white hover:scale-105 transition-transform"
                        >
                            Prepare for Winter Weather
                        </button>
                        <button
                            onClick={() => scrollToSection('section2')}
                            className="border-2 border-transparent shadow-md shadow-cyan-700 text-cyan-600 py-2 px-4 hover:bg-cyan-700 hover:text-white hover:scale-105 transition-transform"
                        >
                            Stay Safe During
                        </button>

                        <button
                            onClick={() => scrollToSection('section3')}
                            className="border-2 border-transparent shadow-md shadow-cyan-700 text-cyan-600 py-2 px-4 hover:bg-cyan-700 hover:text-white hover:scale-105 transition-transform"
                        >
                            Generator Safety
                        </button></div>
                </div>

                <div style={{ fontFamily: 'Brygada, serif', ...currentStyles }}>
                    <WinterText></WinterText>
                    {/* <ProtectFromWinter></ProtectFromWinter> */}
                    <h1 className="ml-4 text-2xl font-bold text my-4">How to Protect Yourself from Winter Weather</h1>
                    <h3 className="ml-4 text-lg font-semibold mb-4">IF YOU ARE UNDER A WINTER STORM WARNING, FIND SHELTER RIGHT AWAY</h3>
                    <h4 className="ml-4 text-lg mb-4"><em>Know your winter weather terms:</em></h4>
                    <div style={{ backgroundColor: 'initial', color: 'initial' }}>
                        <ProtectFromWinter></ProtectFromWinter>
                    </div>
                    <h1 className="ml-4 text-2xl font-bold text my-4">Stay Safe During Winter Weather</h1>
            
                    <div style={{ backgroundColor: 'initial', color: 'initial' }}>
                        <DuringWinter></DuringWinter>
                    </div>
                    <h1 className="ml-4 text-2xl font-bold text my-4">Generator Safety</h1>
            <h3 className="ml-4 text-lg mb-4"><em>Generators can be helpful when the power goes out. It is important to know how use them safely to prevent carbon monoxide (CO) poisoning and other hazards.</em></h3>
            
                    <div style={{ backgroundColor: 'initial', color: 'initial' }}>
                        <GeneratorSafety></GeneratorSafety>
                    </div>
                    

                </div>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-10 right-10 bg-cyan-600 text-white p-3 rounded-full shadow hover:bg-cyan-700 transition duration-300"
                >
                    Return to Top
                </button>
                <button
                    onClick={handleGoBack}
                    className="fixed bottom-10 left-100 bg-cyan-600 text-white p-3 rounded-full shadow hover:bg-cyan-700 transition duration-300"
                >
                    Back to preview
                </button>
            </div>
        </div>
    );
};



export default Winters;
