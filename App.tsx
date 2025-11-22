
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import TarotDeck from './components/TarotDeck';
import Contact from './components/Contact';

const App: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-slate-950 min-h-screen text-slate-100 selection:bg-tech-500 selection:text-white">
      {/* Sticky Navigation - Dark Glass */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Animated Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={(e) => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Quantum Soul Core Icon */}
            <div className="relative w-9 h-9 flex items-center justify-center">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-tech-500/10 blur-md rounded-full group-hover:bg-tech-500/20 transition-all duration-500"></div>

               {/* Outer Ring: Spinning Dashed Data */}
               <svg className="absolute inset-0 w-full h-full text-slate-600 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] transition-all duration-500" viewBox="0 0 100 100">
                 {/* Base Ring */}
                 <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                 {/* Active Segment */}
                 <circle cx="50" cy="50" r="46" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="20 269" strokeLinecap="round" className="drop-shadow-[0_0_5px_rgba(45,212,191,0.5)]" />
               </svg>

               {/* Inner Geometry: Reverse Spin */}
               <svg className="absolute inset-0 w-full h-full text-soul-500/80 animate-[spin_12s_linear_infinite_reverse]" viewBox="0 0 100 100">
                  <rect x="34" y="34" width="32" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 50 50)" />
               </svg>
               
               {/* Core: Pulsing Soul */}
               <div className="relative w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff] animate-pulse group-hover:scale-125 transition-transform"></div>
            </div>
            
            <span className="text-lg font-bold text-white tracking-widest font-mono group-hover:text-tech-400 transition-colors duration-300">
              靈魂Debug
            </span>
          </div>
          
          {/* Navigation Links - Visible on Mobile and Desktop */}
          <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-sm font-medium font-sans">
             <a 
               href="#about" 
               onClick={(e) => scrollToSection(e, 'about')}
               className="text-slate-400 hover:text-tech-400 transition-colors cursor-pointer whitespace-nowrap"
             >
               關於我
             </a>
             <a 
               href="#tarot-draw" 
               onClick={(e) => scrollToSection(e, 'tarot-draw')}
               className="text-slate-400 hover:text-tech-400 transition-colors cursor-pointer whitespace-nowrap"
             >
               靈魂頻譜掃描
             </a>
             <a 
               href="#contact" 
               onClick={(e) => scrollToSection(e, 'contact')}
               className="text-slate-400 hover:text-tech-400 transition-colors cursor-pointer whitespace-nowrap"
             >
               預約Debug
             </a>
          </div>
        </div>
      </nav>

      <Hero />
      <About />
      <TarotDeck />
      <Contact />
      
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-xs font-mono border-t border-slate-900">
        <p>&copy; {new Date().getFullYear()} 靈魂Debug | 靈魂工程師</p>
      </footer>
    </main>
  );
};

export default App;
