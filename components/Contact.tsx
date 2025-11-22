import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden border-t border-slate-900">
       {/* Subtle Grid Background */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 serif tracking-wide">
          預約Debug
        </h2>
        
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-tech-500 to-soul-500"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    Debug你的靈魂數據
                </h3>
                
                <div className="text-slate-300 text-lg leading-loose tracking-wide font-light space-y-6">
                    <p>
                        你看到的這句話，<br />
                        就是靈魂在丟給你的 <span className="text-white font-medium">提示訊號</span>。
                    </p>
                    <p>
                        想更清楚現在到底卡在哪？<br />
                        歡迎預約
                        <span className="inline-block border-b border-tech-500/50 text-tech-400 font-bold mx-1 pb-0.5 hover:text-tech-300 transition-colors">靈魂 Debug</span>。
                    </p>
                    <p>
                        截圖給我，<br />
                        我帶你一起找到那個真正卡住你的
                        <span className="text-soul-400 font-mono font-bold mx-1">關鍵 Bug</span>
                        <svg className="w-4 h-4 text-soul-400 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        。
                    </p>
                </div>
                
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-soul-500/30 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-soul-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-soul-500"></span>
                        </span>
                        <span className="text-xs font-bold text-soul-200 uppercase tracking-widest">體驗模式</span>
                    </div>
                    <p className="text-white font-bold text-xl mb-1 group-hover:text-soul-400 transition-colors">初次體驗・自由樂捐</p>
                    <p className="text-sm text-slate-400 font-medium">感受能量流動，隨喜結緣</p>
                </div>
            </div>

            <div className="flex flex-col space-y-5">
                {/* QR Code for LINE */}
                <div className="mx-auto mb-2 overflow-hidden rounded-xl border border-slate-700/50 w-40 h-40 flex items-center justify-center relative shadow-2xl bg-slate-950 group">
                    {/* Scanning line effect */}
                    <div className="absolute top-0 w-full h-1 bg-tech-500/50 shadow-[0_0_10px_#2dd4bf] animate-[scan_3s_linear_infinite] opacity-0 group-hover:opacity-100 z-10"></div>
                    <img 
                        src="https://iili.io/f3x5mnj.jpg" 
                        alt="LINE QR Code" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Corner markers */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-tech-500 opacity-50"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-tech-500 opacity-50"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-tech-500 opacity-50"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-tech-500 opacity-50"></div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {/* LINE Wireframe Button */}
                    <a 
                        href="https://line.me/ti/p/@335kghfk" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-green-500/50 p-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    >
                        <div className="text-slate-400 group-hover:text-green-400 transition-colors">
                             {/* Schematic Line Bubble */}
                             <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.7018 20 9.46707 19.7386 8.34165 19.2653L3 21L4.85747 17.4168C3.69243 15.7715 3 13.7211 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" />
                                <circle cx="12" cy="11.5" r="1" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                             </svg>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-green-400 tracking-widest uppercase">Line@</span>
                    </a>

                    {/* IG Wireframe Button */}
                    <a 
                        href="https://instagram.com/tarot__engineer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    >
                        <div className="text-slate-400 group-hover:text-purple-400 transition-colors">
                             {/* Schematic Camera Aperture */}
                             <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                             </svg>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-purple-400 tracking-widest uppercase">IG</span>
                    </a>

                    {/* Threads Wireframe Button */}
                    <a 
                        href="https://www.threads.com/@tarot__engineer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-white/50 p-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        <div className="text-slate-400 group-hover:text-white transition-colors">
                             {/* Schematic Spiral */}
                             <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C14.99 22 17.66 20.68 19.43 18.62L18.62 17.79C17.08 19.56 14.73 20.83 12 20.83C7.12 20.83 3.17 16.88 3.17 12C3.17 7.12 7.12 3.17 12 3.17C16.88 3.17 20.83 7.12 20.83 12C20.83 13.75 20.36 15.34 19.58 16.67C18.87 17.89 17.8 18.66 16.5 18.66C15.2 18.66 14.17 17.5 14.17 16.17V11.5C14.17 10.12 13.05 9 11.67 9C10.29 9 9.17 10.12 9.17 11.5C9.17 12.88 10.29 14 11.67 14C12.37 14 13.01 13.71 13.46 13.24L14.27 13.95C13.64 14.71 12.72 15.17 11.67 15.17C9.64 15.17 8 13.53 8 11.5C8 9.47 9.64 7.83 11.67 7.83C13.7 7.83 15.33 9.47 15.33 11.5V16.17C15.33 16.81 15.86 17.5 16.5 17.5C17.14 17.5 18.11 16.96 18.58 16.1C19.25 14.94 19.67 13.55 19.67 12C19.67 7.76 16.24 4.33 12 4.33V2Z" />
                             </svg>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-white tracking-widest uppercase">Threads</span>
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          50% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Contact;