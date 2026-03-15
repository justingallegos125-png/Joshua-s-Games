import React, { useState, useRef, useEffect } from 'react';
import { Gamepad2, Volume2, VolumeX, Maximize, ChevronLeft, X, Settings, Globe, Shield, ExternalLink, Paintbrush, Image as ImageIcon, Type, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'general' | 'customization'>('general');
  
  // Cloaking State
  const [cloakTitle, setCloakTitle] = useState(localStorage.getItem('cloakTitle') || "JOSHUA'S ARCADE");
  const [cloakFavicon, setCloakFavicon] = useState(localStorage.getItem('cloakFavicon') || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='yellow'/%3E%3Ccircle cx='35' cy='40' r='5' fill='black'/%3E%3Ccircle cx='65' cy='40' r='5' fill='black'/%3E%3Cpath d='M 30 65 Q 50 80 70 65' stroke='black' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  
  // Customization State
  const [accentColor, setAccentColor] = useState(localStorage.getItem('accentColor') || "#ffffff");
  const [bgImage, setBgImage] = useState(localStorage.getItem('bgImage') || "");
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || "Inter");
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cloaking
    document.title = cloakTitle;
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = cloakFavicon || "/vite.svg";
    
    localStorage.setItem('cloakTitle', cloakTitle);
    localStorage.setItem('cloakFavicon', cloakFavicon);
  }, [cloakTitle, cloakFavicon]);

  useEffect(() => {
    // Customization injection
    const root = document.documentElement;
    root.style.setProperty('--accent', accentColor);
    root.style.setProperty('--font-main', fontFamily);
    
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('bgImage', bgImage);
    localStorage.setItem('fontFamily', fontFamily);
  }, [accentColor, bgImage, fontFamily]);

  const openAboutBlank = () => {
    const win = window.open();
    if (!win) return;
    const url = window.location.href;
    const style = win.document.createElement('style');
    style.innerHTML = `
      body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
      iframe { width: 100%; height: 100%; border: none; }
    `;
    win.document.head.appendChild(style);
    const iframe = win.document.createElement('iframe');
    iframe.src = url;
    win.document.body.appendChild(iframe);
  };

  const presets = [
    { name: "Default", title: "JOSHUA'S ARCADE", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='yellow'/%3E%3Ccircle cx='35' cy='40' r='5' fill='black'/%3E%3Ccircle cx='65' cy='40' r='5' fill='black'/%3E%3Cpath d='M 30 65 Q 50 80 70 65' stroke='black' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E" },
    { name: "Google Classroom", title: "Classes", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
    { name: "Edpuzzle", title: "Edpuzzle", icon: "https://edpuzzle.imgix.net/favicon.png" },
    { name: "Google", title: "Google", icon: "https://www.google.com/favicon.ico" },
  ];

  const customPresets = [
    { name: "Matrix", accent: "#00ff41", font: "JetBrains Mono", bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" },
    { name: "Cyberpunk", accent: "#ff00ff", font: "Inter", bg: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2070" },
    { name: "Deep Sea", accent: "#00d4ff", font: "Inter", bg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=2070" },
    { name: "Terminal", accent: "#ffffff", font: "JetBrains Mono", bg: "" },
  ];

  const logoText = "JOSHUA'S ARCADE";

  const gameInfo: Record<string, { title: string; url: string; id: string }> = {
    melon: {
      title: "MELON PLAYGROUND",
      url: "https://raw.githack.com/genizy/google-class/main/melon-playground/index.html",
      id: "01"
    },
    jetpack: {
      title: "JETPACK JOYRIDE",
      url: "https://raw.githack.com/genizy/jride/main/index.html",
      id: "02"
    },
    fnf: {
      title: "FRIDAY NIGHT FUNKIN'",
      url: "https://raw.githack.com/genizy/fridayfunk/main/index.html",
      id: "03"
    },
    birds: {
      title: "BIRDS",
      url: "https://raw.githack.com/gertdoro/UnityExplorer/master/Runtime/birds/index.html",
      id: "04"
    },
    baldi: {
      title: "BALDI'S BASICS PLUS",
      url: "https://raw.githack.com/genizy/web-port/master/baldi-plus/index.html",
      id: "05"
    },
    bendy: {
      title: "BENDY",
      url: "https://raw.githack.com/genizy/web-port/main/bendy/index.html",
      id: "06"
    },
    blockblast: {
      title: "BLOCK BLAST",
      url: "https://raw.githack.com/genizy/bl/master/index.html",
      id: "07"
    },
    bottlejump: {
      title: "BOTTLE JUMP 3D",
      url: "https://raw.githack.com/bubbls/youtube-playables/main/bottle-jump-3d/index.html",
      id: "08"
    },
    bowmasters: {
      title: "BOWMASTERS",
      url: "https://raw.githack.com/bubbls/youtube-playables/main/bowmasters/index.html",
      id: "09"
    },
    cookieclicker: {
      title: "COOKIE CLICKER",
      url: "https://raw.githack.com/bubbls/UGS-Assets/main/cookieclicker/index.html",
      id: "10"
    },
    crossyroad: {
      title: "CROSSY ROAD",
      url: "https://raw.githack.com/bubbls/youtube-playables/master/crossy-road/index.html",
      id: "11"
    },
    cuphead: {
      title: "CUPHEAD",
      url: "https://raw.githack.com/web-ports/cuphead/main/index.html",
      id: "12"
    },
    elasticface: {
      title: "ELASTIC FACE",
      url: "https://raw.githack.com/bubbls/UGS-Assets/main/elasticman/index.html",
      id: "13"
    },
    fnaf1: {
      title: "FNAF 1",
      url: "https://raw.githack.com/genizy/fnaf/master/1/index.html",
      id: "14"
    },
    fnaf2: {
      title: "FNAF 2",
      url: "https://raw.githack.com/genizy/fnaf/master/2/index.html",
      id: "15"
    },
    fnaf3: {
      title: "FNAF 3",
      url: "https://raw.githack.com/genizy/fnaf/master/3/index.html",
      id: "16"
    },
    fnaf4: {
      title: "FNAF 4",
      url: "https://raw.githack.com/genizy/fnaf/master/4/index.html",
      id: "17"
    },
    fnafps: {
      title: "FNAF PIZZERIA SIM",
      url: "https://raw.githack.com/genizy/fnaf/master/ps/index.html",
      id: "18"
    },
    fnafsl: {
      title: "FNAF SISTER LOCATION",
      url: "https://raw.githack.com/genizy/fnaf/main/sl/index.html",
      id: "19"
    },
    fnafucn: {
      title: "FNAF UCN",
      url: "https://raw.githack.com/genizy/fnaf/master/ucn/index.html",
      id: "20"
    },
    fnafworld: {
      title: "FNAF WORLD",
      url: "https://raw.githack.com/genizy/fnaf/master/w/index.html",
      id: "21"
    },
    fruitninja: {
      title: "FRUIT NINJA",
      url: "https://raw.githack.com/bubbls/UGS-Assets/main/fruit%20ninja/index.html",
      id: "22"
    },
    geometrydash: {
      title: "GEOMETRY DASH",
      url: "https://raw.githack.com/genizy/google-class/main/gdlite/index.html",
      id: "23"
    },
    granny: {
      title: "GRANNY",
      url: "https://raw.githack.com/gru6nny/ohd/main/index.html",
      id: "24"
    },
    hotlinemiami: {
      title: "HOTLINE MIAMI",
      url: "https://raw.githack.com/genizy/web-port/master/hotline-miami/index.html",
      id: "25"
    },
    jellymario: {
      title: "JELLY MARIO",
      url: "https://raw.githack.com/gn-math/assets/main/315/index.html",
      id: "26"
    },
    magictiles3: {
      title: "MAGIC TILES 3",
      url: "https://raw.githack.com/bubbls/youtube-playables/main/magic-tiles-3/index.html",
      id: "27"
    },
    stickmanhook: {
      title: "STICKMAN HOOK",
      url: "https://raw.githack.com/genizy/google-class/main/stickman-hook/index.html",
      id: "28"
    },
    sm64: {
      title: "SUPER MARIO 64",
      url: "https://raw.githack.com/ArkShocer/sm64/main/index.html",
      id: "29"
    },
    templerun2: {
      title: "TEMPLE RUN 2",
      url: "https://raw.githack.com/genizy/google-class/master/temple-run-2/index.html",
      id: "30"
    },
    terraria: {
      title: "TERRARIA",
      url: "https://raw.githack.com/web-ports/terraria/main/index.html",
      id: "31"
    },
    tombofthemask: {
      title: "TOMB OF THE MASK",
      url: "https://raw.githack.com/rcmcom/tombofthemask/main/index.html",
      id: "32"
    },
    run3: {
      title: "RUN 3",
      url: "https://raw.githack.com/lekug/lekug.github.io/main/tn6pS9dCf37xAhkJv/index.html",
      id: "33"
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-x-hidden relative">
      {/* Cool & Performant Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Animated Gradient Base */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Custom Background Image */}
        {bgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}

        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-white/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/10 rounded-full blur-[100px]"
        />

        {/* Static Grid Base */}
        <div className="absolute inset-0 opacity-[0.07]" 
             style={{ backgroundImage: 'linear-gradient(to bottom, #444 1px, transparent 1px), linear-gradient(to right, #444 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        
        {/* Static CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] z-20 bg-[length:100%_4px] pointer-events-none opacity-[0.03]" />

        {/* Performant Scan Beam */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[40vh] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent z-10"
        />

        {/* Subtle Animated Scanlines */}
        <motion.div 
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 3px, transparent 4px)' }}
        />

        {/* Vignette (Static) */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)] z-40 pointer-events-none" />
      </div>
      
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => setCurrentGame(null)}
          >
            <motion.div 
              whileHover={{ rotate: 90, scale: 1.1 }}
              style={{ backgroundColor: 'var(--accent)' }}
              className="w-11 h-11 rounded-none flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
            >
              <Gamepad2 className="text-black w-6 h-6" />
            </motion.div>
            <div className="flex">
              {logoText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="text-xl font-black tracking-tighter text-white"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {currentGame && (
              <button 
                onClick={() => setCurrentGame(null)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> BACK_TO_ARCHIVE
              </button>
            )}
            
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <header className="mb-20 relative text-center">
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 100,
              duration: 0.8
            }}
          >
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-4 leading-[0.8] uppercase italic text-white">
              JOSHUA'S <br />
              <span className="not-italic">ARCADE.</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mt-8" />
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {!currentGame ? (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-7xl space-y-12"
            >
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <input 
                  type="text"
                  placeholder="SEARCH_ARCHIVE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/20 px-6 py-4 text-xs font-black tracking-[0.3em] uppercase focus:border-white outline-none transition-all placeholder:text-white/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {Object.entries(gameInfo)
                  .filter(([_, info]) => info.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(([id, info]) => (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentGame(id)}
                      className="group relative aspect-video bg-black border border-white/10 hover:border-white transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm border-b border-white/5 z-10">
                        <span className="text-white/90 text-[11px] font-black uppercase tracking-[0.4em] block text-center group-hover:text-white transition-colors">
                          {info.title}
                        </span>
                      </div>
                      <div className="border-2 border-white px-10 py-4 group-hover:bg-white group-hover:text-black transition-all relative z-10">
                        <span className="text-2xl font-black uppercase tracking-[0.2em] italic">PLAY NOW</span>
                      </div>
                      <div className="absolute bottom-6 text-[9px] font-black text-white/10 uppercase tracking-widest">
                        ARCHIVE_ID_{info.id}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4 }}
              ref={containerRef}
              className="w-full aspect-video max-w-5xl bg-black border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-12 bg-black/80 border-b border-white/10 flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                    {gameInfo[currentGame].title} // {gameInfo[currentGame].id}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white/40 hover:text-white transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={toggleFullscreen}
                      className="text-white/40 hover:text-white transition-colors"
                      title="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-white/10" />
                    <button 
                      onClick={() => setCurrentGame(null)}
                      className="text-white/40 hover:text-red-500 transition-colors flex items-center gap-2"
                      title="Close Game"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">CLOSE</span>
                    </button>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-widest animate-pulse">System Active</div>
                </div>
              </div>
              
              <iframe 
                src={gameInfo[currentGame].url}
                className={`w-full h-full pt-12 border-none relative z-10 ${isMuted ? 'pointer-events-none opacity-50' : ''}`}
                title={gameInfo[currentGame].title}
                allow="autoplay; fullscreen; keyboard"
              />

              {/* Recovery Overlay */}
              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => window.open(gameInfo[currentGame].url, '_blank')}
                  className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-2xl"
                >
                  Game not loading? Open in new tab
                </button>
              </div>

              {/* Boot Sequence Overlay */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute inset-0 pt-12 bg-black z-30 flex flex-col items-center justify-center pointer-events-none"
              >
                <div className="w-64 h-1 bg-white/10 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white"
                  />
                </div>
                <span className="mt-4 text-[10px] font-black tracking-[0.5em] text-white/40 uppercase animate-pulse">
                  Initializing Terminal...
                </span>
              </motion.div>

              {isMuted && (
                <div className="absolute inset-0 pt-12 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                  <span className="text-[10px] font-black uppercase tracking-[1em] text-white/40">Audio Muted</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
          <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.5em]">
            Direct Access Terminal // Multi-Archive Support Enabled
          </p>
        </div>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-black border border-white/10 p-12 shadow-[0_0_100px_rgba(255,255,255,0.1)]"
            >
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-12">
                <header className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">Terminal Settings</h2>
                    <div className="w-12 h-1 bg-white mt-4" />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSettingsTab('general')}
                      className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${settingsTab === 'general' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}
                    >
                      <Globe className="w-4 h-4" /> General
                    </button>
                    <button 
                      onClick={() => setSettingsTab('customization')}
                      className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${settingsTab === 'customization' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}
                    >
                      <Paintbrush className="w-4 h-4" /> Custom
                    </button>
                  </div>
                </header>

                <AnimatePresence mode="wait">
                  {settingsTab === 'general' ? (
                    <motion.div 
                      key="general"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                      {/* Tab Cloaking */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 text-white/40">
                          <Shield className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Tab Cloaking</span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            {presets.map((preset) => (
                              <button
                                key={preset.name}
                                onClick={() => {
                                  setCloakTitle(preset.title);
                                  setCloakFavicon(preset.icon);
                                }}
                                className="px-4 py-3 bg-white/5 border border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-widest transition-all text-left"
                              >
                                {preset.name}
                              </button>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Custom Title</span>
                            <input 
                              type="text"
                              value={cloakTitle}
                              onChange={(e) => setCloakTitle(e.target.value)}
                              className="w-full bg-black border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:border-white outline-none transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Custom Favicon URL</span>
                            <input 
                              type="text"
                              value={cloakFavicon}
                              onChange={(e) => setCloakFavicon(e.target.value)}
                              placeholder="https://example.com/favicon.ico"
                              className="w-full bg-black border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:border-white outline-none transition-all"
                            />
                          </div>
                        </div>
                      </section>

                      {/* Stealth Mode */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 text-white/40">
                          <Globe className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Stealth Mode</span>
                        </div>

                        <div className="space-y-4">
                          <button
                            onClick={openAboutBlank}
                            className="w-full group flex items-center justify-between px-6 py-8 bg-white text-black hover:bg-emerald-400 transition-all"
                          >
                            <div className="text-left">
                              <div className="text-xs font-black uppercase tracking-widest">Open in about:blank</div>
                              <div className="text-[9px] font-bold uppercase tracking-tighter opacity-60 mt-1">Hides site from history</div>
                            </div>
                            <ExternalLink className="w-5 h-5" />
                          </button>

                          <div className="p-6 border border-white/5 bg-white/[0.02] space-y-3">
                            <div className="flex items-center gap-2 text-white/40">
                              <Shield className="w-3 h-3" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Security Note</span>
                            </div>
                            <p className="text-[9px] leading-relaxed text-white/30 font-medium uppercase tracking-wider">
                              Tab cloaking and about:blank features are designed to provide privacy. Use responsibly within your network guidelines.
                            </p>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="customization"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                      {/* Presets & Colors */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 text-white/40">
                          <Palette className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Theme Presets</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {customPresets.map((preset) => (
                            <button
                              key={preset.name}
                              onClick={() => {
                                setAccentColor(preset.accent);
                                setFontFamily(preset.font);
                                setBgImage(preset.bg);
                              }}
                              className="px-4 py-3 bg-white/5 border border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-widest transition-all text-left"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Accent Color</span>
                            <div className="flex gap-3">
                              <input 
                                type="color"
                                value={accentColor}
                                onChange={(e) => setAccentColor(e.target.value)}
                                className="w-12 h-12 bg-transparent border-none cursor-pointer"
                              />
                              <input 
                                type="text"
                                value={accentColor}
                                onChange={(e) => setAccentColor(e.target.value)}
                                className="flex-1 bg-black border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:border-white outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Font Family</span>
                            <select 
                              value={fontFamily}
                              onChange={(e) => setFontFamily(e.target.value)}
                              className="w-full bg-black border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:border-white outline-none"
                            >
                              <option value="Inter">Inter (Sans)</option>
                              <option value="JetBrains Mono">JetBrains Mono</option>
                              <option value="Space Grotesk">Space Grotesk</option>
                              <option value="Playfair Display">Playfair Display</option>
                            </select>
                          </div>
                        </div>
                      </section>

                      {/* Background Image */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 text-white/40">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Background Image</span>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Image URL</span>
                            <input 
                              type="text"
                              value={bgImage}
                              onChange={(e) => setBgImage(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full bg-black border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest uppercase focus:border-white outline-none transition-all"
                            />
                          </div>

                          {bgImage && (
                            <div className="aspect-video w-full bg-black border border-white/10 overflow-hidden relative group">
                              <img 
                                src={bgImage} 
                                alt="Preview" 
                                className="w-full h-full object-cover opacity-60"
                                referrerPolicy="no-referrer"
                              />
                              <button 
                                onClick={() => setBgImage("")}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-black uppercase tracking-widest"
                              >
                                Remove Image
                              </button>
                            </div>
                          )}

                          <div className="p-6 border border-white/5 bg-white/[0.02] space-y-3">
                            <div className="flex items-center gap-2 text-white/40">
                              <Type className="w-3 h-3" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Tip</span>
                            </div>
                            <p className="text-[9px] leading-relaxed text-white/30 font-medium uppercase tracking-wider">
                              Use high-resolution URLs from sites like Unsplash for the best results. The image will be blended with the terminal's dark aesthetic.
                            </p>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 py-24 mt-40 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-all cursor-default">
            <Gamepad2 className="w-10 h-10 text-white" />
            <span className="font-black tracking-tighter text-3xl uppercase italic text-white">JOSHUA'S ARCADE</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-white/10 text-[10px] tracking-[0.6em] uppercase font-black">
              EST. 2026 // ARCHIVE_TERMINAL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
