'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const fullText = 'Syifa Kaffa Billah';

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    const cvUrl = '/cv_syifa_kaffa_billah.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Syifa_Kaffa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filterProjects = (projects, tab) => {
    if (tab === 'all') return projects;
    return projects.filter(project => project.category === tab);
  };

  const getButtonDetails = (url, type) => {
    let name = type;
    let icon = null;
    
    if (type === 'demoUrl') {
      name = 'Demo';
      icon = (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (type === 'repoUrl') {
      name = 'Repository';
      icon = (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    } else if (type === 'slideUrl') {
      name = 'Slide';
      icon = (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    
    return { name, icon };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] relative overflow-hidden">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg border-b border-orange-100/50 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">SYIFA</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'about', label: 'Home' },
                { id: 'projects', label: 'Project' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    activeSection === id 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] relative overflow-hidden">
        {/* Background animated elements for hero section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 animate-slide-in-left">
                  Hi There, I'm
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-green-500 bg-clip-text text-transparent mb-6 animate-fade-in">
                  {displayedText}
                  <span className="animate-blink">|</span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Syifa is a final-year Computer Science student at the University of Indonesia 
              with a strong interest in full-stack development and data science. She has experience 
              delivering real-world applications for  institutional clients and aims to build impactful 
              solutions as a Software Engineer.
              </p>
              
              <div className="flex items-center space-x-4 animate-slide-in-up">
                <button 
                  onClick={downloadCV}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span>Unduh CV</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </button>
              </div>
              
              <div className="flex space-x-4 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
                <a href="https://github.com/syifakaffa" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/syifa-kaffa-billah-618557249/" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:syifakaffabillah@gmail.com" 
                   className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative w-96 h-96">
                {/* Orbit Ring */}
                <div className="absolute inset-0 border-2 border-orange-300/50 rounded-full orbit-animation shadow-lg">
                  <div className="absolute -top-3 -right-3 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-md"></div>
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-md"></div>
                  <div className="absolute top-1/2 -left-3 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full transform -translate-y-1/2 shadow-md"></div>
                </div>
                
                {/* Second Orbit Ring */}
                <div className="absolute inset-6 border border-green-300/50 rounded-full orbit-animation shadow-md" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
                  <div className="absolute -top-2 left-1/2 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full transform -translate-x-1/2 shadow-sm"></div>
                  <div className="absolute -bottom-2 right-1/4 w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                </div>
                
                {/* Profile Photo Container */}
                <div className="absolute inset-12 w-72 h-72 bg-gradient-to-br from-orange-400 via-orange-500 to-green-500 rounded-full shadow-2xl overflow-hidden ring-4 ring-white/50">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="/foto_syifa.png" 
                      alt="Syifa Kaffa" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">Projects</h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/50">
              <div className="flex space-x-2">
                {[
                  { id: 'all', label: 'All Projects', count: 9 },
                  { id: 'software', label: 'Software Development', count: 8 },
                  { id: 'data-science', label: 'Data Science', count: 1 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterProjects([
              {
                title: "Wisuda UI",
                role: "Frontend Engineer",
                category: "software",
                description: "Wisuda UI is a graduation registration system developed using Vue.js and TypeScript. I designed the mockup in Figma, built key features like role-based navigation, dynamic reports, and content management, and integrated the frontend with REST APIs before deploying it to the development server.",
                image: "/project/wisuda-ui.png",
                techStack: ["Vue", "Typescript", "Nuxt", "TailwindCSS", "Vuetify", "Figma", "GitLab CI/CD", "Yaak", "Postman", "Keycloak"],
              },
              {
                title: "Parkir UI",
                role: "Frontend Engineer",
                category: "software",
                description: "Parkir UI is a parking subscription system for UI's academic community and partners. I was responsible for designing the frontend with Vue.js and TypeScript, building role-based interfaces, managing parking subscriptions, and integrating the system with REST APIs and Keycloak-based authentication.",
                image: "/project/parkir-ui.png",
                techStack: ["Vue", "Typescript", "Nuxt", "TailwindCSS", "Vuetify", "Figma", "GitLab CI/CD", "Yaak", "Postman", "Keycloak"],
              },
              {
                title: "IAST Connect",
                role: "Full Stack Engineer",
                category: "software",
                description: "IAST Connect is a web platform designed to facilitate networking and communication among alumni of SMA Sang Timur. This website enables alumni to reconnect, share experiences, and stay updated on school-related events. This project was developed collaboratively to serve as a digital community hub for the school's alumni.",
                image: "/project/iast.png",
                techStack: ["Next.js", "Django", "JavaScript", "TailwindCSS", "TypeScript"],
                repoUrl: "https://github.com/orgs/ikatanalumnisangtimur/repositories"
              },
              {
                title: "BrewForce Attack",
                role: "Full Stack Engineer",
                category: "software",
                description: "Built security-focused microservices web application following OWASP Top 10 guidelines in 5-member team. Developed Next.js frontend and Spring Boot backend with separated authentication service architecture.",
                image: "/project/brewforce-attack.png",
                techStack: ["Next.js", "Django", "JavaScript", "TailwindCSS", "TypeScript"],
                demoUrl: "https://kelompok-7-brewforce-fe.pkpl.cs.ui.ac.id/",
              },
              {
                title: "ReadHub Web",
                role: "Fullstack Engineer",
                category: "software",
                description: "ReadHub is a website project collaboratively developed as part of a Platform-Based Programming course, aiming to enhance literacy by providing easy access to a variety of books and reading materials. The platform features modules such as a landing page, book categories, detailed book information with reviews, a book borrowing system, a discussion forum, and a favorites list.",
                image: "/project/readhub-web.png",
                techStack: ["Python", "Django", "HTML", "BootStrap CSS", "JavaScript"],
                demoUrl: "https://readhub-c13-tk.pbp.cs.ui.ac.id/",
                repoUrl: "https://github.com/PBP-C13/ReadHub"
              },
              {
                title: "ReadHub Mobile",
                role: "Fullstack Engineer",
                category: "software",
                description: "ReadHub Mobile is a mobile project collaboratively developed as part of a Platform-Based Programming course, aiming to enhance literacy by providing easy access to a variety of books and reading materials. ReadHub Mobile offers a seamless and on-the-go experience for discovering, borrowing, and discussing books, tailored for users who prefer accessing reading materials through their mobile devices.",
                image: "/project/readhub-mobile.png",
                techStack: ["Flutter", "Dart"],
                demoUrl: "https://install.appcenter.ms/users/aryawijayak/apps/ReadHub/distribution_groups/public",
                repoUrl: "https://github.com/PBP-C13/ReadHub-mobile"
              },
              {
                title: "SecondTreasure",
                role: "Fullstack Engineer",
                category: "software",
                description: "Second Treasurer is an online thrift shop where users can buy and sell various fashion items, both new and used, by creating a listing for the item they want to sell. Essentially, the app acts as a middleman in the sales transactions, involving three main roles: a Buyer, a Seller, and a Staff member. This project was developed collaboratively as part of the Advanced Programming course.",
                image: "/project/second-treasure.png",
                techStack: ["Next.js", "JavaScript", "TailwindCSS", "TypeScript", "Java Spring Boot", "Docker", "Kubernetes", "GitLab CI/CD", "Postman", "Draw.io", "Burp Suite"],
                demoUrl: "https://frontend-adpro-c2.vercel.app/",
                slideUrl: "https://www.canva.com/design/DAGGmKWMIwE/KCSC2JxPSMefoikyPiW10Q/edit?utm_content=DAGGmKWMIwE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              },
              {
                title: "Marmut Music",
                role: "Full Stack Engineer",
                category: "software",
                description: "Marmut is a collaborative project developed as part of a Database course, offering music and podcast streaming with features like user registration, premium subscriptions, playlist management, and top charts. As a frontend engineer, I focused on building responsive and interactive interfaces to enhance the user experience.",
                image: "/project/marmut.png",
                techStack: ["SQL", "Django", "HTML", "BootStrap CSS", "JavaScript"],
                repoUrl: "https://github.com/marmut-b7/marmut-tk3"
              },
              {
                title: "Lodging Reservation Analytics",
                role: "Data Scientist",
                category: "data-science",
                description: "Collaborated in 3-member data science team to deliver comprehensive analytics solution for hospitality industry. Developed ML classification model (F1: 0.84) for booking cancellation prediction and regression model for pricing optimization.",
                image: "/project/lodging.png",
                techStack: ["Python", "Pandas", "Scikit-learn", "Seaborn", "Matplotlib", "NumPy", "Google Colab"],
                demoUrl: "https://drive.google.com/file/d/1B8z6nRz9LCRdaxFhry_et5YJwJoRbVr3/view?usp=sharing",
                slideUrl: "https://www.canva.com/design/DAGDMwW1kPk/o4cYmzHqqxIJg82Ep1J82w/edit?utm_content=DAGDMwW1kPk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              }
            ], activeTab).map((project, index) => (
              <div key={index} className="h-[420px] mb-6 animate-fade-in">
                <div className="flip-card h-full">
                  <div className="flip-card-inner">
                    {/* Front of Card */}
                    <div className="flip-card-front shadow-lg border border-white/50 backdrop-blur-sm">
                      <div className="flex flex-col h-full">
                        <div className="aspect-video bg-gradient-to-br from-orange-400 to-green-600 relative overflow-hidden">
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.category === 'data-science' 
                                ? 'bg-purple-100 text-purple-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {project.category === 'data-science' ? 'Data Science' : 'Software Dev'}
                            </span>
                          </div>
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover absolute inset-0"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col bg-white/90">
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.title}</h3>
                          <p className="text-orange-500 font-medium mb-3 text-sm">{project.role}</p>
                          
                          <div className="flex items-center overflow-hidden mb-4 mt-auto">
                            <div className="flex space-x-2 overflow-hidden">
                              {project.techStack.slice(0, 2).map((tech, techIndex) => (
                                <span key={techIndex} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.techStack.length > 2 && (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2 flex-shrink-0">
                                + {project.techStack.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of Card - keep existing code */}
                    <div className="flip-card-back shadow-lg border border-white/50">
                      <div className="p-6 flex flex-col h-full bg-white/90">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4 flex-1 overflow-y-auto text-sm">{project.description}</p>
                        
                        <div className="mt-auto">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Tech Stack:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech, techIndex) => (
                              <span key={techIndex} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex space-x-3">
                            {Object.entries(project)
                              .filter(([key, value]) => key.endsWith('Url') && value)
                              .map(([key, url]) => {
                                const { name, icon } = getButtonDetails(url, key);
                                const bgClass = key === 'demoUrl' 
                                  ? 'bg-orange-500 hover:bg-orange-600' 
                                  : key === 'repoUrl' 
                                    ? 'bg-gray-800 hover:bg-gray-900' 
                                    : 'bg-green-600 hover:bg-green-700';
                                    
                                return (
                                  <a 
                                    key={key}
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`flex-1 ${bgClass} text-white text-center py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center`}
                                  >
                                    {icon}
                                    <span>{name}</span>
                                  </a>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 -right-20 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl animate-bounce"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Experience</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Professional Experience</h3>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/50 mb-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-white/90">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Frontend Engineer Intern</h3>
                    <p className="text-orange-500 font-medium mb-2">Pusat Administrasi Universitas Indonesia</p>
                    <p className="text-gray-600 mb-4">February 2025 - June 2025</p>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Developed the frontend systems for the graduation and parking platforms using Vue.js and TypeScript.</li>
                      <li>• Built core features such as registration flows, role-based access control, parking subscriptions, and dynamic reporting.</li>
                      <li>• Integrated frontend with RESTful APIs and implemented route protection using role-based access middleware</li>
                      <li>• Designed UI mockups and user flows using Figma to align with responsive and component-based development.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Experience */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Additional Experience</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Teaching Assistant (Discrete Mathematics 2, Calculus 1, Numerical Analysis)",
                    organization: "Faculty of Computer Science, University of Indonesia",
                    period: "Aug 2023 - June 2025",
                    description: "Assisted over 10 students per semester in understanding complex material, creating problem sets, and managing class operations including quiz supervision and administrative tracking."
                  },
                  {
                    title: "Internal Control Staff",
                    organization: "Forum Ukhuwah dan Kajian Islam Fasilkom UI",
                    period: "Jan 2025 - Present",
                    description: "Oversaw candidate bidding for organizational roles, maintained transparent selection procedures, and facilitated communication as MC and timekeeper during evaluation sessions."
                  },
                  {
                    title: "Human Resource Development Staff",
                    organization: "Forum Ukhuwah dan Kajian Islam Fasilkom UI",
                    period: "Aug 2023 - Jan 2024",
                    description: "Led HR programs including 'Remember Your Friend' initiative to strengthen team bonding and acted as liaison between HR and QILC divisions."
                  },
                  {
                    title: "Secretary",
                    organization: "SIWAK-NG",
                    period: "Aug 2023 - December 2023",
                    description: "Handled proposal drafting, activity reports, and official correspondence to support event execution and documentation."
                  }
                ].map((experience, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-white/90">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{experience.title}</h4>
                        <p className="text-orange-500 font-medium mb-1">{experience.organization}</p>
                        <p className="text-gray-500 text-sm mb-2">{experience.period}</p>
                        <p className="text-gray-600">{experience.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>      
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-56 h-56 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Contact</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/50">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get In Touch</h3>
              <p className="text-gray-600 mb-8 text-center">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and development.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-lg">Email</p>
                    <p className="text-gray-600">syifa.kaffa@ui.ac.id</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-lg">Location</p>
                    <p className="text-gray-600">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6 pt-8 mt-8 border-t border-gray-200">
                <a href="https://github.com/syifakaffa" target="_blank" rel="noopener noreferrer" 
                   className="w-14 h-14 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/syifa-kaffa-billah-618557249/" target="_blank" rel="noopener noreferrer" 
                   className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:syifakaffabillah@gmail.com" 
                   className="w-14 h-14 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-200">
            © {new Date().getFullYear()} Syifa Kaffa. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
