import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Typewriter from 'typewriter-effect';
import { Link, Element } from 'react-scroll';

import ContactPage from './ContactPage';
import Footer from './footer';
import Skills from './skills';
import ProjectPage from './ProjectPage';
import Edu from './Edu';



function Home() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="bg-slate-900 min-h-screen pb-10">
                {/* Navbar */}
                <nav className="text-white w-full flex justify-between bg-slate-800 pb-4 sticky z-10">
                    <h1 className="pt-5 pl-6 text-2xl font-bold">Portfolio.</h1>
                    <ul className="hidden sm:flex justify-end w-full pt-5 sm:pr-10 sm:gap-4 cursor-pointer">
                        <li>
                            <Link to="Home" smooth={true} duration={500} className="hover:text-yellow-500 hover:underline font-bold">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="" smooth={true} duration={500} className="hover:text-yellow-500 hover:underline font-bold">
                                about
                            </Link>
                        </li>
                        <li>
                            <Link to="about" smooth={true} duration={500} className="hover:text-yellow-500 hover:underline font-bold">
                                Education
                            </Link>
                        </li>
                        <li>
                            <Link to="projectpage" smooth={true} duration={700} className="hover:text-yellow-500 hover:underline font-bold">
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link to="skills" smooth={true} duration={500} className="hover:text-yellow-500 hover:underline font-bold">
                                Skills
                            </Link>
                        </li>
                        <li>
                            <Link to="contactPage" smooth={true} duration={800} className="hover:text-yellow-500 hover:underline font-bold">
                                Contact me
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="sm:hidden text-3xl focus:outline-none justify-end mr-5 text-white"
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
                            isOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300`}
                    >
                        <button
                            className="absolute top-4 right-4 text-xl focus:outline-none text-yellow-500"
                            onClick={toggleMenu}
                        >
                            ✖
                        </button>
                        <div className="flex flex-col mt-16 space-y-4 pl-4 cursor-pointer">
                            <Link to="Home" smooth={true} duration={500} onClick={toggleMenu} className="hover:text-blue-500 hover:underline">
                                Home
                            </Link>
                            <Link to="about" smooth={true} duration={500} onClick={toggleMenu} className="hover:text-blue-500 hover:underline">
                                About
                            </Link>
                            <Link to="skills" smooth={true} duration={500} onClick={toggleMenu} className="hover:text-blue-500 hover:underline">
                                Skills
                            </Link>
                            <Link to="projectpage" smooth={true} duration={500} onClick={toggleMenu} className="hover:text-blue-500 hover:underline">
                                Projects
                            </Link>
                            <Link to="contactPage" smooth={true} duration={500} onClick={toggleMenu} className="hover:text-blue-500 hover:underline">
                                Contact
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Section */}
                <Element name="Home">
                    <div className="flex flex-col gap-5 sm:grid sm:grid-cols-3 sm:gap-6 justify-center items-center min-h-screen px-10 sm:px-0">
                        {/* Text Content */}
                        <div className="text-white pt-10 col-span-2 pl-5 sm:pt-0">
                            <h3 className="text-4xl font-bold">Hello, It's me</h3>
                            <h1 className="text-6xl font-bold py-4">Rohit Saundalkar</h1>

                            <h3 className="text-3xl font-bold">
                                And I'm a{' '}
                                <span className="text-yellow-400">
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter
                                                .typeString('Full Stack Developer')
                                                .pauseFor(1000)
                                                .deleteAll()
                                                .typeString('Python Developer')
                                                .pauseFor(1000)
                                                .deleteAll()
                                                .typeString('Web Developer')
                                                .pauseFor(1000)
                                                .deleteAll()
                                                .typeString('DevOps Engineer')
                                                .start();
                                        }}
                                    />
                                </span>
                            </h3>

                            <p className="mt-4">
                                Motivated and detail-oriented Software Engineer Intern with hands-on experience in full-stack development,
                                coding, testing, and debugging software applications. Proficient in multiple programming languages, including
                                Python and JavaScript. Passionate about learning new technologies and applying innovative solutions to real-world problems.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4 pt-4">
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black p-3 rounded-md hover:bg-blue-500 hover:text-white transition-all ease-in duration-300"
                                >
                                    <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black p-3 rounded-md hover:bg-pink-500 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black p-3 rounded-md hover:bg-blue-500 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black p-3 rounded-md hover:bg-black hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faGithub} className="text-2xl" />
                                </a>
                            </div>

                            {/* Download CV Button */}
                            <button className="bg-slate-300 text-black px-4 py-2 mt-5 rounded-2xl font-bold hover:bg-blue-500 hover:text-white">
                                <a href="Rohit_Resume.pdf" download="Rohit_Resume.pdf">
                                    Download CV
                                </a>
                            </button>
                        </div>

                        {/* Image */}
                        <div
                            className="bg-slate-600 rounded-3xl mt-8 sm:mt-0 flex items-center justify-center mr-16
                            hover:shadow-yellow-50 hover:shadow-lg transition-all ease-in 0.5s grayscale hover:grayscale-0 overflow-hidden hover:scale-110 active:animate-pulse"
                        >
                            <img src="rohit4.png" alt="My photo" className="w-64 h-auto rounded-lg" />
                        </div>
                    </div>
                </Element>

                {/* Sections */}
                <Element name="about">
                    <Edu />
                </Element>
                <Element name="skills">
                    <Skills />
                </Element>
                <Element name="projectpage">
                    <ProjectPage />
                </Element>
                <Element name="contactPage">
                    <ContactPage />
                </Element>
                <Element name="footer">
                    <Footer />
                </Element>
            </div>
        </>
    );
}

export default Home;
