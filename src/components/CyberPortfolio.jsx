"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Download,
  Menu,
  X,
  ChevronDown,
  Terminal,
  Code,
  Cpu,
  Database,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

import HackerScene3D from "./3d/HackerScene3D";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Glitch Text Component
const GlitchText = ({ children, className = "" }) => {
  return (
    <span className={`glitch-text ${className}`} data-text={children}>
      {children}
    </span>
  );
};

// Cyber Button Component
const CyberButton = ({ children, onClick, variant = "primary", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`cyber-button ${variant} ${className} relative overflow-hidden group`}
    >
      <span className="cyber-button-glitch"></span>
      <span className="cyber-button-content relative z-10 flex items-center gap-2">
        {children}
      </span>
      <span className="cyber-button-border"></span>
    </button>
  );
};

// Terminal Text Effect
const TerminalText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, speed]);

  return (
    <span className="terminal-text font-mono">
      {displayText}
      <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
    </span>
  );
};

// Skill Bar Component
const SkillBar = ({ name, percentage, icon, delay = 0 }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 1.5,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 80%",
        },
      }
    );
  }, [percentage, delay]);

  return (
    <div className="skill-bar-container mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <img src={`/${icon}`} alt={name} className="w-8 h-8 object-contain" />
          <span className="text-cyan-400 font-mono text-sm">{name}</span>
        </div>
        <span className="text-green-400 font-mono text-sm">{percentage}%</span>
      </div>
      <div className="skill-bar-track h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-900">
        <div
          ref={barRef}
          className="skill-bar-fill h-full bg-gradient-to-r from-cyan-500 via-green-400 to-cyan-500 rounded-full relative"
          style={{ width: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 100, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="project-card group relative bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg overflow-hidden hover:border-cyan-400 transition-all duration-500"
    >
      {/* Holographic scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="holographic-scan"></div>
      </div>

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Project Number */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center font-mono font-bold text-black">
          {index + 1}
        </div>
        
        {/* Glitch overlay on hover */}
        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glitch-overlay"></div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono group-hover:text-green-400 transition-colors">
          &gt; {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-mono bg-cyan-900/30 border border-cyan-700/50 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-400 hover:text-cyan-400 font-mono text-sm transition-colors group/link"
        >
          <span>VIEW_PROJECT</span>
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </a>
        
        {/* Corner decorations */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50"></div>
      </div>
    </div>
  );
};

// Experience Card Component
const ExperienceCard = ({ experience, index, isActive }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="experience-card relative pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-green-500 to-transparent"></div>
      
      {/* Timeline node */}
      <div className={`absolute left-0 top-2 w-4 h-4 -translate-x-1/2 rounded-full border-2 ${isActive ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/50' : 'bg-cyan-500 border-cyan-400'}`}>
        <div className={`absolute inset-0 rounded-full ${isActive ? 'animate-ping bg-green-500/50' : ''}`}></div>
      </div>
      
      {/* Card */}
      <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-6 ml-4 hover:border-cyan-400 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-cyan-400 font-mono group-hover:text-green-400 transition-colors">
              {experience.role}
            </h3>
            <p className="text-green-400 font-semibold">{experience.company}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-mono rounded ${isActive ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'}`}>
            {isActive ? 'ACTIVE' : 'COMPLETED'}
          </span>
        </div>
        
        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Terminal size={14} className="text-cyan-500" />
            {experience.period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-cyan-500" />
            {experience.location}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">{experience.description}</p>
        
        {/* Achievements */}
        <div className="border-t border-cyan-900/50 pt-4">
          <h4 className="text-sm font-mono text-cyan-400 mb-2">&gt; KEY_ACHIEVEMENTS:</h4>
          <ul className="space-y-2">
            {experience.achievements?.map((achievement, i) => (
              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-green-400 mt-1">►</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function CyberPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Track scroll progress for 3D animation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "projects", "contact"];
    
    const handleScroll = () => {
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

  // GSAP Scroll Animations
  useEffect(() => {
    if (isLoading) return;

    // Animate section titles
    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.fromTo(
        title,
        { opacity: 0, y: 50, skewX: -5 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
          },
        }
      );
    });

    // Parallax effect for background elements
    gsap.to(".parallax-slow", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "experience", label: "EXP" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/rohit_28_03", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rohit-saundalkar-209678314", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Roh2003", label: "GitHub" },
  ];

  const skills = [
    { name: "Python", icon: "Python-2.png", percentage: 90 },
    { name: "JavaScript", icon: "js2.png", percentage: 88 },
    { name: "ReactJS", icon: "react.webp", percentage: 90 },
    { name: "Node.js", icon: "node.png", percentage: 78 },
    { name: "HTML5", icon: "html.jpg", percentage: 95 },
    { name: "CSS3", icon: "css.png", percentage: 92 },
    { name: "Django", icon: "dj.jpg", percentage: 80 },
    { name: "MongoDB", icon: "mongo3.png", percentage: 72 },
    { name: "Docker", icon: "doc2.png", percentage: 50 },
    { name: "Git", icon: "git.png", percentage: 90 },
  ];

  const experiences = [
    {
      role: "Full Stack Developer Intern",
      company: "EnPointe IT Services Pvt Ltd",
      period: "Jun 2025 - Present",
      location: "On-site, Andheri West",
      description: "Working as a full stack developer intern, contributing to web application development.",
      achievements: [
        "Developed responsive web applications using React and Node.js",
        "Implemented RESTful APIs with 95% uptime",
        "Collaborated with cross-functional teams on daily basis"
      ]
    },
    {
      role: "Full Stack Intern",
      company: "Blackstone Technologies Pvt Ltd",
      period: "Nov 2024 - Feb 2025",
      location: "Remote",
      description: "Worked remotely as a full stack intern, building scalable web applications.",
      achievements: [
        "Built 3+ production-ready web applications",
        "Optimized database queries improving performance by 40%",
        "Integrated third-party APIs and payment gateways"
      ]
    },
    {
      role: "Python Developer Intern",
      company: "MotionCut Pvt Ltd",
      period: "Aug 2024 - Oct 2024",
      location: "Remote",
      description: "Developed backend services and automation scripts.",
      achievements: [
        "Created automated scripts reducing manual work by 60%",
        "Built scalable Django REST APIs",
        "Wrote comprehensive unit tests with 90% coverage"
      ]
    }
  ];

  const projects = [
    {
      title: "SkillUp.in",
      description: "Complete Learning Platform for Students and working professionals to skillup.",
      tags: ["Full-stack", "CMS", "Dashboard"],
      image: "./image.png",
      link: "#",
    },
    {
      title: "ScaleUp.in",
      description: "AI-powered SaaS project providing different types of features.",
      tags: ["AI", "SaaS", "Web App"],
      image: "./image.png",
      link: "#",
    },
    {
      title: "ReadAura.in",
      description: "Book recommendation system that provides personalized suggestions.",
      tags: ["ML", "Books", "Web App"],
      image: "./readaura.png",
      link: "#",
    },
    {
      title: "TravelOne",
      description: "MERN stack travel web app for exploring destinations.",
      tags: ["MERN", "Travel", "React"],
      image: "rajasthan.jpg",
      link: "https://travel-buddy-roan.vercel.app/",
    },
    {
      title: "SpaceSnap",
      description: "First ever project built at the start of web development journey.",
      tags: ["Web App", "Space"],
      image: "./pic21.jpg",
      link: "#",
    },
    {
      title: "Zenvaitality",
      description: "Yoga and health management project using Python.",
      tags: ["Python", "Health", "AI"],
      image: "./yoga.jpg",
      link: "#",
    },
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="loading-container mb-8">
            <div className="loading-ring"></div>
            <div className="loading-ring"></div>
            <div className="loading-ring"></div>
          </div>
          <div className="font-mono text-cyan-400 text-xl">
            <TerminalText text="INITIALIZING SYSTEM..." speed={80} />
          </div>
          <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background Scene */}
      <HackerScene3D scrollProgress={scrollProgress} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-green-400 to-cyan-500 z-50 transform origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold cursor-pointer font-mono"
              onClick={() => scrollToSection("home")}
            >
              <span className="text-cyan-400">&lt;</span>
              <span className="text-green-400">ROHIT</span>
              <span className="text-cyan-400">/&gt;</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-1 bg-black/50 backdrop-blur-xl rounded-full px-4 py-2 border border-cyan-500/30"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                      : "text-gray-400 hover:text-cyan-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-cyan-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 bg-black/90 backdrop-blur-xl rounded-lg border border-cyan-500/30 overflow-hidden"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-6 py-3 font-mono text-sm transition-colors ${
                      activeSection === item.id
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                    }`}
                  >
                    &gt; {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Terminal Header */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-xl rounded-lg border border-cyan-500/30">
              <Terminal size={16} className="text-green-400" />
              <span className="font-mono text-sm text-gray-400">user@portfolio:~$</span>
              <span className="font-mono text-sm text-cyan-400">whoami</span>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-mono text-gray-400 mb-2">
                &gt; Hello, I'm
              </h3>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400">
                  ROHIT SAUNDALKAR
                </GlitchText>
              </h1>
            </div>

            <div className="text-2xl md:text-4xl font-mono">
              <span className="text-gray-400">&gt; </span>
              <span className="text-cyan-400">
                <TerminalText 
                  text="Full Stack Developer | DevOps Engineer | Problem Solver" 
                  speed={50}
                />
              </span>
            </div>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Motivated software engineer with hands-on experience in full-stack development,
              passionate about turning complex problems into elegant solutions.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon p-3 bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <CyberButton onClick={() => scrollToSection("contact")} variant="primary">
                <Mail size={18} />
                GET_IN_TOUCH
              </CyberButton>
              <CyberButton variant="secondary">
                <Download size={18} />
                <a href="/rohit_cv3.pdf" download="Rohit_Resume.pdf">
                  DOWNLOAD_CV
                </a>
              </CyberButton>
            </div>
          </motion.div>

          {/* Hero Visual - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative flex justify-center lg:justify-end order-first lg:order-last mb-8 lg:mb-0"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0">
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 via-green-500/30 to-cyan-500/30 blur-2xl animate-pulse"></div>
              
              {/* Rotating rings */}
              <div className="absolute inset-0 border-2 border-cyan-500/40 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-green-500/30 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 sm:inset-6 md:inset-8 border-2 border-cyan-500/50 rounded-full animate-spin-slow"></div>
              
              {/* Profile Image Container */}
              <div className="absolute inset-6 sm:inset-8 md:inset-10 lg:inset-12 rounded-full overflow-hidden border-4 border-cyan-400/70 shadow-lg shadow-cyan-500/30 backdrop-blur-sm">
                <img
                  src="/rohit5.jpg"
                  alt="Rohit Saundalkar"
                  className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-110"
                  style={{ objectPosition: 'center top' }}
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/30"></div>
                
                {/* Scan line effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scan"></div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 sm:w-24 h-20 sm:h-24 bg-green-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/4 -left-6 w-3 h-3 bg-green-400 rounded-full animate-ping delay-300"></div>
              
              {/* Tech label */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/80 border border-cyan-500/50 rounded-full font-mono text-xs text-cyan-400 whitespace-nowrap">
                &lt;DEVELOPER/&gt;
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyan-400 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-cyan-400">&lt;</span>
              <span className="text-white">ABOUT_ME</span>
              <span className="text-cyan-400">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-8"
            >
              <div className="flex items-center gap-2 mb-6 text-cyan-400 font-mono">
                <Terminal size={20} />
                <span>system.about()</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm Rohit Saundalkar, a passionate software engineer specializing in full-stack development.
                With a strong foundation in computer science and hands-on experience building web applications,
                I love turning complex problems into simple, beautiful solutions.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying outdoor activities. I believe in continuous learning and pushing boundaries.
              </p>
              
              {/* Terminal-style output */}
              <div className="mt-6 p-4 bg-black/50 rounded-lg border border-green-500/30 font-mono text-sm">
                <p className="text-green-400">&gt; Status: Available for opportunities</p>
                <p className="text-cyan-400">&gt; Location: Mumbai, India</p>
                <p className="text-yellow-400">&gt; Focus: Full Stack | DevOps | AI</p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "5+", label: "Projects Completed", icon: Code },
                { value: "3+", label: "Years Experience", icon: Cpu },
                { value: "10+", label: "Technologies", icon: Database },
                { value: "100%", label: "Passion", icon: Globe },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="stat-card bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-400 transition-all duration-300 group"
                >
                  <stat.icon size={24} className="mx-auto mb-4 text-cyan-400 group-hover:text-green-400 transition-colors" />
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-mono">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-cyan-400">&lt;</span>
              <span className="text-white">EXPERIENCE</span>
              <span className="text-cyan-400">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto"></div>
          </div>

          <div className="relative">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isActive={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-cyan-400">&lt;</span>
              <span className="text-white">TECH_STACK</span>
              <span className="text-cyan-400">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                percentage={skill.percentage}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-cyan-400">&lt;</span>
              <span className="text-white">PROJECTS</span>
              <span className="text-cyan-400">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4 font-mono">
              <span className="text-cyan-400">&lt;</span>
              <span className="text-white">CONTACT</span>
              <span className="text-cyan-400">/&gt;</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-green-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">&gt; CONNECT_WITH_ME</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Mail className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:soundrohit632@gmail.com" className="text-cyan-400 hover:text-green-400 transition-colors">
                      soundrohit632@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Phone className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a href="tel:+917722014336" className="text-cyan-400 hover:text-green-400 transition-colors">
                      +91 772-2014-336
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <MapPin className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">Mumbai, India - 401305</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-cyan-500/20">
                <p className="text-gray-400 mb-4 font-mono text-sm">&gt; FOLLOW_ME:</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">&gt; SEND_MESSAGE</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2 font-mono text-sm">NAME:</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-mono text-sm">EMAIL:</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2 font-mono text-sm">SUBJECT:</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2 font-mono text-sm">MESSAGE:</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono resize-none"
                    placeholder="Hello Rohit, I'd like to talk about..."
                  ></textarea>
                </div>
                
                <CyberButton variant="primary" className="w-full">
                  <Mail size={18} />
                  SEND_MESSAGE
                </CyberButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="font-mono text-gray-400 text-sm">
            <span className="text-cyan-400">&lt;</span>
            © {new Date().getFullYear()} ROHIT_SAUNDALKAR
            <span className="text-cyan-400">/&gt;</span>
          </div>
          
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Scanline Effect */}
      <div className="scanline-overlay pointer-events-none fixed inset-0 z-30"></div>
    </div>
  );
}
