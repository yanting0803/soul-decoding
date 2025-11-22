import React from 'react';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 bg-slate-950">
      {/* Dark Tech Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>
      
      {/* Glowing Orbs - Adjusted for Dark Mode */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-tech-500/20 rounded-full blur-3xl animate-pulse-soft pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-soul-500/10 rounded-full blur-3xl animate-pulse-soft delay-1000 pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-6 text-center z-10 relative flex flex-col items-center">
        
        {/* Profile Picture */}
        <div className="mb-6 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-tech-500 to-soul-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-slate-900">
                <img 
                    src="https://iili.io/f3xzHmv.jpg" 
                    alt="Spiritual Hacker Profile" 
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Decorative Tech Ring */}
            <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] text-tech-500/30 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="5, 5" />
            </svg>
        </div>

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-tech-400 text-sm font-medium tracking-widest shadow-[0_0_15px_rgba(45,212,191,0.1)]">
          <span className="w-2 h-2 rounded-full bg-soul-400 animate-pulse"></span>
          身份識別：靈性駭客
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-lg font-serif">
          會塔羅的<br className="md:hidden" />工程師
        </h1>

        {/* New Subtitle (Previously part of the text block) */}
        <h2 className="text-xl md:text-2xl text-tech-400 font-medium tracking-wide mb-10">
          用邏輯拆解迷惘，用靈性點亮方向
        </h2>

        {/* Updated Quote / Philosophy */}
        <div className="max-w-3xl mx-auto space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed font-light">
          <p className="font-serif italic text-slate-200 text-xl md:text-2xl mb-8 relative inline-block leading-relaxed">
            <span className="absolute -left-4 -top-4 text-4xl text-tech-600 opacity-40">"</span>
            <span className="text-soul-400 font-bold not-italic block">讓我幫你讀出靈魂的底層程式碼</span>
            <span className="absolute -right-4 -bottom-2 text-4xl text-tech-600 opacity-40">"</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <a 
            href="#tarot-draw" 
            onClick={(e) => scrollToSection(e, 'tarot-draw')}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-base overflow-hidden text-slate-950 transition-all duration-300 bg-tech-400 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] hover:-translate-y-1 hover:bg-tech-300 cursor-pointer w-full md:w-auto"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-20"></span>
            <span className="relative tracking-widest flex items-center justify-center gap-2">
              開始靈魂Debug
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </span>
          </a>

          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-base overflow-hidden text-slate-300 border border-slate-600 transition-all duration-300 rounded-full hover:border-soul-400 hover:text-soul-400 hover:bg-slate-900/50 cursor-pointer w-full md:w-auto"
          >
             <span className="tracking-widest flex items-center justify-center gap-2">
              關於我
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;