import React, { useState, useEffect } from 'react';
import { Users, Download, Activity, Sparkles, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, increment, serverTimestamp } from 'firebase/firestore';

// Unique session ID for this browser tab/window
const getSessionId = () => {
  let id = sessionStorage.getItem('rf_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    sessionStorage.setItem('rf_session_id', id);
  }
  return id;
};

// Global helper to track download click anywhere in the app
export const trackApkDownload = async () => {
  try {
    const statsRef = doc(db, 'stats', 'downloads');
    await setDoc(statsRef, {
      count: increment(1),
      lastDownloadedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Error incrementing download counter:', err);
  }
};

export function LiveStatsBanner() {
  const [liveVisitors, setLiveVisitors] = useState<number>(1);
  const [downloadCount, setDownloadCount] = useState<number>(0); // 100% real live counter
  const [downloadPulse, setDownloadPulse] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  // 1. Live Presence Heartbeat & Real-time Visitor Listener
  useEffect(() => {
    const sessionId = getSessionId();
    const presenceRef = doc(db, 'presence', sessionId);

    // Function to send heartbeat to Firestore
    const sendHeartbeat = async () => {
      try {
        await setDoc(presenceRef, {
          lastSeen: Date.now(),
          userAgent: navigator.userAgent ? navigator.userAgent.substring(0, 50) : 'Web'
        }, { merge: true });
      } catch (err) {
        console.warn('Presence heartbeat error:', err);
      }
    };

    // Send initial heartbeat
    sendHeartbeat();

    // Send heartbeat every 15 seconds
    const interval = setInterval(sendHeartbeat, 15000);

    // Clean up on tab close
    const handleUnload = () => {
      deleteDoc(presenceRef).catch(() => {});
    };
    window.addEventListener('beforeunload', handleUnload);

    // Real-time listener on presence collection
    const presenceColl = collection(db, 'presence');
    const unsubscribePresence = onSnapshot(presenceColl, (snapshot) => {
      const now = Date.now();
      let activeCount = 0;
      
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        // Active if heartbeat received within last 45 seconds
        if (data && data.lastSeen && (now - data.lastSeen < 45000)) {
          activeCount++;
        }
      });

      // Guarantee at least 1 (the current user themselves)
      setLiveVisitors(Math.max(1, activeCount));
      setIsLiveConnected(true);
    }, (err) => {
      console.warn('Live presence snapshot error:', err);
      setIsLiveConnected(false);
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
      deleteDoc(presenceRef).catch(() => {});
      unsubscribePresence();
    };
  }, []);

  // 2. Real-time Download Counter Listener
  useEffect(() => {
    const statsRef = doc(db, 'stats', 'downloads');
    
    // Ensure document exists with base count if empty
    setDoc(statsRef, { count: increment(0) }, { merge: true }).catch(() => {});

    const unsubscribeStats = onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const dbCount = typeof data.count === 'number' ? data.count : 0;
        
        setDownloadCount((prev) => {
          if (prev !== dbCount && prev >= 0) {
            setDownloadPulse(true);
            setTimeout(() => setDownloadPulse(false), 1500);
          }
          return dbCount;
        });
      }
    }, (err) => {
      console.warn('Stats snapshot error:', err);
    });

    return () => unsubscribeStats();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-950/90 dark:from-slate-900/80 dark:via-emerald-950/40 dark:to-slate-950/80 border border-emerald-500/30 shadow-[0_10px_30px_rgba(16,185,129,0.15)] p-6 sm:p-8 backdrop-blur-2xl transition-all">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wider uppercase">
              <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>Real-Time Cloud Stats</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>Raqam Flow Live Metrics</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md">
              Live updates directly synchronized via Google Firebase Cloud Database.
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            
            {/* 1. Live Visitors Card */}
            <div className="relative group bg-slate-800/80 dark:bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-lg hover:border-emerald-400/60 transition-all hover:scale-[1.02]">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Users className="w-6 h-6" />
                </div>
                {isLiveConnected && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                    {liveVisitors}
                  </span>
                  <span className="inline-flex items-center text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Online Now
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium flex items-center mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                  Live Website Visitors
                </div>
              </div>
            </div>

            {/* 2. Total Downloads Counter Card */}
            <div className={`relative group bg-slate-800/80 dark:bg-slate-900/80 border ${downloadPulse ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-teal-500/30'} rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-lg hover:border-teal-400/60 transition-all hover:scale-[1.02]`}>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 shadow-inner flex-shrink-0">
                <Download className={`w-6 h-6 ${downloadPulse ? 'animate-bounce text-amber-400' : ''}`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                    {downloadCount.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    <TrendingUp className="w-3 h-3 mr-1" /> Verified
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium flex items-center mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400 mr-1" />
                  Total App Downloads
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
