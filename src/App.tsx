import React, { useState, useEffect } from 'react';
import { Download, ShieldCheck, Cloud, Globe, BookOpen, Smartphone, ChevronRight, Menu, X, CheckCircle, FileText, Info, Sun, Moon, Star, MessageSquare, HelpCircle, Send, Banknote, MessageCircle, Sparkles, Check, Loader2, Mail, Phone, Lock, Scale, Copyright, Database, EyeOff, HardDrive, Bell, Camera, ExternalLink, BadgeCheck, Folder } from 'lucide-react';
import { ThreeBackground } from './components/ThreeBackground';
import { LiveStatsBanner, trackApkDownload } from './components/LiveStatsBanner';
import { PhoneShowcase3D } from './components/PhoneShowcase3D';
import { db } from './lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

type Page = 'home' | 'about' | 'privacy' | 'terms';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Derive currentPage from the URL pathname
  const getCurrentPage = (): Page => {
    switch (location.pathname) {
      case '/about': return 'about';
      case '/privacy': return 'privacy';
      case '/terms': return 'terms';
      default: return 'home';
    }
  };
  
  const currentPage = getCurrentPage();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navigateTo = (page: Page) => {
    const paths = {
      home: '/',
      about: '/about',
      privacy: '/privacy',
      terms: '/terms'
    };
    navigate(paths[page]);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-100 font-sans overflow-x-hidden text-slate-900 dark:text-slate-50 transition-colors duration-500">
      <ThreeBackground isDark={isDark} />
      
      {/* Navbar - Glassmorphic */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-emerald-900/10 dark:border-white/10 shadow-lg transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-shadow flex-shrink-0">
              <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-300 dark:to-teal-100 bg-clip-text text-transparent leading-none">
                Raqam Flow
              </span>
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 mt-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] sm:text-[11px] font-semibold backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>v1.0.0 is Live!</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks navigateTo={navigateTo} currentPage={currentPage} />
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a 
              href="https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1" 
              onClick={trackApkDownload}
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white dark:text-emerald-950 bg-emerald-600 dark:bg-emerald-400 rounded-full group hover:bg-emerald-500 dark:hover:bg-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] dark:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="font-semibold">Download APK</span>
              </span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 active:scale-95 transition-transform"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 active:scale-95 transition-transform"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-5 py-6 flex flex-col space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <NavLinks navigateTo={navigateTo} currentPage={currentPage} isMobile />
            <div className="pt-2">
              <a 
                href="https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1" 
                onClick={trackApkDownload}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 font-bold rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-transform text-base"
              >
                <Download className="w-5 h-5" />
                <span>Direct Download APK</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-16 min-h-screen">
        <Routes>
          <Route path="/" element={<HomeSection navigateTo={navigateTo} />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/privacy" element={<PrivacySection />} />
          <Route path="/terms" element={<TermsSection />} />
        </Routes>
      </main>

      {/* Footer - Glassmorphic */}
      <footer className="relative z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-t border-slate-200 dark:border-white/5 pt-12 pb-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => navigateTo('home')}>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30">
                  <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">Raqam Flow</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                Empowering business owners and shopkeepers in Pakistan with a secure, offline-first digital ledger.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><button onClick={() => navigateTo('home')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Raqam Flow. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with ❤️ for Pakistan | Created By Muhammad Yousuf Noori</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLinks({ navigateTo, currentPage, isMobile = false }: { navigateTo: (p: Page) => void, currentPage: Page, isMobile?: boolean }) {
  const links: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
  ];

  return (
    <>
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => navigateTo(link.id)}
          className={`
            ${isMobile 
              ? 'text-left px-4 py-3 text-base rounded-xl flex items-center justify-between transition-colors' 
              : 'text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-300 flex items-center space-x-1.5'
            } 
            ${currentPage === link.id 
              ? (isMobile ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30' : 'text-emerald-600 dark:text-emerald-400 font-bold') 
              : 'text-slate-600 dark:text-slate-300'
            }
          `}
        >
          <span>{link.label}</span>
        </button>
      ))}
    </>
  );
}

// --- Home Section ---
function HomeSection({ navigateTo }: { navigateTo: (p: Page) => void }) {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-16 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Hero Text */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white">
            Aap Ka Apna Smart <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-300 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Digital Khata
            </span><br className="hidden sm:block" />
            {' '}& Expense Manager
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed transition-colors px-2 sm:px-0">
            Manage daily udhar, keep track of customer ledgers, and secure your business data with 100% automatic Google Drive Cloud Backup.
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
            <a 
              href="https://www.dropbox.com/scl/fi/rtwneeiwbk9qnlu4j2y1y/Raqam-Flow-Ap-Ka-Apna-Digital-Khata.apk?rlkey=ro137r9km6qpm00h9og9rdw2k&st=5qsf9njc&dl=1" 
              onClick={trackApkDownload}
              className="w-full sm:w-auto relative group flex items-center justify-center space-x-3 px-8 py-4 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-2xl font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] active:scale-95 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 dark:bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <Download className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              <span className="relative z-10">Download Raqam Flow</span>
            </a>
          </div>
        </div>
        
        {/* 3D Animated Mobile Showcase Slider */}
        <div className="lg:w-1/2 flex justify-center w-full">
          <PhoneShowcase3D />
        </div>
      </div>

      {/* Real-Time Visitor & Download Metrics Banner */}
      <LiveStatsBanner />

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-500/10 border border-emerald-300/60 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Khata Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Core <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">Feature</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto font-light">
            Designed specifically for shopkeepers and enterprise businesses with cutting-edge security, speed, and real-time offline workflows.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureGlassCard 
            number="01"
            icon={<BookOpen />} 
            title="Dokandar & Customer Khata" 
            desc="Easily manage separate ledgers. Keep clear records of 'Maine Diye' and 'Mujhe Mile' with exact dates."
            badge="Essential"
            features={["Separate Customer/Supplier", "Maine Diye / Mujhe Mile"]}
          />
          <FeatureGlassCard 
            number="02"
            icon={<Banknote />} 
            title="Daily Cashbook" 
            desc="Track daily cash in and cash out easily. View daily profits, cash balances, and expenses in real-time."
            badge="Financial"
            features={["Cash In / Cash Out", "Real-Time Balance"]}
          />
          <FeatureGlassCard 
            number="03"
            icon={<MessageCircle />} 
            title="SMS & WhatsApp Reminders" 
            desc="Send automated payment reminder messages to customers directly via WhatsApp or SMS in a single tap."
            badge="Automation"
            features={["1-Tap WhatsApp share", "Auto Free SMS alerts"]}
          />
          <FeatureGlassCard 
            number="04"
            icon={<Smartphone />} 
            title="Offline Local Storage" 
            desc="Works entirely offline. All transactions are saved locally on your phone instantly without internet."
            badge="Fast & Safe"
            features={["100% Zero-Lag Speed", "No Internet Required"]}
          />
          <FeatureGlassCard 
            number="05"
            icon={<Cloud />} 
            title="Google Cloud Backup" 
            desc="100% automatic secure backups to your own Google Drive. Never lose your business data."
            badge="1-Click Sync"
            features={["Private Google Drive", "Auto Daily Backups"]}
          />
          <FeatureGlassCard 
            number="06"
            icon={<Globe />} 
            title="9+ Languages Supported" 
            desc="Use app in Urdu, Roman Urdu, Pashto, Sindhi, English, Arabic, Persian, Turkish, or French."
            badge="Multilingual"
            features={["Urdu & Roman Urdu", "Regional Pakistani Languages"]}
          />
          <FeatureGlassCard 
            number="07"
            icon={<ShieldCheck />} 
            title="High Security" 
            desc="Your data is encrypted. Lock your app using built-in PIN or Biometric Fingerprint."
            badge="Encrypted"
            features={["Biometric Fingerprint", "Device Encryption"]}
          />
          <FeatureGlassCard 
            number="08"
            icon={<HelpCircle />} 
            title="Business Reports" 
            desc="Generate detailed PDFs and reports of your daily sales and customer ledgers easily."
            badge="Export PDF"
            features={["Printable PDF Statements", "Date-Range Filters"]}
          />
        </div>

        {/* How to install "Raqam Flow Apk ka Apna Digital Khata App" Section */}
        <div className="mt-16 relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-amber-500/40 shadow-2xl overflow-hidden">
          <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    How to install "Raqam Flow Apk ka Apna Digital Khata App"
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Step-by-step guide to download & install the official Android APK</p>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Easy Installation
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                      1
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Step 1
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                    Download Official APK
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Click the "Download APK" button on this website to save the official Raqam Flow Android installer package.
                  </p>
                </div>

                {/* Step 1 Android Internal Storage Screenshot Graphic with Highlighted APK */}
                <div className="w-full rounded-2xl bg-slate-900 border border-emerald-500/40 p-3 flex flex-col justify-between overflow-hidden relative shadow-lg">
                  {/* Phone Screen Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center space-x-1.5 font-bold text-slate-300">
                      <Folder className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Internal storage</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-sans font-bold border border-emerald-500/20">
                      Step 1 Screenshot
                    </span>
                  </div>

                  {/* Android File Explorer Mockup List matching User Screenshot */}
                  <div className="space-y-1.5 text-xs text-slate-400 font-sans my-1">
                    <div className="flex items-center space-x-2.5 opacity-40 px-2 py-1">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                        <Folder className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px]">DCIM</span>
                    </div>

                    <div className="flex items-center space-x-2.5 opacity-40 px-2 py-1">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                        <Folder className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px]">Android</span>
                    </div>

                    {/* HIGHLIGHTED TARGET ITEM: Raqam Flow APK File */}
                    <div className="relative mt-2 p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] animate-pulse">
                      {/* Highlight Badge */}
                      <div className="absolute -top-3 right-2 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg flex items-center space-x-1">
                        <span>👈 Tap Here to Install</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          {/* Raqam Flow Logo Icon */}
                          <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center overflow-hidden p-0.5 shrink-0 shadow-inner">
                            <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-full" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="font-extrabold text-white text-[11px] truncate tracking-wide">
                              Raqam Flow Ap Ka Apna Digital Khat...
                            </div>
                            <div className="text-[10px] text-emerald-400 font-mono font-medium">
                              35.47 MB • 24 minutes ago
                            </div>
                          </div>
                        </div>

                        {/* Direct Download Icon */}
                        <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                          <Download className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Note */}
                  <div className="mt-2 text-[10px] text-center text-slate-400 bg-slate-950/60 py-1.5 px-2 rounded-lg border border-slate-800 font-semibold">
                    <span className="text-amber-400">نشان زدہ (Highlighted)</span> فائل پر ٹیپ کر کے انسٹالیشن شروع کریں۔
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                      2
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      Step 2
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                    Click "Install Anyway"
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Since this is a custom offline app, Google Play Protect might show a warning. Tap <strong>"Install anyway"</strong> to proceed safely.
                  </p>
                </div>

                {/* Step 2 Screenshot Graphic (Play Protect Dialog) */}
                <div className="w-full rounded-2xl bg-slate-800 border border-amber-500/40 p-3 flex flex-col justify-center items-center overflow-hidden relative shadow-lg h-56">
                  {/* Backdrop representation */}
                  <div className="absolute inset-0 bg-slate-950/60"></div>
                  
                  {/* Google Play Protect Dialog Mockup */}
                  <div className="relative z-10 w-full max-w-[210px] bg-[#f0f2f8] rounded-2xl p-3 shadow-2xl flex flex-col items-center">
                    <ShieldCheck className="w-5 h-5 text-slate-700 mb-1" />
                    <div className="text-[9px] text-slate-600 font-medium mb-2 text-center leading-tight">Google Play Protect</div>
                    <div className="text-[13px] text-slate-800 font-medium text-center leading-tight mb-3 px-2">
                      App blocked to protect your device
                    </div>
                    
                    <div className="flex items-center space-x-2 self-start mb-2 w-full">
                       <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center overflow-hidden p-0.5 shrink-0 relative">
                            <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-full" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#f0f2f8] flex items-center justify-center font-black text-slate-900 text-[8px]">!</div>
                       </div>
                       <div className="text-[11px] text-slate-800 font-medium truncate">Raqam Flow</div>
                    </div>
                    
                    <div className="text-[9px] text-slate-500 text-left w-full leading-relaxed mb-3">
                      Play Protect hasn't seen an app from this developer before. It may be unsafe.
                    </div>
                    
                    <div className="w-full text-left mb-3 pl-1">
                      <div className="relative inline-block">
                        <span className="text-[11px] text-[#415a8c] font-medium relative z-10">Install anyway</span>
                        <div className="absolute -inset-1.5 border-[1.5px] border-amber-500 rounded-md animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.6)] bg-amber-500/10 z-0 pointer-events-none"></div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-[#415a8c] text-white text-[11px] py-1.5 rounded-[10px] text-center font-medium mt-1">
                      OK
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                      3
                    </span>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      Step 3
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">
                    Open the App
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Once installed, tap the <strong>Open</strong> button to start using Raqam Flow!
                  </p>
                </div>

                {/* Step 3 Screenshot Graphic (Install Prompt) */}
                <div className="w-full rounded-2xl bg-slate-800 border border-cyan-500/40 p-3 flex flex-col justify-center items-center overflow-hidden relative shadow-lg h-56">
                  {/* Backdrop representation */}
                  <div className="absolute inset-0 bg-slate-950/60"></div>
                  
                  {/* Install App Dialog Mockup */}
                  <div className="relative z-10 w-full max-w-[210px] bg-[#f0f2f8] rounded-3xl p-4 shadow-2xl flex flex-col">
                    <div className="text-[15px] text-slate-900 font-normal mb-4 text-left pl-1">
                      App installed.
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-8 pl-1">
                       <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center overflow-hidden shrink-0 relative shadow-sm">
                            <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-full" />
                       </div>
                       <div className="text-[13px] text-slate-900 font-medium">Raqam Flow</div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2 mt-2 w-full">
                      <div className="text-[#415a8c] text-[12px] px-3 py-1.5 rounded-full border border-[#dce0e9] font-medium">
                        Close
                      </div>
                      <div className="relative inline-block">
                        <div className="bg-[#415a8c] text-white text-[12px] px-4 py-1.5 rounded-full font-medium relative z-10">
                          Open
                        </div>
                        <div className="absolute -inset-1.5 border-[1.5px] border-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.6)] bg-cyan-400/20 z-0 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & FAQs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 grid lg:grid-cols-2 gap-12">
        <ReviewsSection />
        <FaqSection />
      </div>
    </div>
  );
}

type Review = { id: string; name: string; comment: string; rating: number; date: string };

function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    // Real-time Firestore sync with raqam-flow-noori-app database
    try {
      const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list: Review[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          let dateStr = 'Just now';
          if (data.createdAt) {
            if (data.createdAt instanceof Timestamp) {
              dateStr = data.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            } else if (typeof data.createdAt === 'string') {
              dateStr = new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            }
          }
          list.push({
            id: doc.id,
            name: data.name || 'Anonymous User',
            comment: data.comment || '',
            rating: Number(data.rating) || 5,
            date: dateStr,
          });
        });
        setReviews(list);
        setLoading(false);
      }, (error) => {
        console.warn('Firestore live listen error, falling back:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore initialization fallback:', err);
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || submitting) return;
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        name: name.trim(),
        comment: comment.trim(),
        rating: Number(rating),
        createdAt: serverTimestamp(),
      });
      setName('');
      setComment('');
      setRating(5);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (error) {
      console.error('Error adding comment to Firebase Firestore:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-8 shadow-xl transition-colors duration-500 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Community Reviews</h2>
            </div>
          </div>
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Cloud</span>
          </span>
        </div>

        {/* Reviews List */}
        <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
              <span className="text-sm font-medium">Connecting to Firebase project...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
              <MessageCircle className="w-10 h-10 text-emerald-500/50 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Pehla review aap likhein!</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Aapka feedback direct Firebase cloud database mein save hoga.</p>
            </div>
          ) : (
            reviews.map(r => (
              <div key={r.id} className="bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-white/5 transition-all hover:border-emerald-500/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-sm text-slate-800 dark:text-slate-200">{r.name}</div>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">{r.date}</div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="border-t border-slate-200 dark:border-white/10 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Apna Review / Feedback dein</h3>
          {successMsg && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
              <Check className="w-3.5 h-3.5 mr-1" /> Firebase par save ho gaya!
            </span>
          )}
        </div>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Aapka Naam (Your Name)" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            required
            maxLength={60}
          />
          <textarea 
            placeholder="Raqam Flow app ke baare mein apna tajarba share karein..." 
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none h-20"
            required
            maxLength={500}
          />
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 mr-1.5 font-medium">Rating:</span>
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`w-5 h-5 cursor-pointer transition-all hover:scale-110 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
                />
              ))}
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Post Review</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    { q: "What is Raqam Flow?", a: "Raqam Flow is a secure digital khata (ledger) app designed to replace physical registers. It helps you manage daily sales, udhar, and cashbook entries efficiently." },
    { q: "Is my financial data safe?", a: "Yes. Your data is encrypted and stored locally on your device. For cloud backups, it uses your personal Google Drive, meaning only you have access to your data." },
    { q: "Which languages are supported?", a: "The app supports 9+ languages including Urdu, Roman Urdu, Pashto, Sindhi, English, Arabic, Persian, Turkish, and French. You can switch languages easily in settings." },
    { q: "Does the app work without internet?", a: "Absolutely! Raqam Flow is built with an 'Offline-First' approach. You can record entries offline, and they will sync to your Google Drive backup once you go online." }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl transition-colors duration-500">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
      </div>
      
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-slate-200 dark:border-white/5 pb-6 last:border-0 last:pb-0">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-start">
              <span className="text-emerald-600 dark:text-emerald-400 mr-2 font-black">Q.</span> {faq.q}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm pl-6 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureGlassCard({ 
  number,
  icon, 
  title, 
  desc, 
  badge,
  features
}: { 
  number: string;
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  badge?: string;
  features?: string[];
}) {
  return (
    <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-b from-slate-200/90 via-emerald-500/20 to-slate-200/40 dark:from-emerald-500/30 dark:via-teal-500/10 dark:to-white/5 hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20">
      <div className="h-full w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[22px] p-6 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
        
        {/* Subtle glow orb */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none"></div>
        
        {/* Number watermark in background */}
        <div className="absolute right-4 top-4 text-4xl font-black text-slate-100 dark:text-slate-900 select-none pointer-events-none transition-colors group-hover:text-emerald-500/10 dark:group-hover:text-emerald-400/10">
          {number}
        </div>

        <div>
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-slate-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-emerald-500 group-hover:to-teal-400 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-transparent transition-all duration-300">
              {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
            {badge && (
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:border-emerald-400/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-all shadow-xs">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {desc}
          </p>

          {features && features.length > 0 && (
            <div className="space-y-1.5">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Content Sections (About, Privacy, Terms) ---

const ContentWrapper = ({ 
  title, 
  subTitle, 
  icon, 
  children 
}: { 
  title: string; 
  subTitle?: string; 
  icon: React.ReactNode; 
  children: React.ReactNode 
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 animate-in slide-in-from-bottom-8 duration-700">
    <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 border-b border-slate-200 dark:border-white/10 pb-4 sm:pb-6 gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-2xl flex-shrink-0 border border-emerald-500/20">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h2>
            {subTitle && (
              <p className="font-urdu text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{subTitle}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-slate-700 dark:text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

function SuggestionForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/yousufnoor469@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Suggestion: formData.message,
          _subject: `New Raqam Flow Suggestion: ${formData.subject || 'App Feedback'}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage('Could not send message right now. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="mt-8 sm:mt-12 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-8 shadow-lg relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Send Your Suggestion about App</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Directly sends your feedback to our developer inbox</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 rounded-xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">Shukriya! Suggestion Sent Successfully</h4>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Aapki suggestion directly developer ke inbox par receive ho chuki hai.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Send Another Suggestion
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
              <input
                type="text"
                required
                placeholder="Aapka Naam"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
            <input
              type="text"
              required
              placeholder="e.g. New Feature Idea / Ledger Bug / Feedback"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Suggestion (Body Text)</label>
            <textarea
              required
              rows={4}
              placeholder="Raqam Flow app ke baare mein apni suggestions yahan likhein..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Suggestion to Inbox...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Suggestion</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <ContentWrapper title="About Us" icon={<Info className="w-8 h-8" />}>
      {/* Official App Header Green Card (Matching Android Screenshot Design) */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#065F46] via-[#044E39] to-[#023829] border border-emerald-400/40 shadow-2xl overflow-hidden mb-6 text-center">
        {/* Decorative Background Blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* App Logo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-2xl bg-slate-950 p-1 border-2 border-emerald-400/50 shadow-2xl flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Raqam Flow Logo" className="w-full h-full object-cover rounded-xl" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center mb-3">
            Raqam Flow
          </h2>

          {/* Smart Digital Ledger Pill Badge */}
          <div className="inline-flex flex-col items-center mb-5">
            <span className="px-5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-lg">
              Smart Digital Ledger & Cash Book
            </span>
          </div>

          {/* App Purpose Description */}
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl mx-auto text-center mb-6">
            Raqam Flow is an advanced, offline-first digital accounting companion designed specifically for retail merchants, wholesalers, and small businesses to record credit transactions and track cash flows seamlessly.
          </p>

          {/* Inner Patent & Copyright Legal Box */}
          <div className="bg-[#022c22]/90 backdrop-blur-md border border-amber-500/50 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto flex items-start sm:items-center space-x-3.5 text-left shadow-inner">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0">
              <ShieldCheck className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </div>
            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
              Every single function and feature option of this app is patent & copyright registered. Any unauthorized alteration, tampering, or reproduction is strictly illegal and subject to legal action.
            </p>
          </div>
        </div>
      </div>

      {/* Creator & Version Info Card */}
      <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-2 mb-10">
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
          App Version 1.0.0 Pro Edition
        </p>
        <h3 className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
          <span>Proudly Made in Pakistan</span>
          <span className="text-xl">🇵🇰</span>
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          Created by <span className="font-bold text-slate-900 dark:text-white">Muhammad Yousuf Noori</span>
        </p>
      </div>

      {/* App Highlights & Core Features */}
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-6 flex items-center gap-2">
        <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
        <span>Core Highlights & Features</span>
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {[
          {
            number: "01",
            title: "Customer Credit Ledger",
            desc: "Customer Credit & Udhar Ledger with automatic WhatsApp payment reminders. Track customer balances with absolute clarity.",
            badge: "Udhar Ledger",
            icon: <BookOpen className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          },
          {
            number: "02",
            title: "Daily Cash Book",
            desc: "Income & Expense tracking with net balance calculations, daily cash closing summaries, and clean cash-in/cash-out category logs.",
            badge: "Cash Roznamcha",
            icon: <Banknote className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          },
          {
            number: "03",
            title: "Security & Cloud Backup",
            desc: "100% private Google Drive sync, local offline backups (Jetpack Room SQLite database), and PIN & Biometric Lock security.",
            badge: "Cloud Sync",
            icon: <Cloud className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
          },
          {
            number: "04",
            title: "100% Trust & Complete Control",
            desc: "Run this app with 100% complete trust and total ownership. You hold full control over every single feature without usage limits, hidden barriers, or restrictions.",
            badge: "Total Ownership",
            icon: <ShieldCheck className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          },
          {
            number: "05",
            title: "100% Offline-First Architecture",
            desc: "Operates seamlessly without active internet connection. All ledgers and cashbooks are stored locally in high-speed encrypted Room SQLite database.",
            badge: "Zero-Lag Offline",
            icon: <Database className="w-6 h-6 text-teal-500 dark:text-teal-400" />
          },
          {
            number: "06",
            title: "Dual-Ledger Ecosystem",
            desc: "Seamlessly unifies Customer/Vendor Credit Ledgers (Receivables & Payables) with Daily Cash Flow Roznamcha (Cash In & Cash Out).",
            badge: "Dual Ledger",
            icon: <FileText className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          },
          {
            number: "07",
            title: "Google Drive Cloud Backup",
            desc: "1-Tap Google Drive cloud synchronization and offline JSON export. Restore your business records instantly when switching devices.",
            badge: "1-Tap Sync",
            icon: <Cloud className="w-6 h-6 text-sky-500 dark:text-sky-400" />
          },
          {
            number: "08",
            title: "Offline Mobile Backup",
            desc: "Create instant offline encrypted backups directly inside your phone's storage (.JSON / .ZIP). Easily save or share copies via SD Card, WhatsApp, USB, or PC.",
            badge: "Local Backup",
            icon: <Smartphone className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
          },
          {
            number: "09",
            title: "PIN & Biometric Security",
            desc: "Secure your sensitive financial records from prying eyes with 4-digit PIN lock protection and biometric fingerprint authentication.",
            badge: "Biometric Lock",
            icon: <Lock className="w-6 h-6 text-purple-500 dark:text-purple-400" />
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className="relative group rounded-3xl p-[1.5px] bg-gradient-to-b from-slate-200/90 via-emerald-500/20 to-slate-200/40 dark:from-emerald-500/30 dark:via-teal-500/10 dark:to-white/5 hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-400 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col"
          >
            <div className="h-full w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[22px] p-6 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
              {/* Background glow orb */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none"></div>

              {/* Watermark Number */}
              <div className="absolute right-4 top-4 text-3xl font-black text-slate-100 dark:text-slate-900 select-none pointer-events-none transition-colors group-hover:text-emerald-500/10 dark:group-hover:text-emerald-400/10">
                {item.number}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:border-emerald-500/40 transition-colors">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Raqam Flow? Section (Styled with Home Glassmorphic card design) */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-amber-500/30 shadow-2xl mb-10 overflow-hidden">
        <div className="bg-white/90 dark:bg-slate-950/85 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
              <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400" />
              <span>Why Choose Raqam Flow?</span>
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300 border border-amber-500/30">
              User Recommended
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Replaces cluttered paper registers and prevents loss of credit records.",
              "Send payment reminders directly to customers via WhatsApp & SMS with 1-tap.",
              "Manage multiple branches or businesses under one single user profile.",
              "Recycle Bin ensures deleted transactions can be recovered safely anytime.",
              "Completely distraction-free experience with zero invasive third-party ads."
            ].map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:border-emerald-500/40 transition-colors">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Suggestion Form */}
      <SuggestionForm />
    </ContentWrapper>
  );
}

function PrivacySection() {
  return (
    <ContentWrapper title="Privacy Policy" icon={<ShieldCheck className="w-8 h-8" />}>
      {/* Top Banner - Data Privacy & Absolute Ownership */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 shadow-2xl mb-10 overflow-hidden">
        <div className="bg-slate-950/90 dark:bg-slate-950/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex-shrink-0 shadow-lg mt-0.5">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1">
                <Lock className="w-3 h-3" /> Absolute Data Ownership
              </span>
              <h4 className="font-black text-white text-xl sm:text-2xl tracking-tight">
                Data Privacy & Absolute Ownership
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-medium">
                Your books belong strictly to you. We never collect, inspect, or sell your ledger records. Fully compliant with Google Play Developer Policies and Android Data Safety Guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Policy Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {[
          {
            number: "01",
            title: "Local-Only Storage Policy",
            desc: "All customer names, contact numbers, balance receivables/payables, and daily cash transactions are stored exclusively inside your device's private SQLite database sandbox (Jetpack Room). No third-party servers have access to your personal financial books.",
            badge: "Local SQLite Sandbox",
            icon: <Database className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          },
          {
            number: "02",
            title: "Zero Tracking & Telemetry-Free",
            desc: "Raqam Flow operates under a strict zero-tracking policy. We do not embed telemetry trackers, background diagnostic monitors, or behavioral analytics engines. Your ledger entries, financial numbers, and customer contact lists remain 100% confidential and exclusively on-device.",
            badge: "0 Telemetry Trackers",
            icon: <ShieldCheck className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          },
          {
            number: "03",
            title: "Cloud Backup via Google Drive",
            desc: "When you initiate a Google Drive backup, the encrypted JSON file is stored directly in your private Google Drive account. We do not maintain any intermediary proxy servers or access your Google account credentials.",
            badge: "Direct Drive Sync",
            icon: <Cloud className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
          },
          {
            number: "04",
            title: "Online Advertisements & Free App Sustainability",
            desc: "Raqam Flow is 100% free for all business owners and users. To sustain continuous app development, updates, and keep this application free forever, non-intrusive online advertisements may be displayed.",
            lockNotice: "Absolute Privacy & Confidentiality Guarantee: Showing online advertisements will NEVER compromise, leak, share, or sell your personal information, financial ledgers, customer records, or confidential data to any advertisers or third-party networks. Your entire ledger data remains 100% private and encrypted solely under your control.",
            badge: "100% Free Forever",
            icon: <Sparkles className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className="relative group rounded-3xl p-[1.5px] bg-gradient-to-b from-slate-200/90 via-emerald-500/20 to-slate-200/40 dark:from-emerald-500/30 dark:via-teal-500/10 dark:to-white/5 hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-400 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col"
          >
            <div className="h-full w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[22px] p-6 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none"></div>

              <div className="absolute right-4 top-4 text-3xl font-black text-slate-100 dark:text-slate-900 select-none pointer-events-none transition-colors group-hover:text-emerald-500/10 dark:group-hover:text-emerald-400/10">
                {item.number}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:border-emerald-500/40 transition-colors">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-3">
                  {item.desc}
                </p>

                {item.lockNotice && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium flex items-start space-x-2 mt-2">
                    <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item.lockNotice}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. App Permissions & Data Usage Full-Width Card */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-purple-500/30 via-emerald-500/20 to-cyan-500/30 shadow-2xl mb-10 overflow-hidden">
        <div className="bg-white/90 dark:bg-slate-950/85 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-500">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  5. App Permissions & Data Usage
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Strictly on-demand runtime permissions with zero background tracking</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30">
              User Granted
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Raqam Flow requests Android runtime permissions strictly for manual user actions with zero background tracking:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-emerald-500 font-bold mb-2">
                <Camera className="w-5 h-5" />
                <span className="text-slate-900 dark:text-white font-extrabold text-sm">Camera</span>
              </div>
              <p className="text-[11px] text-purple-400 font-mono mb-1.5">android.permission.CAMERA</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Used exclusively for snapping photos of physical bills, receipts, or invoices to attach to transactions.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-cyan-500 font-bold mb-2">
                <HardDrive className="w-5 h-5" />
                <span className="text-slate-900 dark:text-white font-extrabold text-sm">Photos & Media Storage</span>
              </div>
              <p className="text-[11px] text-cyan-400 font-mono mb-1.5">READ_MEDIA_IMAGES / EXTERNAL</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Used exclusively to attach existing receipt images from gallery and export transaction reports (PDF/Excel) locally.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-amber-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-amber-500 font-bold mb-2">
                <Bell className="w-5 h-5" />
                <span className="text-slate-900 dark:text-white font-extrabold text-sm">Notifications</span>
              </div>
              <p className="text-[11px] text-amber-400 font-mono mb-1.5">POST_NOTIFICATIONS</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Used exclusively to deliver optional, local daily reminders to log cash book entries.
              </p>
            </div>
          </div>

          {/* Privacy Commitment Lock Box */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed flex items-start space-x-3">
            <Lock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">Privacy Commitment:</strong>
              No photos, documents, or personal financial data collected via these permissions are uploaded to external servers, sold, or shared with third parties.
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

function TermsSection() {
  return (
    <ContentWrapper title="Terms & Conditions" icon={<FileText className="w-8 h-8" />}>
      {/* Patent & Copyright Legal Notice Box */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-amber-500/60 via-emerald-500/50 to-amber-500/60 shadow-2xl mb-10 overflow-hidden">
        <div className="bg-slate-950/95 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center space-x-3 mb-6 flex-wrap gap-2">
            <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-black flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-400 tracking-wide uppercase">
                Patent & Copyright Legal Protection Notice
              </h3>
              <p className="text-xs text-slate-400 font-mono">Official Legal Declaration • Raqam Flow Intellectual Property</p>
            </div>
          </div>

          {/* Urdu Notice Box */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 mb-5 shadow-inner">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Urdu Legal Declaration (اردو نوٹس)</span>
            </div>
            <p className="font-urdu text-lg sm:text-xl text-amber-200 leading-loose text-right dir-rtl font-semibold">
              "ایپ کا ہر ہر فنکشن اپنے تمام آپشنز کے ساتھ پیٹنٹ اور کاپی رائٹ رجسٹرڈ ہے، لہٰذا اس میں کسی بھی قسم کی چھیڑ چھاڑ غیر قانونی ہوگی جس سے قانونی کارروائی کا سامنا کرنا پڑ سکتا ہے۔"
            </p>
          </div>

          {/* English Notice Box */}
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 shadow-inner">
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>English Legal Declaration</span>
            </div>
            <p className="text-base sm:text-lg text-emerald-100 font-semibold leading-relaxed">
              "Every single function and feature option of this app is patent & copyright registered. Any unauthorized alteration, tampering, or reproduction is strictly illegal and subject to legal action."
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Terms & Conditions Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {[
          {
            number: "01",
            title: "Acceptance of Terms & EULA",
            desc: "By downloading, installing, or using Raqam Flow, you enter into a legally binding agreement to comply with these terms. You are granted a limited, non-exclusive, non-transferable personal and commercial license to use Raqam Flow strictly for managing your business accounting and ledger books.",
            badge: "EULA Agreement",
            icon: <FileText className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          },
          {
            number: "02",
            title: "Intellectual Property & Patent Protection",
            desc: "All original UI/UX layouts, branding assets, logos, proprietary source code, database architectures, and features of Raqam Flow belong exclusively to Muhammad Yousuf Noori (NooriTech). Any unauthorized copying, decompilation, cloning, or distribution is strictly prohibited under international intellectual property laws.",
            badge: "Copyright Protected",
            icon: <Scale className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          },
          {
            number: "03",
            title: "User Data Ownership & Local Backup",
            desc: "Users retain 100% absolute ownership of all ledger entries, customer details, and cash records. Users are solely responsible for setting local PIN security, safeguarding their mobile device, and conducting regular Google Drive backups to ensure seamless data recovery in case of hardware loss.",
            badge: "Absolute Data Control",
            icon: <Lock className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
          },
          {
            number: "04",
            title: "Prohibited Uses & Reverse Engineering Ban",
            desc: "Users agree not to modify, reverse engineer, disassemble, extract source code, bypass security locks, or create derivative works based on Raqam Flow. Re-packaging or re-uploading modified APK binaries on any third-party app stores or websites is strictly illegal.",
            badge: "Strict Ban",
            icon: <ShieldCheck className="w-6 h-6 text-purple-500 dark:text-purple-400" />
          },
          {
            number: "05",
            title: "Limitation of Liability & 'AS IS' Provision",
            desc: "Raqam Flow is provided on an 'AS IS' and 'AS AVAILABLE' basis. Because all financial records are stored locally inside the user's device SQLite sandbox without central server tracking, NooriTech cannot be held liable for data loss caused by physical device damage, forgotten PIN codes, or manual app uninstallation without prior backup.",
            badge: "Disclaimer",
            icon: <Database className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          },
          {
            number: "06",
            title: "App Modifications & Service Updates",
            desc: "We reserve the right to continuously improve, modify, update, or add new features to Raqam Flow to enhance performance, maintain security compliance, and ensure zero-cost availability for retail merchants and small business owners.",
            badge: "Service Updates",
            icon: <Sparkles className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className="relative group rounded-3xl p-[1.5px] bg-gradient-to-b from-slate-200/90 via-emerald-500/20 to-slate-200/40 dark:from-emerald-500/30 dark:via-teal-500/10 dark:to-white/5 hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-400 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col"
          >
            <div className="h-full w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[22px] p-6 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none"></div>

              <div className="absolute right-4 top-4 text-3xl font-black text-slate-100 dark:text-slate-900 select-none pointer-events-none transition-colors group-hover:text-emerald-500/10 dark:group-hover:text-emerald-400/10">
                {item.number}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:border-emerald-500/40 transition-colors">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact & Legal Support Desk */}
      <div className="relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-amber-500/30 shadow-2xl mb-10 overflow-hidden">
        <div className="bg-white/90 dark:bg-slate-950/85 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Contact & Legal Support Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Get in touch with official support & legal desk</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <a 
              href="mailto:yousufnoor469@gmail.com" 
              className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center space-x-4 hover:border-emerald-500 transition-all duration-300 group shadow-sm hover:-translate-y-1"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform border border-emerald-500/20 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Official Support Email</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-emerald-500 transition-colors">yousufnoor469@gmail.com</span>
              </div>
            </a>

            <a 
              href="https://wa.me/923022827364" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center space-x-4 hover:border-emerald-500 transition-all duration-300 group shadow-sm hover:-translate-y-1"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform border border-emerald-500/20 flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">WhatsApp Support & Legal</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-emerald-500 transition-colors">+92 302 2827364</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

