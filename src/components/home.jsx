"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Download,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";


// Photo Carousel Component
const PhotoCarousel = ({ photos, company, role }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-48 overflow-hidden group/carousel">
      <AnimatePresence mode="wait">
        <motion.img 
          key={currentIndex}
          src={photos[currentIndex]}
          alt={`${company} - Photo ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </AnimatePresence>
      
      {/* Minimal gradient overlay only at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
      
      {/* Title overlay with better contrast */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent pt-12 pb-4 px-4 z-10">
        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-2xl">{role}</h3>
        <p className="text-yellow-400 font-semibold drop-shadow-lg">{company}</p>
      </div>
      
      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Dots indicator */}
      {photos.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPhoto(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 w-8 shadow-lg' 
                  : 'bg-white/70 hover:bg-white/90 w-2 shadow-md'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Photo counter */}
      {photos.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
          {currentIndex + 1} / {photos.length}
        </div>
      )}
    </div>
  );
};

export default function ModernPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", color: "hover:text-blue-400" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/rohit_28_03?igsh=amtoZnBxeTRnM3Ry",
      color: "hover:text-pink-400",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rohit-saundalkar-209678314",
      color: "hover:text-blue-600",
    },
    { icon: Github, href: "https://github.com/Roh2003", color: "hover:text-gray-400" },
  ];

  // Skills data with images and positions for visual display
  const skills = [
    { name: "Python", image: "Python-2.png", className: "absolute top-10 left-[10%] rotate-[-5deg]", level: "Advanced", percentage: 90 },
    { name: "C", image: "c2.webp", className: "absolute top-32 left-[15%] rotate-[4deg]", level: "Intermediate", percentage: 75 },
    { name: "JavaScript", image: "js2.png", className: "absolute top-24 left-[25%] rotate-[6deg]", level: "Advanced", percentage: 88 },
    { name: "C++", image: "c++.png", className: "absolute top-5 left-[30%] rotate-[-8deg]", level: "Intermediate", percentage: 70 },
    { name: "HTML5", image: "html.jpg", className: "absolute top-40 left-[40%] rotate-[7deg]", level: "Advanced", percentage: 95 },
    { name: "Css3", image: "css.png", className: "absolute top-16 left-[50%] rotate-[-3deg]", level: "Advanced", percentage: 92 },
    { name: "Django", image: "dj.jpg", className: "absolute top-28 left-[60%] rotate-[5deg]", level: "Intermediate", percentage: 80 },
    { name: "ReactJS", image: "react.webp", className: "absolute top-10 left-[70%] rotate-[-6deg]", level: "Advanced", percentage: 90 },
    { name: "Node.js", image: "node.png", className: "absolute top-36 left-[20%] rotate-[9deg]", level: "Intermediate", percentage: 78 },
    { name: "Express.js", image: "exp.webp", className: "absolute top-12 left-[35%] rotate-[-4deg]", level: "Intermediate", percentage: 75 },
    { name: "Tailwind", image: "tail.webp", className: "absolute top-44 left-[55%] rotate-[3deg]", level: "Intermediate", percentage: 80 },
    { name: "Bootstrap", image: "boot2.png", className: "absolute top-20 left-[65%] rotate-[-2deg]", level: "Intermediate", percentage: 77 },
    { name: "Next.js", image: "next3.png", className: "absolute top-32 left-[75%] rotate-[7deg]", level: "Beginner", percentage: 60 },
    { name: "MySQL", image: "sql.png", className: "absolute top-8 left-[80%] rotate-[-5deg]", level: "Intermediate", percentage: 75 },
    { name: "MongoDB", image: "mongo3.png", className: "absolute top-24 left-[85%] rotate-[4deg]", level: "Intermediate", percentage: 72 },
    { name: "PostgreSQL", image: "post.png", className: "absolute top-16 left-[90%] rotate-[2deg]", level: "Beginner", percentage: 55 },
    { name: "Git", image: "git.png", className: "absolute top-36 left-[10%] rotate-[-4deg]", level: "Advanced", percentage: 90 },
    { name: "Figma", image: "figma.png", className: "absolute top-5 left-[45%] rotate-[6deg]", level: "Intermediate", percentage: 70 },
    { name: "Docker", image: "doc2.png", className: "absolute top-28 left-[30%] rotate-[-7deg]", level: "Beginner", percentage: 50 },
    { name: "Linux", image: "linux.png", className: "absolute top-40 left-[70%] rotate-[4deg]", level: "Intermediate", percentage: 75 },
  ];

  const experiences = [
    {
      role: "Full Stack Developer Intern",
      company: "EnPointe IT Services Pvt Ltd",
      period: "Jun 2025 - Present",
      location: "On-site, Andheri West",
      description: "Working as a full stack developer intern, contributing to web application development and collaborating with cross-functional teams to deliver robust solutions.",
      photos: ["/enpointe_1.jpg", "/enpointe_2.jpg", "/enpointe_3.jpg", "/enpointe_4.jpg", "/enpointe_5.jpg"],
      achievements: ["Developed responsive web applications using React and Node.js", "Collaborated with cross-functional teams on daily basis", "Implemented RESTful APIs with 95% uptime", "Participated in agile development practices"]
    },
    {
      role: "Full Stack Intern",
      company: "Blackstone Technologies Pvt Ltd",
      period: "Nov 2024 - Feb 2025",
      location: "Remote",
      description: "Worked remotely as a full stack intern, building and maintaining scalable web applications and APIs.",
      photo: "/contact.webp",
      achievements: ["Built 3+ production-ready web applications", "Optimized database queries improving performance by 40%", "Integrated third-party APIs and payment gateways", "Conducted code reviews and bug fixes"]
    },
    {
      role: "Python Developer Intern",
      company: "MotionCut Pvt Ltd",
      period: "Aug 2024 - Oct 2024",
      location: "Remote",
      description: "Developed backend services and automation scripts as a Python developer intern, focusing on efficiency and reliability.",
      photo: "/contact.webp",
      achievements: ["Created automated scripts reducing manual work by 60%", "Built scalable Django REST APIs", "Implemented data processing pipelines", "Wrote comprehensive unit tests with 90% coverage"]
    }
  ];

  const projects = [
    {
      title: "SkillUp.in",
      description: "An Complete Learning Platform For Students, Begineers and working professional to skillup in their respective field.",
      tags: ["Mobile App", "CMS", "Dashboard", "FUll-stack"],
      image: "./image.png",
      link: "https://example.com/project3",
    },
    {
      title: "ScaleUp.in",
      description: "An AI-powered SaaS project providing different types of features to customers.",
      tags: ["AI", "SaaS", "Web App"],
      image: "./image.png",
      link: "https://example.com/project3",
    },
    {
      title: "ReadAura.in",
      description: "A fully functional book recommendation system that provides books to users as per their requirements.",
      tags: ["Recommendation", "Books", "Web App"],
      image: "./readaura.png",
      link: "https://example.com/project3",
    },
    {
      title: "TravelOne",
      description: "A MERN stack travel web app for exploring destinations. My latest React web development project.",
      tags: ["MERN", "Travel", "React"],
      image: "rajasthan.jpg",
      link: "https://travel-buddy-roan.vercel.app/",
    },
    {
      title: "SpaceSnap",
      description: "My first ever project, built at the start of my web development journey.",
      tags: ["Web App", "Beginner", "Space"],
      image: "./pic21.jpg",
      link: "https://example.com/project2",
    },
    {
      title: "Zenvaitality",
      description: "A yoga and health management project made using Python and various libraries.",
      tags: ["Python", "Health", "Yoga"],
      image: "./yoga.jpg",
      link: "https://example.com/project3",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { 
              push: { quantity: 4 }, 
              repulse: { distance: 200, duration: 0.4 } 
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full py-4" // Increased padding for taller navbar
        >
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-14"> {/* Increased height */}
            {/* Logo */}
            <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="text-white font-bold text-2xl cursor-pointer" // Increased text size
                onClick={() => scrollToSection("home")}
            >
                <span className="text-yellow-400">R</span>ohit.
            </motion.div>

            {/* Desktop Navigation - Glass effect only here */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20"> {/* Glass effect container */}
                {navItems.map((item) => (
                    <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-5 py-1 text-base font-medium transition-colors relative ${
                        activeSection === item.id ? "text-yellow-400" : "text-white/80 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    {item.label}
                    {activeSection === item.id && (
                        <motion.span 
                        layoutId="nav-underline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    </motion.button>
                ))}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />} {/* Increased icon size */}
            </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-2 pt-2 space-y-2"
                >
                {navItems.map((item) => (
                    <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 text-base rounded-lg transition-colors ${
                        activeSection === item.id 
                        ? "bg-white/10 text-yellow-400" 
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    whileHover={{ x: 5 }}
                    >
                    {item.label}
                    </motion.button>
                ))}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-light text-gray-300 mb-2">Hello, I'm</h3>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                Rohit Saundalkar
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-4xl font-semibold min-h-[4rem]"
            >
              <span className="text-white">I'm a </span>
              <span className="text-yellow-400">
                <Typewriter
                  words={["Full Stack Developer", "Python Developer", "Web Developer", "DevOps Engineer"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-gray-300 leading-relaxed max-w-2xl"
            >
              Motivated and detail-oriented Software Engineer with hands-on experience in full-stack development,
              coding, testing, and debugging software applications. Passionate about learning new technologies and
              applying innovative solutions to real-world problems.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/10 backdrop-blur-sm rounded-full text-white transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Download className="mr-2" size={16} />
                <a href="/rohit_cv3.pdf" download="Rohit_Resume.pdf">
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <motion.div
              className="relative w-full max-w-md"
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Multiple glowing layers for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-[-10px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-xl opacity-10"></div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-white/30 shadow-2xl">
                  {/* Glowing border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  
                  <img
                    src="/rohit5.jpg"
                    alt="Rohit Saundalkar"
                    className="relative w-full h-auto rounded-3xl grayscale hover:grayscale-0 transition-all duration-500 border-4 border-transparent"
                  />
                  
                  {/* Decorative floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-40"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-white/60 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get to know more about who I am and what I do
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 group-hover:blur-xl transition-all duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-xl group-hover:border-yellow-400/50 transition-all duration-500">
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                  Who am I?
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  I'm Rohit Saundalkar, a passionate software engineer specializing in full-stack development. 
                  With a strong foundation in computer science and hands-on experience in building web applications, 
                  I love turning complex problems into simple, beautiful solutions.
                </p>
                <p className="text-gray-300 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or enjoying outdoor activities. I believe in continuous learning and pushing boundaries to create 
                  impactful digital experiences.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-yellow-400 text-4xl font-bold mb-2">5+</div>
                <div className="text-white font-medium">Projects Completed</div>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-yellow-400 text-4xl font-bold mb-2">3+</div>
                <div className="text-white font-medium">Years Experience</div>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-yellow-400 text-4xl font-bold mb-2">10+</div>
                <div className="text-white font-medium">Technologies</div>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-yellow-400 text-4xl font-bold mb-2">100%</div>
                <div className="text-white font-medium">Passion</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
      id="experience"
      className="relative z-10 py-20 px-4 bg-gradient-to-b from-purple-900/50 to-slate-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">My Experience</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            My professional journey and work experience
          </p>
        </motion.div>

        {/* Creative Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-orange-500 to-purple-600 transform md:-translate-x-1/2"></div>
            
            {/* Timeline items */}
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'} md:pl-1/2`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 top-6 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2 shadow-lg shadow-yellow-400/50 z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content card */}
                <div className="ml-20 md:ml-0 relative group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-yellow-400/50 transition-all duration-300"
                  >
                    {/* Company header with photo */}
                    {exp.photos && exp.photos.length > 0 ? (
                      <PhotoCarousel photos={exp.photos} company={exp.company} role={exp.role} />
                    ) : (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={exp.photo} 
                          alt={exp.company}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                          <p className="text-yellow-400 font-semibold">{exp.company}</p>
                        </div>
                      </div>
                    )}

                    {/* Card content */}
                    <div className="p-6">
                      {/* Period and location */}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center text-yellow-400">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                      {/* Achievements */}
                      <div className="border-t border-white/10 pt-4">
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-gray-300">
                              <svg className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>


      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Technologies and tools I work with
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="mb-6 group"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`/${skill.image}`} 
                      alt={skill.name}
                      className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  <span className="text-gray-400 font-semibold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-lg shadow-yellow-400/50"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4 bg-gradient-to-b from-purple-900/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Some of my recent work and projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="h-full cursor-pointer"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 group">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/20 to-yellow-500/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Project number badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Project content */}
                    <div className="p-6 relative">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs font-medium px-3 py-1 bg-white/10 text-white rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* View project button */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium group/btn transition-colors"
                      >
                        View Project
                        <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                      
                      {/* Decorative glow on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10"></div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-400/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Email</h4>
                      <a href="mailto:rohit@example.com" className="text-white hover:text-yellow-400 transition-colors">
                        rohit@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-400/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Phone</h4>
                      <a href="tel:+1234567890" className="text-white hover:text-yellow-400 transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-400/20 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Location</h4>
                      <p className="text-white">Mumbai, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-white font-medium mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-white/10 backdrop-blur-sm rounded-full text-white transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110`}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
                <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" 
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" 
                      placeholder="Hello Rohit, I'd like to talk about..."
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 bg-slate-900/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              © {new Date().getFullYear()} Rohit Saundalkar. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/60 hover:text-white transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}