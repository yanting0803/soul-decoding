import React from 'react';

const About: React.FC = () => {
  const skills = [
    {
      title: "邏輯拆解",
      desc: "理性分析現狀",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
      )
    },
    {
      title: "靈性點亮",
      desc: "直覺指引方向",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      )
    },
    {
      title: "系統優化",
      desc: "找出人生 Bug",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      )
    },
    {
      title: "版本更新",
      desc: "重啟更好生活",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      )
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden border-t border-slate-800">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge - Matching Hero Style */}
          <div className="text-center mb-10">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/80 backdrop-blur-sm text-tech-400 text-sm font-medium tracking-widest shadow-[0_0_15px_rgba(45,212,191,0.1)] mb-8">
                <span className="w-2 h-2 rounded-full bg-soul-400 animate-pulse"></span>
                ABOUT ME
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                關於我
             </h2>
          </div>

          {/* Bio Content */}
          <div className="bg-slate-950/50 border border-slate-800 p-8 md:p-10 rounded-2xl backdrop-blur-sm mb-12 shadow-xl relative">
             {/* Decorative Tech Corners */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-tech-500"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-tech-500"></div>

             <div className="flex flex-col gap-6 text-slate-300 text-lg md:text-xl leading-relaxed font-light tracking-wide text-left">
                <p className="font-medium text-white">
                   我是個寫 Code 的工程師，<br className="md:hidden" />也是個解牌的塔羅師。
                </p>
                
                <p>這兩者其實很像——</p>
                
                {/* Indented Block for the comparison */}
                <div className="pl-5 md:pl-8 border-l-2 border-tech-500/30 space-y-5 py-1">
                   <p>
                      工程師除錯 <span className="font-mono text-tech-400 text-base mx-1 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Debug</span> 是為了讓系統運行順暢，
                   </p>
                   <p>
                      而塔羅解牌是為了幫你找出人生卡關的 Bug，<br className="hidden md:block" />
                      並重新部署 <span className="font-mono text-tech-400 text-base mx-1 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Deploy</span> 更好的版本。
                   </p>
                </div>

                <p className="pt-2">
                   我不講虛無飄渺的大道理。<br />
                   我用邏輯與直覺，幫你找到問題的 <span className="font-mono text-soul-400 font-bold mx-1 border-b border-soul-500/50">Root Cause</span>。
                </p>
             </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {skills.map((skill, idx) => (
               <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800 hover:border-tech-500/30 transition-all group flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-tech-500 mb-4 group-hover:scale-110 group-hover:text-soul-400 transition-all shadow-lg border border-slate-800">
                     {skill.icon}
                  </div>
                  <h4 className="text-white font-bold text-lg mb-1">{skill.title}</h4>
                  <p className="text-slate-400 text-xs tracking-wide">{skill.desc}</p>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;