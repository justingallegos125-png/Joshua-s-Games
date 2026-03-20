import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Gamepad2, Volume2, VolumeX, Maximize, ChevronLeft, X, Settings, Globe, Shield, ExternalLink, Paintbrush, Image as ImageIcon, Type, Palette, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const LOGO_TEXT = "JOSHUA'S EMULATOR";

const PRESETS = [
  { name: "Default", title: "JOSHUA'S EMULATOR", icon: "./favicon.svg" },
  { name: "Google Classroom", title: "Classes", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
  { name: "Edpuzzle", title: "Edpuzzle", icon: "https://edpuzzle.imgix.net/favicon.png" },
  { name: "Google", title: "Google", icon: "https://www.google.com/favicon.ico" },
];

const CUSTOM_PRESETS = [
  { name: "Matrix", accent: "#00ff41", font: "JetBrains Mono", bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" },
  { name: "Cyberpunk", accent: "#ff00ff", font: "Inter", bg: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2070" },
  { name: "Deep Sea", accent: "#00d4ff", font: "Inter", bg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=2070" },
  { name: "", accent: "#ffffff", font: "JetBrains Mono", bg: "" },
];

const GAME_INFO: Record<string, { title: string; url: string; id: string; thumbnail?: string }> = {
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
    id: "03",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/60/Friday_Night_Funkin%27_logo.png"
  },
  baldi: {
    title: "BALDI'S BASICS PLUS",
    url: "https://raw.githack.com/genizy/web-port/main/baldi-plus/index.html",
    id: "04"
  },
  bendy: {
    title: "BENDY",
    url: "https://raw.githack.com/genizy/web-port/main/bendy/index.html",
    id: "05"
  },
  bottlejump: {
    title: "BOTTLE JUMP 3D",
    url: "https://raw.githack.com/bubbls/youtube-playables/main/bottle-jump-3d/index.html",
    id: "06"
  },
  bowmasters: {
    title: "BOWMASTERS",
    url: "https://raw.githack.com/bubbls/youtube-playables/main/bowmasters/index.html",
    id: "07"
  },
  cookieclicker: {
    title: "COOKIE CLICKER",
    url: "https://raw.githack.com/bubbls/UGS-Assets/main/cookieclicker/index.html",
    id: "08"
  },
  crossyroad: {
    title: "CROSSY ROAD",
    url: "https://raw.githack.com/bubbls/youtube-playables/main/crossy-road/index.html",
    id: "09"
  },
  cuphead: {
    title: "CUPHEAD",
    url: "https://raw.githack.com/web-ports/cuphead/main/index.html",
    id: "10"
  },
  elasticface: {
    title: "ELASTIC FACE",
    url: "https://raw.githack.com/bubbls/UGS-Assets/main/elasticman/index.html",
    id: "11"
  },
  fnaf1: {
    title: "FNAF 1",
    url: "https://raw.githack.com/genizy/fnaf/main/1/index.html",
    id: "12"
  },
  fnaf2: {
    title: "FNAF 2",
    url: "https://raw.githack.com/genizy/fnaf/main/2/index.html",
    id: "13"
  },
  fnaf3: {
    title: "FNAF 3",
    url: "https://raw.githack.com/genizy/fnaf/main/3/index.html",
    id: "14"
  },
  fnaf4: {
    title: "FNAF 4",
    url: "https://raw.githack.com/genizy/fnaf/main/4/index.html",
    id: "15"
  },
  fnafps: {
    title: "FNAF PIZZERIA SIM",
    url: "https://raw.githack.com/genizy/fnaf/main/ps/index.html",
    id: "16"
  },
  fnafsl: {
    title: "FNAF SISTER LOCATION",
    url: "https://raw.githack.com/genizy/fnaf/main/sl/index.html",
    id: "17"
  },
  fnafucn: {
    title: "FNAF UCN",
    url: "https://raw.githack.com/genizy/fnaf/main/ucn/index.html",
    id: "18"
  },
  fnafworld: {
    title: "FNAF WORLD",
    url: "https://raw.githack.com/genizy/fnaf/main/w/index.html",
    id: "19"
  },
  fruitninja: {
    title: "FRUIT NINJA",
    url: "https://raw.githack.com/bubbls/UGS-Assets/main/fruit%20ninja/index.html",
    id: "20"
  },
  geometrydash: {
    title: "GEOMETRY DASH",
    url: "https://raw.githack.com/genizy/google-class/main/gdlite/index.html",
    id: "21"
  },
  granny: {
    title: "GRANNY",
    url: "https://raw.githack.com/gru6nny/ohd/main/index.html",
    id: "22"
  },
  hotlinemiami: {
    title: "HOTLINE MIAMI",
    url: "https://raw.githack.com/genizy/web-port/main/hotline-miami/index.html",
    id: "23"
  },
  jellymario: {
    title: "JELLY MARIO",
    url: "https://raw.githack.com/gn-math/assets/main/315/index.html",
    id: "24"
  },
  magictiles3: {
    title: "MAGIC TILES 3",
    url: "https://raw.githack.com/bubbls/youtube-playables/main/magic-tiles-3/index.html",
    id: "25"
  },
  stickmanhook: {
    title: "STICKMAN HOOK",
    url: "https://raw.githack.com/genizy/google-class/main/stickman-hook/index.html",
    id: "26"
  },
  sm64: {
    title: "SUPER MARIO 64",
    url: "https://raw.githack.com/ArkShocer/sm64/main/index.html",
    id: "27",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/33/Super_Mario_64_box_art.jpg"
  },
  templerun2: {
    title: "TEMPLE RUN 2",
    url: "https://raw.githack.com/genizy/google-class/main/temple-run-2/index.html",
    id: "28"
  },
  terraria: {
    title: "TERRARIA",
    url: "https://raw.githack.com/web-ports/terraria/main/index.html",
    id: "29"
  },
  tombofthemask: {
    title: "TOMB OF THE MASK",
    url: "https://raw.githack.com/rcmcom/tombofthemask/main/index.html",
    id: "30"
  },
  run3: {
    title: "RUN 3",
    url: "https://raw.githack.com/lekug/lekug.github.io/main/tn6pS9dCf37xAhkJv/index.html",
    id: "31"
  }
};

export default function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'library' | 'emulator'>('library');
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMemeMode, setIsMemeMode] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'general' | 'customization'>('general');
  
  // Custom Games State
  const [customGames, setCustomGames] = useState<{ id: string; title: string; url: string; type: 'js' | 'html'; thumbnail?: string }[]>(() => {
    const saved = localStorage.getItem('customGames');
    return saved ? JSON.parse(saved) : [];
  });

  // Thumbnails Cache
  const [thumbnails, setThumbnails] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('gameThumbnails');
    return saved ? JSON.parse(saved) : {};
  });

  // Cloaking State
  const [cloakTitle, setCloakTitle] = useState(localStorage.getItem('cloakTitle') || "JOSHUA'S EMULATOR");
  const [cloakFavicon, setCloakFavicon] = useState(localStorage.getItem('cloakFavicon') || "./favicon.svg");
  
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
    link.href = cloakFavicon || "favicon.svg";
    
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

  const fetchingRef = useRef<Set<string>>(new Set());

  const fetchThumbnail = async (gameName: string, gameId: string) => {
    if (thumbnails[gameId] || fetchingRef.current.has(gameId)) return;

    fetchingRef.current.add(gameId);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find a direct, high-quality public image URL for the official cover art or a high-quality screenshot of the game "${gameName}". 
        Return ONLY the raw URL string. 
        No markdown, no quotes, no extra text. 
        If multiple options exist, pick the most iconic one. 
        Example: https://example.com/game-art.jpg`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const url = response.text?.trim().replace(/['"`]/g, '');
      if (url && url.startsWith('http')) {
        setThumbnails(prev => {
          const updated = { ...prev, [gameId]: url };
          localStorage.setItem('gameThumbnails', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error(`Error fetching thumbnail for ${gameName}:`, error);
    } finally {
      fetchingRef.current.delete(gameId);
    }
  };

  useEffect(() => {
    const fetchAllThumbnails = async () => {
      // Library games
      for (const [id, info] of Object.entries(GAME_INFO)) {
        if (!thumbnails[id] && !info.thumbnail) {
          await fetchThumbnail(info.title, id);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      // Custom games
      for (const game of customGames) {
        if (!thumbnails[game.id] && !game.thumbnail) {
          await fetchThumbnail(game.title, game.id);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    };

    fetchAllThumbnails();
  }, [customGames]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      let url = "";
      let type: 'js' | 'html' = 'html';

      if (file.name.endsWith('.js')) {
        type = 'js';
        // For JS files, we create a simple HTML wrapper
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>body, html { margin: 0; padding: 0; height: 100%; background: black; color: white; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }</style>
            </head>
            <body>
              <div id="game-container"></div>
              <script>${content}<\/script>
            </body>
          </html>
        `;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        url = URL.createObjectURL(blob);
      } else if (file.name.endsWith('.html')) {
        const blob = new Blob([content], { type: 'text/html' });
        url = URL.createObjectURL(blob);
      }

      if (url) {
        const newGame = {
          id: `custom_${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, "").toUpperCase(),
          url: url,
          type: type
        };
        const updatedGames = [...customGames, newGame];
        setCustomGames(updatedGames);
        localStorage.setItem('customGames', JSON.stringify(updatedGames.map(g => ({ ...g, url: '' })))); // Don't store blob URLs
        setIsUploadOpen(false);
      }
    };

    if (file.name.endsWith('.js') || file.name.endsWith('.html')) {
      reader.readAsText(file);
    } else {
      alert("Please upload a .js or .html file");
    }
  };

  const deleteCustomGame = (id: string) => {
    const updated = customGames.filter(g => g.id !== id);
    setCustomGames(updated);
    localStorage.setItem('customGames', JSON.stringify(updated.map(g => ({ ...g, url: '' }))));
  };

  const allGames = useMemo(() => ({ 
    ...GAME_INFO, 
    ...customGames.reduce((acc, g) => ({ ...acc, [g.id]: g }), {}) 
  }), [customGames]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const MemeButton = ({ color, children, className = "", onClick }: { color: string, children?: React.ReactNode, className?: string, onClick?: () => void, key?: any }) => {
    const colors: Record<string, string> = {
      orange: "from-[#FFA500] to-[#FF8C00] border-[#D2691E] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      green: "from-[#7CFC00] to-[#32CD32] border-[#228B22] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      blue: "from-[#1E90FF] to-[#0000FF] border-[#00008B] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      purple: "from-[#9370DB] to-[#8A2BE2] border-[#4B0082] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      pink: "from-[#FF69B4] to-[#FF1493] border-[#C71585] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      yellow: "from-[#FFFF00] to-[#FFD700] border-[#B8860B] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      lightBlue: "from-[#87CEFA] to-[#00BFFF] border-[#4682B4] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      lightGreen: "from-[#98FB98] to-[#90EE90] border-[#2E8B57] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      tan: "from-[#F5F5DC] to-[#DEB887] border-[#A0522D] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
      white: "from-[#FFFFFF] to-[#F0F0F0] border-[#CCCCCC] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_rgba(0,0,0,0.2)]",
    };

    return (
      <motion.div 
        whileHover={{ scale: 1.05, translateY: -2 }}
        whileTap={{ scale: 0.95, translateY: 2 }}
        onClick={onClick}
        className={`bg-gradient-to-b border-4 rounded-2xl ${colors[color] || colors.orange} ${className} flex items-center justify-center cursor-pointer transition-all active:shadow-none`}
      >
        {children}
      </motion.div>
    );
  };

  if (isMemeMode && !currentGame) {
    const filteredGames = Object.entries(allGames)
      .filter(([_, info]) => (info as any).title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 18);

    const buttonColors = ['orange', 'green', 'blue', 'purple', 'pink'];

    return (
      <div className="min-h-screen bg-[#87CEEB] overflow-hidden relative font-['Comic_Sans_MS',_cursive] p-4">
        {/* Cartoon Background Elements */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#87CEEB] to-[#E0F6FF]">
          {/* Clouds */}
          <div className="absolute top-10 left-[10%] w-24 h-12 bg-white rounded-full opacity-80" />
          <div className="absolute top-15 left-[15%] w-20 h-10 bg-white rounded-full opacity-80" />
          <div className="absolute top-5 right-[20%] w-32 h-16 bg-white rounded-full opacity-80" />
          
          {/* Hills */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] flex items-end">
             <div className="absolute bottom-0 left-[-10%] w-[60%] h-[80%] bg-[#4CAF50] rounded-[100%_100%_0_0] border-t-8 border-[#388E3C]" />
             <div className="absolute bottom-0 right-[-10%] w-[60%] h-[90%] bg-[#66BB6A] rounded-[100%_100%_0_0] border-t-8 border-[#43A047]" />
             <div className="absolute bottom-0 left-[20%] w-[60%] h-[70%] bg-[#81C784] rounded-[100%_100%_0_0] border-t-8 border-[#4CAF50]" />
          </div>

          {/* Path */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[30%] bg-[#D2B48C] rounded-[100%_100%_0_0] border-t-8 border-[#A0522D]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto pt-12">
          {/* Top Bar Navigation */}
          <div className="relative mb-12">
            <div className="absolute -top-16 left-4 transform -rotate-12 z-20">
              <div className="relative">
                <div className="w-28 h-20 bg-[#8B4513] rounded-3xl border-4 border-[#5D2E0C] shadow-2xl flex items-center justify-center">
                  <Gamepad2 className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-2 border-white" />
              </div>
            </div>
            
            <div className="bg-[#FFD700] border-[8px] border-[#DAA520] rounded-[4rem] p-4 flex justify-center gap-4 shadow-[0_10px_0_rgba(0,0,0,0.1)]">
              {buttonColors.map((c, i) => (
                <MemeButton key={i} color={c} className="w-36 h-14" />
              ))}
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="bg-[#6495ED] border-[12px] border-[#4169E1] rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-8">
              {/* Search Bar */}
              <div className="flex justify-center">
                <div className="bg-white rounded-full px-8 py-3 border-4 border-[#4169E1] shadow-inner w-full max-w-2xl">
                  <input 
                    type="text"
                    placeholder="SEARCH GAMES!!!"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-2xl font-bold text-[#4169E1] outline-none placeholder:text-blue-200 text-center"
                  />
                </div>
              </div>

              {/* Featured Area */}
              <div className="bg-[#FFE4B5] border-8 border-[#DEB887] rounded-[2rem] h-52 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#8B4513 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                <h2 className="text-6xl font-black text-[#8B4513] italic drop-shadow-lg uppercase tracking-tighter">FEATURED!</h2>
              </div>

              {/* Game Grid (6x3) */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {Array.from({ length: 18 }).map((_, i) => {
                  const gameEntry = filteredGames[i];
                  const game = gameEntry ? (gameEntry[1] as any) : null;
                  const colors = ['orange', 'blue', 'purple', 'green', 'yellow', 'pink'];
                  
                  return (
                    <MemeButton 
                      key={i} 
                      color={colors[i % colors.length]} 
                      className="aspect-square relative"
                      onClick={() => gameEntry && setCurrentGame(gameEntry[0])}
                    >
                      {game ? (
                        <div className="flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-[10px] font-black leading-tight text-white drop-shadow-md">{game.title}</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-white/10 rounded-xl" />
                      )}
                    </MemeButton>
                  );
                })}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-80 space-y-8">
              {/* Sidebar Section 1 */}
              <div className="bg-[#F0F8FF] border-8 border-[#4169E1] rounded-[2.5rem] p-6 space-y-4 shadow-xl">
                {[
                  { c: 'yellow', b: 'white' },
                  { c: 'green', b: 'white' },
                  { c: 'blue', b: 'lightBlue' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <MemeButton color={item.c} className="w-20 h-20 flex-shrink-0" />
                    <div className={`flex-1 bg-gradient-to-b from-white to-gray-100 rounded-2xl border-4 border-gray-200 shadow-inner`} />
                  </div>
                ))}
              </div>

              {/* Sidebar Section 2 */}
              <div className="bg-[#F0F8FF] border-8 border-[#4169E1] rounded-[2.5rem] p-6 space-y-4 shadow-xl">
                <MemeButton color="green" className="h-14 w-full" />
                <MemeButton color="tan" className="h-24 w-full" />
                <MemeButton color="white" className="h-14 w-full" />
                <MemeButton color="purple" className="h-14 w-full" onClick={() => setIsMemeMode(false)}>
                  <span className="font-bold text-white text-xl">EXIT!</span>
                </MemeButton>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Settings */}
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="fixed bottom-8 right-8 w-20 h-20 bg-white border-8 border-[#4169E1] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
        >
          <Settings className="w-10 h-10 text-[#4169E1]" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-x-hidden relative">
      {/* Optimized Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-black" />
        
        {bgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}

        {/* Static Glows instead of animated blur blobs */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[100px]" />

        {/* Static Grid Base */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(to bottom, #444 1px, transparent 1px), linear-gradient(to right, #444 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        
        {/* Static CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] z-20 bg-[length:100%_4px] pointer-events-none opacity-[0.02]" />

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
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex"
            >
              <span className="text-xl font-black tracking-tighter text-white">
                {LOGO_TEXT}
              </span>
            </motion.div>
          </div>

          <div className="flex items-center gap-8">
            {currentGame && (
              <button 
                onClick={() => setCurrentGame(null)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> BACK_TO_LIBRARY
              </button>
            )}
            
            <button 
              onClick={() => setIsMemeMode(!isMemeMode)}
              className={`w-10 h-10 flex items-center justify-center transition-all ${isMemeMode ? 'text-yellow-400 bg-yellow-400/10' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              title="Meme Mode"
            >
              <Palette className="w-5 h-5" />
            </button>

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
              <span className="not-italic">EMULATOR.</span>
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
              {/* Tabs & Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
                <div className="flex gap-2 p-1 bg-white/5 border border-white/10">
                  <button 
                    onClick={() => setActiveTab('library')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'library' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                  >
                    LIBRARY
                  </button>
                  <button 
                    onClick={() => setActiveTab('emulator')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'emulator' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                  >
                    JOSHUAS EMULATOR
                  </button>
                </div>

                <div className="relative flex-1 w-full">
                  <input 
                    type="text"
                    placeholder="SEARCH_SYSTEM..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/20 px-6 py-4 text-xs font-black tracking-[0.3em] uppercase focus:border-white outline-none transition-all placeholder:text-white/20"
                  />
                </div>

                {activeTab === 'emulator' && (
                  <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="px-8 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    INPUT GAMES
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {activeTab === 'library' ? (
                  Object.entries(GAME_INFO)
                    .filter(([_, info]) => info.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(([id, info]) => (
                      <motion.div
                        key={id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentGame(id)}
                        className="group relative aspect-video bg-black border border-white/10 hover:border-white transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
                      >
                        {/* Thumbnail Image */}
                        {(thumbnails[id] || info.thumbnail) ? (
                          <img 
                            src={thumbnails[id] || info.thumbnail} 
                            alt={info.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                            <Search className="w-8 h-8 text-white/10 animate-pulse" />
                          </div>
                        )}

                        <div className="absolute top-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm border-b border-white/5 z-10">
                          <span className="text-white/90 text-[11px] font-black uppercase tracking-[0.4em] block text-center group-hover:text-white transition-colors">
                            {info.title}
                          </span>
                        </div>
                        <div className="border-2 border-white px-10 py-4 group-hover:bg-white group-hover:text-black transition-all relative z-10 bg-black/40 backdrop-blur-sm">
                          <span className="text-2xl font-black uppercase tracking-[0.2em] italic">PLAY NOW</span>
                        </div>
                        <div className="absolute bottom-6 text-[9px] font-black text-white/10 uppercase tracking-widest z-10">
                          {info.id}
                        </div>
                      </motion.div>
                    ))
                ) : (
                  customGames
                    .filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((game) => (
                      <motion.div
                        key={game.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative aspect-video bg-black border border-white/10 hover:border-white transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
                      >
                        {/* Thumbnail Image */}
                        {(thumbnails[game.id] || game.thumbnail) ? (
                          <img 
                            src={thumbnails[game.id] || game.thumbnail} 
                            alt={game.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                            <Search className="w-8 h-8 text-white/10 animate-pulse" />
                          </div>
                        )}

                        <div 
                          onClick={() => setCurrentGame(game.id)}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                          <div className="absolute top-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm border-b border-white/5 z-10">
                            <span className="text-white/90 text-[11px] font-black uppercase tracking-[0.4em] block text-center group-hover:text-white transition-colors">
                              {game.title}
                            </span>
                          </div>
                          <div className="border-2 border-white px-10 py-4 group-hover:bg-white group-hover:text-black transition-all relative z-10 bg-black/40 backdrop-blur-sm">
                            <span className="text-2xl font-black uppercase tracking-[0.2em] italic">EMULATE</span>
                          </div>
                          <div className="absolute bottom-6 text-[9px] font-black text-white/10 uppercase tracking-widest z-10">
                            EMU_TYPE_{game.type.toUpperCase()}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteCustomGame(game.id); }}
                          className="absolute top-4 right-4 z-20 p-2 bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))
                )}
                {activeTab === 'emulator' && customGames.length === 0 && (
                  <div className="col-span-full py-20 text-center border border-dashed border-white/10">
                    <p className="text-white/20 font-black text-xs uppercase tracking-[0.5em]">No games detected in memory. Use "INPUT GAMES" to begin.</p>
                  </div>
                )}
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
                    {allGames[currentGame]?.title} // {allGames[currentGame]?.id}
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
                src={allGames[currentGame]?.url}
                className={`w-full h-full pt-12 border-none relative z-10 ${isMuted ? 'pointer-events-none opacity-50' : ''}`}
                title={allGames[currentGame]?.title}
                allow="autoplay; fullscreen; keyboard"
              />

              {/* Recovery Overlay */}
              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => window.open(allGames[currentGame]?.url, '_blank')}
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
                  Initializing...
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
            Direct Access // Multi-Library Support Enabled
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
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">Settings</h2>
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
                            {PRESETS.map((preset) => (
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

                          <button
                            onClick={() => {
                              localStorage.removeItem('gameThumbnails');
                              setThumbnails({});
                              // The useEffect will pick up the changes on next render or we can trigger it
                              window.location.reload();
                            }}
                            className="w-full group flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                          >
                            <div className="text-left">
                              <div className="text-[10px] font-black uppercase tracking-widest">Clear Thumbnail Cache</div>
                              <div className="text-[9px] font-bold uppercase tracking-tighter opacity-40 mt-1">Force re-fetch from web</div>
                            </div>
                            <Search className="w-4 h-4" />
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
                          {CUSTOM_PRESETS.map((preset) => (
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
                              Use high-resolution URLs from sites like Unsplash for the best results. The image will be blended with the dark aesthetic.
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

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-black border border-white/10 p-12 shadow-[0_0_100px_rgba(255,255,255,0.1)]"
            >
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8 text-center">
                <header>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">INPUT GAMES</h2>
                  <div className="w-12 h-1 bg-white mx-auto mt-4" />
                </header>

                <div className="p-12 border-2 border-dashed border-white/10 hover:border-white/40 transition-all group relative cursor-pointer">
                  <input 
                    type="file" 
                    accept=".js,.html"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase tracking-widest">Drop JS/HTML File</p>
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">Max size 5MB // Local Session Only</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 text-left space-y-3">
                  <div className="flex items-center gap-2 text-white/40">
                    <Shield className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Emulator Protocol</span>
                  </div>
                  <p className="text-[9px] leading-relaxed text-white/30 font-medium uppercase tracking-wider">
                    Uploaded games are stored in your browser's temporary memory. JS files will be wrapped in a standard emulator environment.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 py-24 mt-40 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-all cursor-default">
            <Gamepad2 className="w-10 h-10 text-white" />
            <span className="font-black tracking-tighter text-3xl uppercase italic text-white">JOSHUA'S EMULATOR</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-white/10 text-[10px] tracking-[0.6em] uppercase font-black">
              EST. 2026 // LIBRARY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
