import React, { useState, useEffect, useRef } from 'react';
import { getSoulMessage } from '../services/geminiService';
import { ReadingResult, CardState } from '../types';
import html2canvas from 'html2canvas';

const TOTAL_CARDS = 55;

const TarotDeck: React.FC = () => {
  const [cardState, setCardState] = useState<CardState>(CardState.Idle);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [reading, setReading] = useState<ReadingResult | null>(null);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  
  // User Inputs
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  
  // View State: 'form' or 'report'
  const [showReport, setShowReport] = useState(false);

  // Ref for the specific content to screenshot
  const captureRef = useRef<HTMLDivElement>(null);
  
  // Generate static random heights for the waveform
  const [waveHeights, setWaveHeights] = useState<number[]>([]);

  // Generate Years (1940 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 90 }, (_, i) => currentYear - i);

  const categories = [
    { 
      id: 'study', 
      label: '學業', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-study" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="grad-tassel" x1="12" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="url(#grad-study)" stroke="#1E3A8A" strokeWidth="0.5"/>
          <path d="M6 10.6V15.5C6 15.5 7.5 17 12 17C16.5 17 18 15.5 18 15.5V10.6L12 13.6L6 10.6Z" fill="#3B82F6" fillOpacity="0.4" stroke="#60A5FA" strokeWidth="0.5"/>
          <path d="M22 8V16" stroke="url(#grad-tassel)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="22" cy="16.5" r="1" fill="url(#grad-tassel)"/>
        </svg>
      )
    },
    { 
      id: 'love', 
      label: '緣份', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-love" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <radialGradient id="glow-love" cx="16" cy="8" r="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="url(#grad-love)"/>
          <path d="M16.5 5C15.5 5 14.5 5.5 14 6.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5"/>
          <circle cx="17" cy="7" r="2" fill="url(#glow-love)"/>
        </svg>
      )
    },
    { 
      id: 'work', 
      label: '工作', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-work" x1="2" y1="7" x2="22" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="grad-chart" x1="8" y1="15" x2="16" y2="11" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect x="2" y="7" width="20" height="14" rx="2" fill="url(#grad-work)"/>
          <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="#99F6E4" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 15L10 12L13 14L18 9" stroke="url(#grad-chart)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="4" y="9" width="16" height="1" fill="#0F766E" fillOpacity="0.3"/>
        </svg>
      )
    },
    { 
      id: 'health', 
      label: '健康', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-health" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="url(#grad-health)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2"/>
          <path d="M12 6V8M12 16V18M6 12H8M16 12H18" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      id: 'social', 
      label: '人際', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-social-1" x1="4" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="grad-social-2" x1="14" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <circle cx="8" cy="9" r="4" fill="url(#grad-social-1)"/>
          <path d="M1 19C1 16.2386 3.23858 14 6 14H10C12.7614 14 15 16.2386 15 19V20H1V19Z" fill="url(#grad-social-1)"/>
          <circle cx="17" cy="9" r="3" fill="url(#grad-social-2)"/>
          <path d="M12 19C12 16.7909 13.7909 15 16 15H18C20.2091 15 22 16.7909 22 19V20H12V19Z" fill="url(#grad-social-2)"/>
          <path d="M10.5 12.5L13.5 12.5" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      id: 'family', 
      label: '家庭', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-home" x1="2" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
             <linearGradient id="grad-heart-mini" x1="10" y1="13" x2="14" y2="17" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <path d="M3 10L12 3L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" fill="url(#grad-home)"/>
          <path d="M9 22V14H15V22" fill="#92400E" fillOpacity="0.3"/>
          <path d="M12 18.35L11.45 17.85C10.4 16.9 9.5 16.08 9.5 15.1C9.5 14.3 10.1 13.7 10.9 13.7C11.35 13.7 11.78 13.91 12 14.25C12.22 13.91 12.65 13.7 13.1 13.7C13.9 13.7 14.5 14.3 14.5 15.1C14.5 16.08 13.6 16.9 12.55 17.85L12 18.35Z" fill="url(#grad-heart-mini)"/>
        </svg>
      )
    },
  ];

  useEffect(() => {
    shuffleDeck();
    setWaveHeights(Array.from({ length: TOTAL_CARDS }, () => Math.floor(Math.random() * 70) + 30));
  }, []);

  const shuffleDeck = () => {
    const indices = Array.from({ length: TOTAL_CARDS }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
  };

  const handleBarClick = async (indexInVisualDeck: number) => {
    if (cardState !== CardState.Idle) return;

    const actualCardId = shuffledIndices[indexInVisualDeck] + 1;
    setCardState(CardState.Selecting);
    setSelectedCardIndex(indexInVisualDeck);

    setTimeout(async () => {
      try {
        const result = await getSoulMessage(actualCardId);
        setReading({ ...result, cardId: actualCardId });
        setCardState(CardState.Revealed);
      } catch (e) {
        setCardState(CardState.Idle);
        console.error(e);
      }
    }, 1000);
  };

  const closeReading = () => {
    setReading(null);
    setSelectedCardIndex(null);
    setSelectedCategory(null);
    setUserName('');
    setBirthYear('');
    setShowReport(false);
    setCardState(CardState.Shuffling);
    
    setTimeout(() => {
      shuffleDeck();
      setWaveHeights(Array.from({ length: TOTAL_CARDS }, () => Math.floor(Math.random() * 70) + 30));
      setCardState(CardState.Idle);
    }, 600);
  };

  const generateReport = () => {
    if (selectedCategory && userName && birthYear) {
      setShowReport(true);
    }
  };

  const handleScreenshot = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: '#020617', 
        useCORS: true,
        logging: false
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Soul-Debug-Report-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Screenshot failed:", error);
      alert("截圖失敗，請手動截圖");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <section id="tarot-draw" className="relative flex flex-col items-center justify-center pt-24 pb-20 bg-slate-950 border-t border-slate-900 min-h-[600px] overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>

      <div className="text-center mb-12 z-10 px-4 relative">
        <div className="inline-block mb-3 px-3 py-1 rounded border border-tech-500/30 bg-tech-500/10 text-tech-400 text-xs tracking-[0.2em] font-mono uppercase">
          系統已就緒
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 serif tracking-wide">
          靈魂頻譜掃描
        </h2>
        <p className="text-slate-400 text-sm md:text-base font-light tracking-wide">
          Debug你目前的靈魂訊號
        </p>
      </div>

      {/* THE SPECTRUM INTERFACE */}
      <div className="relative w-full max-w-6xl px-4 h-[200px] flex items-center justify-center z-20 group/container">
        <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-tech-400 to-transparent opacity-0 group-hover/container:opacity-50 blur-[1px] pointer-events-none transition-opacity duration-500" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>

        <div className="flex items-center justify-center h-full gap-[3px] md:gap-[6px] w-full mx-auto perspective-1000">
          {shuffledIndices.map((actualId, index) => {
            const heightPercent = waveHeights[index] || 50;
            const isSelected = selectedCardIndex === index;
            
            return (
              <div
                key={`bar-${index}`}
                onClick={() => handleBarClick(index)}
                className={`
                  relative w-1.5 md:w-2.5 rounded-full cursor-pointer transition-all duration-300 ease-out
                  ${cardState === CardState.Idle ? 'hover:scale-y-[1.8] hover:brightness-150 hover:bg-tech-300' : ''}
                  ${isSelected ? 'bg-soul-400 scale-y-[2] shadow-[0_0_20px_rgba(251,191,36,0.8)] z-50' : 'bg-slate-700/80'}
                `}
                style={{
                  height: `${heightPercent}%`,
                  animation: cardState === CardState.Idle ? `pulse-height 3s infinite ease-in-out ${index * 0.1}s` : 'none',
                  backgroundColor: isSelected ? '#fbbf24' : index % 2 === 0 ? '#0f766e' : '#0d9488'
                }}
              >
                <div className="absolute inset-0 bg-tech-400 blur-md opacity-0 hover:opacity-50 transition-opacity"></div>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-1/2 left-0 right-0 h-[1px] bg-slate-800 w-full -z-10"></div>
      </div>

      {cardState === CardState.Selecting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm">
          <div className="w-64 h-64 relative flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-slate-800 rounded-full"></div>
             <div className="absolute inset-2 border-t-2 border-tech-500 rounded-full animate-spin"></div>
             <div className="absolute inset-6 border-b-2 border-soul-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
             <div className="font-mono text-tech-400 text-4xl font-bold tracking-tighter animate-pulse">DECODING</div>
          </div>
          <div className="mt-4 text-slate-400 font-mono text-xs tracking-widest">正在讀取靈魂底層數據...</div>
        </div>
      )}

      {/* Main Result Modal */}
      {cardState === CardState.Revealed && reading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 border border-slate-700 p-1 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.6)] relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="bg-slate-950 rounded-xl p-6 md:p-8 relative overflow-hidden border border-slate-800">
              
              <button 
                onClick={closeReading}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors z-20"
              >
                ✕
              </button>

              {/* MODE 1: Data Entry Form */}
              {!showReport ? (
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                    {/* Message Display */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-900/50 border border-tech-500/20 text-tech-400 text-[10px] tracking-[0.2em] font-bold uppercase mb-6">
                          <span className="w-1.5 h-1.5 bg-tech-400 rounded-full animate-pulse"></span>
                          靈魂數據已提取
                        </div>
                        <p className="text-xl md:text-2xl text-white font-bold leading-relaxed font-serif relative z-10 drop-shadow-lg">
                            {reading.message.split('，').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < reading.message.split('，').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                        </p>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>

                    {/* Step 1: Select Category */}
                    <div className="space-y-6">
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-tech-500 text-slate-900 flex items-center justify-center text-xs font-bold">1</span>
                                你目前最想Debug類型
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.label)}
                                    className={`flex flex-col items-center justify-center gap-2 px-2 py-3 rounded-lg border transition-all duration-200 group relative overflow-hidden
                                    ${selectedCategory === cat.label 
                                        ? 'bg-tech-900/40 border-tech-500 ring-1 ring-tech-500/50 shadow-[0_0_15px_rgba(45,212,191,0.15)]' 
                                        : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
                                    }
                                    `}
                                >
                                    <span className={`transition-transform duration-300 ${selectedCategory === cat.label ? 'scale-110' : 'group-hover:scale-110'}`}>
                                        {cat.icon}
                                    </span>
                                    <span className={`text-sm font-medium transition-colors ${selectedCategory === cat.label ? 'text-tech-400' : 'text-slate-400 group-hover:text-white'}`}>
                                        {cat.label}
                                    </span>
                                </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Name Input */}
                        <div className="text-left">
                             <label htmlFor="userName" className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-tech-500 text-slate-900 flex items-center justify-center text-xs font-bold">2</span>
                                輸入你的姓名
                             </label>
                             <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="例如：王小明"
                                className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-tech-500 focus:ring-1 focus:ring-tech-500/50 transition-colors placeholder-slate-600 text-sm"
                             />
                        </div>

                        {/* Step 3: Birth Year Select */}
                        <div className="text-left">
                             <label htmlFor="birthYear" className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-tech-500 text-slate-900 flex items-center justify-center text-xs font-bold">3</span>
                                你的西元出生年
                             </label>
                             <div className="relative">
                                <select
                                   id="birthYear"
                                   value={birthYear}
                                   onChange={(e) => setBirthYear(e.target.value)}
                                   className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-tech-500 focus:ring-1 focus:ring-tech-500/50 transition-colors appearance-none text-sm cursor-pointer"
                                >
                                   <option value="" disabled>請選擇年份</option>
                                   {years.map((year) => (
                                      <option key={year} value={year}>{year}</option>
                                   ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                             </div>
                        </div>

                        <button
                          onClick={generateReport}
                          disabled={!selectedCategory || !userName || !birthYear}
                          className={`w-full mt-6 py-3 rounded-lg font-bold text-sm tracking-widest transition-all
                            ${!selectedCategory || !userName || !birthYear 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-tech-600 text-white hover:bg-tech-500 shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] transform hover:-translate-y-0.5'}
                          `}
                        >
                           產生診斷報告
                        </button>
                    </div>
                </div>
              ) : (
                // MODE 2: Diagnostic Report & Capture
                <div className="animate-in slide-in-from-right-4 fade-in duration-500">
                    {/* The Capture Card */}
                    <div ref={captureRef} className="bg-slate-950 border border-slate-800 p-6 rounded-xl relative overflow-hidden shadow-2xl mb-8">
                        {/* Tech Decoration */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-tech-500 via-soul-400 to-tech-500"></div>
                        <div className="absolute top-4 left-4 w-2 h-2 bg-tech-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-500 tracking-widest">DIAGNOSTIC ID: {Math.floor(Math.random() * 10000)}</div>
                        
                        <div className="text-center mt-6 mb-8">
                            <h3 className="text-tech-400 font-mono text-xs tracking-[0.3em] font-bold mb-2 uppercase">Soul Debug Report</h3>
                            <p className="text-2xl text-white font-bold leading-relaxed font-serif relative z-10">
                                {reading.message.split('，').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < reading.message.split('，').length - 1 && <br />}
                                </React.Fragment>
                                ))}
                            </p>
                        </div>

                        {/* User Data Grid */}
                        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                            <div className="bg-slate-900/50 p-3 rounded border border-slate-800">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Subject</p>
                                <p className="text-white font-bold text-sm">{userName}</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded border border-slate-800">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Origin</p>
                                <p className="text-white font-bold text-sm">{birthYear}</p>
                            </div>
                            <div className="col-span-2 bg-tech-900/20 p-3 rounded border border-tech-500/20 flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    {categories.find(c => c.label === selectedCategory)?.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] text-tech-400 font-mono uppercase">Debug Target</p>
                                    <p className="text-white font-bold text-sm">{selectedCategory}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-end">
                             <div className="flex flex-col">
                                 <span className="text-[8px] text-slate-600 font-mono">SCANNER</span>
                                 <span className="text-[10px] text-slate-400 font-bold">靈魂工程師</span>
                             </div>
                             <div className="w-12 h-12 opacity-20">
                                {/* Mini Logo Watermark */}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                   <path d="M12 2v2" /><path d="m5 7 2 2" /><path d="m19 7-2 2" /><path d="m5 17 2-2" /><path d="m19 17-2-2" /><rect width="8" height="12" x="8" y="6" rx="2" /><path d="M12 10v2" /><path d="M12 14v2" />
                                </svg>
                             </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <p className="text-center text-xs text-slate-400 mb-2">步驟四：保存與預約</p>
                        
                        <button 
                           onClick={handleScreenshot}
                           className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 transition-all text-sm font-medium"
                        >
                           {isCapturing ? (
                             <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 處理中...</span>
                           ) : (
                             <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                保存診斷報告
                             </>
                           )}
                        </button>

                        {/* Centered Main CTA */}
                        <div className="flex justify-center">
                            <a 
                                href="#contact" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    closeReading();
                                    const el = document.getElementById('contact');
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group flex items-center justify-center gap-2 w-full py-4 px-8 bg-gradient-to-r from-soul-500 to-tech-600 hover:from-soul-400 hover:to-tech-500 text-white font-bold text-base tracking-widest rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-1"
                            >
                                預約Debug
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                        
                        <button 
                          onClick={() => setShowReport(false)} 
                          className="w-full text-xs text-slate-500 hover:text-slate-400 underline mt-2"
                        >
                            返回修改資料
                        </button>
                    </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-height {
          0%, 100% { transform: scaleY(1); opacity: 0.8; }
          50% { transform: scaleY(1.3); opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
};

export default TarotDeck;