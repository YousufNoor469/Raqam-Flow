import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Pause, Play, Sparkles, Smartphone, 
  RotateCw, ShieldCheck, Check, ArrowUpRight, ArrowDownRight, 
  Search, Phone, MessageSquare, Plus, BookOpen, Banknote, 
  Menu, Cloud, Globe, Settings, User, Trash2, LogOut, Sun, Moon,
  Volume2, Lock, Share2, ArrowLeft, Calendar
} from 'lucide-react';

export interface ScreenData {
  id: number;
  title: string;
  tag: string;
  description: string;
  badgeColor: string;
  isDark: boolean;
  renderScreen: () => React.ReactNode;
}

export function PhoneShowcase3D() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 for next, -1 for prev

  const screens: ScreenData[] = [
    {
      id: 1,
      title: "Customer Khata (Light Mode)",
      tag: "Live Customer Ledger",
      description: "Manage customer balances, send instant SMS alerts & WhatsApp receipts.",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      isDark: false,
      renderScreen: () => (
        <div className="w-full h-full bg-[#f4f2ed] text-slate-800 flex flex-col font-sans select-none overflow-hidden">
          {/* Status Bar */}
          <div className="h-6 bg-[#e2ded5] px-4 flex items-center justify-between text-[10px] text-slate-600 font-medium pt-1">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <span>5G</span>
              <div className="w-3.5 h-2 bg-slate-700 rounded-xs"></div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-[#e9e6dd] px-3 py-2 flex items-center justify-between border-b border-slate-300/60 shadow-xs">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shadow-xs">
                R
              </div>
              <span className="font-bold text-xs text-emerald-900 tracking-tight">Raqam Flow</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-medium border border-emerald-300">
                Your Personal Ledger
              </span>
            </div>
            <div className="flex items-center space-x-1 text-slate-700">
              <Globe className="w-3.5 h-3.5" />
              <Moon className="w-3.5 h-3.5" />
              <Menu className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Business Selector Dropdown */}
          <div className="mx-3 mt-2 p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">Retail</span>
              <span className="text-xs font-bold text-slate-900">Noori Tech</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center text-white text-[8px]">▼</div>
          </div>

          {/* Khata Type Tabs */}
          <div className="mx-3 mt-2 bg-[#e2ded5] p-1 rounded-xl flex items-center text-[10px] font-bold">
            <div className="flex-1 py-1.5 bg-[#1b2533] text-white rounded-lg text-center flex items-center justify-center space-x-1 shadow-xs">
              <User className="w-3 h-3" />
              <span>Customer Khata</span>
              <span className="ml-1 px-1 bg-slate-700 text-[8px] rounded-full">1</span>
            </div>
            <div className="flex-1 py-1.5 text-slate-600 text-center flex items-center justify-center space-x-1">
              <span>Dokandar Khata</span>
              <span className="ml-1 px-1 bg-slate-300 text-[8px] rounded-full">0</span>
            </div>
          </div>

          {/* Search Input */}
          <div className="mx-3 mt-2 relative">
            <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
            <input 
              type="text" 
              readOnly 
              placeholder="Search name or phone number..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-3 py-1.5 text-[10px] placeholder-slate-400 text-slate-800 shadow-2xs focus:outline-none"
            />
          </div>

          {/* Customer Item Card */}
          <div className="mx-3 mt-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 flex items-center justify-center text-slate-500 font-bold text-xs">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Noori</h4>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-slate-800">Rs. 0</p>
                <p className="text-[8px] text-emerald-600 font-medium">Settled</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1.5 pt-1 border-t border-slate-100">
              <button className="flex-1 py-1 bg-sky-50 text-sky-600 rounded-lg text-[9px] font-bold flex items-center justify-center space-x-1 border border-sky-100">
                <MessageSquare className="w-2.5 h-2.5" />
                <span>SMS</span>
              </button>
              <button className="flex-1 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold flex items-center justify-center space-x-1 border border-emerald-100">
                <Share2 className="w-2.5 h-2.5" />
                <span>WhatsApp</span>
              </button>
              <button className="p-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                <Phone className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Floating Add Customer Button */}
          <div className="px-3 pb-2 text-right">
            <button className="px-3 py-1.5 bg-[#182230] text-white rounded-xl text-[10px] font-bold shadow-md inline-flex items-center space-x-1">
              <Plus className="w-3 h-3" />
              <span>Add New Customer</span>
            </button>
          </div>

          {/* Bottom Nav Bar */}
          <div className="bg-[#182230] text-white px-6 py-2 flex items-center justify-around text-[9px] border-t border-slate-800">
            <div className="flex flex-col items-center text-emerald-400 font-bold">
              <BookOpen className="w-3.5 h-3.5 mb-0.5" />
              <span>Mera Khata</span>
            </div>
            <div className="flex flex-col items-center text-slate-400">
              <Banknote className="w-3.5 h-3.5 mb-0.5" />
              <span>Cash Book</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Customer Ledger Detail",
      tag: "Hisab Barabar / Entry View",
      description: "Track 'Maine Diye' (Given) and 'Maine Liye' (Taken) with 1-tap reminders.",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      isDark: false,
      renderScreen: () => (
        <div className="w-full h-full bg-[#f6f5f1] text-slate-800 flex flex-col font-sans select-none overflow-hidden">
          {/* Status Bar */}
          <div className="h-6 bg-[#111827] text-white px-4 flex items-center justify-between text-[10px] pt-1">
            <span>09:41</span>
            <span>100%</span>
          </div>

          {/* Header Bar */}
          <div className="bg-[#111827] text-white px-3 py-2 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4 text-slate-300" />
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                N
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">Noori</h4>
                <p className="text-[8px] text-slate-400 mt-0.5">Customer Ledger</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Phone className="w-3.5 h-3.5" />
              <Share2 className="w-3.5 h-3.5" />
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            </div>
          </div>

          {/* Main Balance Card */}
          <div className="mx-3 mt-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">NET BALANCE</p>
                <p className="text-lg font-black text-slate-900 mt-0.5">Rs. 0</p>
                <p className="text-[9px] text-slate-500 font-medium">Hisab Barabar (Settled)</p>
              </div>
              <div className="space-y-1">
                <button className="px-2 py-1 bg-blue-600 text-white text-[8px] font-bold rounded-lg flex items-center space-x-1 shadow-2xs w-full">
                  <MessageSquare className="w-2.5 h-2.5" />
                  <span>SMS Alert</span>
                </button>
                <button className="px-2 py-1 bg-emerald-600 text-white text-[8px] font-bold rounded-lg flex items-center space-x-1 shadow-2xs w-full">
                  <Share2 className="w-2.5 h-2.5" />
                  <span>WhatsApp Alert</span>
                </button>
              </div>
            </div>

            {/* Maine Diye / Maine Liye Cards */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-xl bg-rose-50/50 border border-rose-100">
                <div className="flex items-center justify-between text-rose-600 text-[8px] font-bold">
                  <span>Total Maine Diye</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
                <p className="text-xs font-black text-rose-600 mt-1">Rs. 0</p>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center justify-between text-emerald-600 text-[8px] font-bold">
                  <span>Total Maine Liye</span>
                  <ArrowDownRight className="w-3 h-3" />
                </div>
                <p className="text-xs font-black text-emerald-600 mt-1">Rs. 0</p>
              </div>
            </div>
          </div>

          {/* Empty State Body */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <p className="text-[10px] text-slate-400 max-w-[200px]">
              No customers found. Click button below to add a new ledger.
            </p>
          </div>

          {/* Bottom Main Transaction Buttons */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <button className="flex-1 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1">
              <Plus className="w-3 h-3" />
              <span>Maine Diye</span>
            </button>
            <button className="flex-1 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1">
              <Plus className="w-3 h-3" />
              <span>Maine Liye</span>
            </button>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Dark Mode Experience",
      tag: "Night Mode Ledger",
      description: "Sleek, eye-friendly dark theme designed for comfortable night bookkeeping.",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      isDark: true,
      renderScreen: () => (
        <div className="w-full h-full bg-[#0d141f] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
          {/* Status Bar */}
          <div className="h-6 bg-[#090e17] px-4 flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1">
            <span>09:41</span>
            <span>5G</span>
          </div>

          {/* Header */}
          <div className="bg-[#121b2a] px-3 py-2 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                R
              </div>
              <span className="font-bold text-xs text-white">Raqam Flow</span>
              <span className="text-[8px] px-1.5 py-0.5 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/60">
                Your Personal Ledger
              </span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <Menu className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Business Selector */}
          <div className="mx-3 mt-2 p-2 bg-[#182335] rounded-xl border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-md border border-emerald-700/50">Retail</span>
              <span className="text-xs font-bold text-white">Noori Tech</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[8px] font-bold">▼</div>
          </div>

          {/* Khata Tabs */}
          <div className="mx-3 mt-2 bg-[#182335] p-1 rounded-xl flex items-center text-[10px] font-bold">
            <div className="flex-1 py-1.5 bg-[#212f45] text-white rounded-lg text-center flex items-center justify-center space-x-1 border border-slate-600/40">
              <User className="w-3 h-3 text-emerald-400" />
              <span>Customer Khata</span>
              <span className="ml-1 px-1 bg-slate-700 text-[8px] rounded-full">0</span>
            </div>
            <div className="flex-1 py-1.5 text-slate-400 text-center flex items-center justify-center space-x-1">
              <span>Dokandar Khata</span>
              <span className="ml-1 px-1 bg-slate-800 text-[8px] rounded-full">0</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mx-3 mt-2 relative">
            <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-500" />
            <input 
              type="text" 
              readOnly 
              placeholder="Search name or phone number..." 
              className="w-full bg-[#182335] border border-slate-700/80 rounded-xl pl-7 pr-3 py-1.5 text-[10px] placeholder-slate-500 text-white focus:outline-none"
            />
          </div>

          {/* Empty State */}
          <div className="flex-1 mx-3 mt-2 bg-[#141d2b] rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#1f2c40] flex items-center justify-center text-slate-400 mb-2">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-[10px] text-slate-400 max-w-[180px]">
              No customers found. Click button below to add a new ledger.
            </p>
          </div>

          {/* Bottom Floating Button */}
          <div className="px-3 py-2 text-right">
            <button className="px-3 py-1.5 bg-[#1e2c40] text-white rounded-xl text-[10px] font-bold shadow-md border border-slate-600/50 inline-flex items-center space-x-1">
              <Plus className="w-3 h-3 text-emerald-400" />
              <span>Add New Customer</span>
            </button>
          </div>

          {/* Bottom Nav Bar */}
          <div className="bg-[#090e17] text-white px-6 py-2 flex items-center justify-around text-[9px] border-t border-slate-800">
            <div className="flex flex-col items-center text-emerald-400 font-bold">
              <BookOpen className="w-3.5 h-3.5 mb-0.5" />
              <span>Mera Khata</span>
            </div>
            <div className="flex flex-col items-center text-slate-500">
              <Banknote className="w-3.5 h-3.5 mb-0.5" />
              <span>Cash Book</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Multi-Store Management",
      tag: "Store & Profile Switcher",
      description: "Manage multiple retail or wholesale shops under a single app account.",
      badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      isDark: false,
      renderScreen: () => (
        <div className="w-full h-full bg-[#f4f2ed] text-slate-800 flex flex-col font-sans select-none overflow-hidden">
          <div className="h-6 bg-[#e2ded5] px-4 flex items-center justify-between text-[10px] text-slate-600 pt-1">
            <span>09:41</span>
            <span>4G</span>
          </div>

          <div className="bg-[#e9e6dd] px-3 py-2 flex items-center justify-between border-b border-slate-300">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
                R
              </div>
              <span className="font-bold text-xs text-emerald-900">Raqam Flow</span>
              <span className="text-[8px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Your Personal Ledger
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <Menu className="w-3.5 h-3.5 text-slate-600" />
            </div>
          </div>

          <div className="mx-3 mt-2 p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2">
              <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">Retail</span>
              <span className="text-xs font-bold text-slate-900">Noori Tech</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center text-white text-[8px]">▼</div>
          </div>

          <div className="flex-1 mx-3 mt-3 bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center text-center shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
              <User className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-xs text-slate-600 font-medium max-w-[200px]">
              No customers found. Click button below to add a new ledger.
            </p>
          </div>

          <div className="px-3 py-2 text-right">
            <button className="px-3 py-1.5 bg-[#182230] text-white rounded-xl text-[10px] font-bold shadow-md inline-flex items-center space-x-1">
              <Plus className="w-3 h-3" />
              <span>Add New Customer</span>
            </button>
          </div>

          <div className="bg-[#182230] text-white px-6 py-2 flex items-center justify-around text-[9px] border-t border-slate-800">
            <div className="flex flex-col items-center text-emerald-400 font-bold">
              <BookOpen className="w-3.5 h-3.5 mb-0.5" />
              <span>Mera Khata</span>
            </div>
            <div className="flex flex-col items-center text-slate-400">
              <Banknote className="w-3.5 h-3.5 mb-0.5" />
              <span>Cash Book</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Cash Book Ledger (Light)",
      tag: "Annual Cash Book & Year Index",
      description: "Track daily Cash In (+) and Cash Out (-) with annual year index summaries.",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      isDark: false,
      renderScreen: () => (
        <div className="w-full h-full bg-[#f4f2ed] text-slate-800 flex flex-col font-sans select-none overflow-hidden">
          <div className="h-6 bg-[#e2ded5] px-4 flex items-center justify-between text-[10px] text-slate-600 pt-1">
            <span>09:41</span>
            <span>WiFi</span>
          </div>

          <div className="bg-[#e9e6dd] px-3 py-2 flex items-center justify-between border-b border-slate-300">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
                R
              </div>
              <span className="font-bold text-xs text-emerald-900">Raqam Flow</span>
              <span className="text-[8px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Your Personal Ledger
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <Menu className="w-3.5 h-3.5 text-slate-600" />
            </div>
          </div>

          <div className="mx-3 mt-2 p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2">
              <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">Retail</span>
              <span className="text-xs font-bold text-slate-900">Noori Tech</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center text-white text-[8px]">▼</div>
          </div>

          {/* Cash Book Banner Header */}
          <div className="mx-3 mt-3 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1">
                <h4 className="text-sm font-black text-slate-900">Raqam Flow</h4>
                <span className="text-[8px] px-1 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold">رقم فلو</span>
              </div>
              <p className="text-[8px] text-slate-500">Annual Cash Book & Year Index</p>
            </div>
            <div className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[9px] font-bold border border-amber-200 flex items-center space-x-1">
              <Calendar className="w-2.5 h-2.5" />
              <span>2026</span>
            </div>
          </div>

          <div className="mx-3 mt-2 flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-800">Recorded Years (All Years)</span>
            <span className="text-amber-600 font-bold">0 Years</span>
          </div>

          {/* Empty Cash Book Card */}
          <div className="mx-3 mt-2 bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-amber-50 mx-auto flex items-center justify-center text-amber-500">
              <Calendar className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-bold text-slate-900">No Entries Yet</h5>
            <p className="text-[9px] text-slate-400 max-w-[180px] mx-auto">
              Tap + CASH IN or - CASH OUT to start recording your transactions.
            </p>
          </div>

          <div className="flex-1"></div>

          {/* Cash In / Cash Out Action Bar */}
          <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center space-x-2">
            <button className="flex-1 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1">
              <span>+ + CASH IN</span>
            </button>
            <button className="flex-1 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1">
              <span>– - CASH OUT</span>
            </button>
          </div>

          {/* Bottom Nav */}
          <div className="bg-[#182230] text-white px-6 py-2 flex items-center justify-around text-[9px] border-t border-slate-800">
            <div className="flex flex-col items-center text-slate-400">
              <BookOpen className="w-3.5 h-3.5 mb-0.5" />
              <span>Mera Khata</span>
            </div>
            <div className="flex flex-col items-center text-emerald-400 font-bold">
              <Banknote className="w-3.5 h-3.5 mb-0.5" />
              <span>Cash Book</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Cash Book Ledger (Dark)",
      tag: "Dark Theme Cash Tracker",
      description: "Night mode cash book with real-time balance calculations.",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      isDark: true,
      renderScreen: () => (
        <div className="w-full h-full bg-[#0d141f] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
          <div className="h-6 bg-[#090e17] px-4 flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span>09:41</span>
            <span>5G</span>
          </div>

          <div className="bg-[#121b2a] px-3 py-2 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                R
              </div>
              <span className="font-bold text-xs text-white">Raqam Flow</span>
              <span className="text-[8px] px-1.5 py-0.5 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/60">
                Your Personal Ledger
              </span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <Menu className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mx-3 mt-2 p-2 bg-[#182335] rounded-xl border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[8px] font-bold px-1.5 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-md">Retail</span>
              <span className="text-xs font-bold text-white">Noori Tech</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[8px] font-bold">▼</div>
          </div>

          <div className="mx-3 mt-3 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1">
                <h4 className="text-sm font-black text-white">Raqam Flow</h4>
                <span className="text-[8px] px-1 py-0.5 bg-emerald-900/80 text-emerald-300 rounded-md font-bold">رقم فلو</span>
              </div>
              <p className="text-[8px] text-slate-400">Annual Cash Book & Year Index</p>
            </div>
            <div className="px-2 py-1 bg-amber-950/60 text-amber-400 rounded-lg text-[9px] font-bold border border-amber-800/50 flex items-center space-x-1">
              <Calendar className="w-2.5 h-2.5" />
              <span>2026</span>
            </div>
          </div>

          <div className="mx-3 mt-2 flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-200">Recorded Years (All Years)</span>
            <span className="text-amber-400 font-bold">0 Years</span>
          </div>

          <div className="mx-3 mt-2 bg-[#141d2b] p-4 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#1e2a3c] mx-auto flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-bold text-white">No Entries Yet</h5>
            <p className="text-[9px] text-slate-400 max-w-[180px] mx-auto">
              Tap + CASH IN or - CASH OUT to start recording your transactions.
            </p>
          </div>

          <div className="flex-1"></div>

          <div className="p-3 bg-[#090e17] border-t border-slate-800 flex items-center space-x-2">
            <button className="flex-1 py-2 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1">
              <span>+ + CASH IN</span>
            </button>
            <button className="flex-1 py-2 bg-rose-600 text-white font-black text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1">
              <span>– - CASH OUT</span>
            </button>
          </div>

          <div className="bg-[#090e17] text-white px-6 py-2 flex items-center justify-around text-[9px] border-t border-slate-800">
            <div className="flex flex-col items-center text-slate-500">
              <BookOpen className="w-3.5 h-3.5 mb-0.5" />
              <span>Mera Khata</span>
            </div>
            <div className="flex flex-col items-center text-emerald-400 font-bold">
              <Banknote className="w-3.5 h-3.5 mb-0.5" />
              <span>Cash Book</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Cloud Sync & Menu Modal",
      tag: "Google Drive Backup & Settings",
      description: "One-tap Google Drive cloud sync, recycle bin recovery, and account management.",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      isDark: true,
      renderScreen: () => (
        <div className="w-full h-full bg-[#080d14] text-slate-100 flex flex-col font-sans select-none overflow-hidden relative">
          {/* Dark Cashbook Background (Dimmed) */}
          <div className="opacity-30 pointer-events-none p-3 space-y-2">
            <div className="h-4 bg-slate-700 rounded-md w-1/3"></div>
            <div className="h-16 bg-slate-800 rounded-xl"></div>
            <div className="h-24 bg-slate-800 rounded-xl"></div>
          </div>

          {/* Modal Drawer Overlay */}
          <div className="absolute inset-x-2 top-4 bottom-4 bg-[#111927] border border-cyan-500/30 rounded-2xl shadow-2xl p-3 flex flex-col overflow-y-auto z-10 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                  ≡
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">Raqam Flow Khata Menu</h4>
                  <p className="text-[8px] text-emerald-400">Main Menu & Options</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">
                ✕
              </div>
            </div>

            {/* DATA & UTILITIES Section */}
            <div className="p-2 bg-[#182335] rounded-xl border border-slate-800 space-y-2">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-1"></span> DATA & UTILITIES
              </p>

              {/* Item 1 */}
              <div className="flex items-center justify-between p-1.5 bg-[#1f2c42] rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-purple-600 text-white">
                    <Cloud className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-white leading-tight">App Cloud Backup</h5>
                    <p className="text-[8px] text-slate-400">Google Drive Sync & Backup</p>
                  </div>
                </div>
                <span className="text-[8px] px-2 py-0.5 bg-purple-950 text-purple-300 font-bold rounded-md border border-purple-800">
                  SYNC
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between p-1.5 bg-[#1f2c42] rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-emerald-600 text-white">
                    <Globe className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-white leading-tight">Language</h5>
                    <p className="text-[8px] text-slate-400">Select Urdu / English</p>
                  </div>
                </div>
                <span className="text-[8px] px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded-md border border-emerald-800">
                  ENG
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between p-1.5 bg-[#1f2c42] rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-rose-600 text-white">
                    <Trash2 className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-white leading-tight">Recycle Bin</h5>
                    <p className="text-[8px] text-slate-400">Restore Deleted Records</p>
                  </div>
                </div>
                <span className="text-[8px] px-2 py-0.5 bg-rose-950 text-rose-300 font-bold rounded-md border border-rose-800">
                  TRASH
                </span>
              </div>
            </div>

            {/* PREFERENCES & ACCOUNT */}
            <div className="p-2 bg-[#182335] rounded-xl border border-slate-800 space-y-1.5">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-1"></span> PREFERENCES & ACCOUNT
              </p>
              <div className="flex items-center justify-between p-1.5 bg-[#1f2c42] rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-sky-600 text-white">
                    <Settings className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-white leading-tight">Settings</h5>
                    <p className="text-[8px] text-slate-400">App Functions & Security</p>
                  </div>
                </div>
                <span className="text-[8px] px-2 py-0.5 bg-sky-950 text-sky-300 font-bold rounded-md border border-sky-800">
                  CONFIG
                </span>
              </div>
            </div>

            {/* Log Out */}
            <div className="p-2 bg-rose-950/40 rounded-xl border border-rose-900/50 flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-300 flex items-center">
                <LogOut className="w-3 h-3 mr-1" /> Log Out
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "8+ Regional Languages Support",
      tag: "Urdu, Pashto, Sindhi, English & More",
      description: "Complete localized ledger, receipts & WhatsApp reminders in 8 languages.",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      isDark: true,
      renderScreen: () => (
        <div className="w-full h-full bg-[#0f172a] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
          {/* Header Banner */}
          <div className="m-3 p-2 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-[8px] text-emerald-200 flex items-start space-x-2">
            <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="leading-tight">
              App ki zuban tabdeel karne se tamaam hisab kitab, SMS alerts aur receipts mutaliqa zuban me muntaqil ho jayenge.
            </p>
          </div>

          <div className="px-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            AVAILABLE LANGUAGES / دستیاب زبانیں
          </div>

          {/* Languages Scrollable List */}
          <div className="flex-1 px-3 space-y-1.5 overflow-y-auto text-left">
            
            {/* Urdu */}
            <div className="p-2 rounded-xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">🇵🇰</span>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white">اردو (Urdu)</span>
                    <span className="text-[7px] px-1 bg-slate-700 text-slate-300 rounded-sm">قومی زبان</span>
                  </div>
                  <p className="text-[8px] text-slate-400">مکمل اردو سپورٹ، آسان کھاتے</p>
                </div>
              </div>
            </div>

            {/* Roman Urdu */}
            <div className="p-2 rounded-xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">🗣️</span>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white">Roman Urdu</span>
                    <span className="text-[7px] px-1 bg-slate-700 text-slate-300 rounded-sm">Asaan Khatoot</span>
                  </div>
                  <p className="text-[8px] text-slate-400">Har lafz samajhne me aasaan</p>
                </div>
              </div>
            </div>

            {/* Pashto */}
            <div className="p-2 rounded-xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">🏔️</span>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white">پښتو (Pashto)</span>
                    <span className="text-[7px] px-1 bg-slate-700 text-slate-300 rounded-sm">پښتو ژبه</span>
                  </div>
                  <p className="text-[8px] text-slate-400">په پښتو ژبه کې د حسابونو راپورونه</p>
                </div>
              </div>
            </div>

            {/* Sindhi */}
            <div className="p-2 rounded-xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">📜</span>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white">سنڌي (Sindhi)</span>
                    <span className="text-[7px] px-1 bg-slate-700 text-slate-300 rounded-sm">سنڌي ٻولي</span>
                  </div>
                  <p className="text-[8px] text-slate-400">سنڌي لکت م ڪاروباري حساب</p>
                </div>
              </div>
            </div>

            {/* English Selected */}
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">🇬🇧</span>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white">English</span>
                    <span className="text-[7px] px-1 bg-emerald-900 text-emerald-300 rounded-sm">International</span>
                  </div>
                  <p className="text-[8px] text-emerald-300">Standard English ledger & WhatsApp</p>
                </div>
              </div>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>

          </div>
        </div>
      )
    }
  ];

  // Auto 5-second timer rotation
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, screens.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const currentScreen = screens[currentIndex];

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-md mx-auto px-2 py-2 relative z-10 select-none"
    >
      
      {/* Main 3D Phone Container & Controls Wrapper */}
      <div className="relative flex flex-col items-center justify-center pt-2">
        
        {/* Subtle Ambient Glow Backlight */}
        <div 
          className={`absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full blur-[100px] transition-all duration-1000 pointer-events-none opacity-40 -top-6 ${
            currentScreen.isDark ? 'bg-purple-600/50' : 'bg-emerald-500/40'
          }`}
        ></div>

        {/* Stable Floating Smartphone Frame without shrink glitch */}
        <motion.div 
          className="relative z-20"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          
          {/* Phone Shell: Precision Titanium Chassis & Depth Shadows */}
          <div 
            className="relative w-[280px] sm:w-[305px] h-[565px] sm:h-[610px] rounded-[48px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-[9px] shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-[3.5px] border-slate-700/90 ring-1 ring-white/20"
          >
            
            {/* Phone Metallic Frame Highlights & Buttons */}
            <div className="absolute inset-0 rounded-[44px] border border-white/15 pointer-events-none z-40"></div>
            {/* Action Button */}
            <div className="absolute -left-[5px] top-24 w-[3px] h-6 bg-slate-600 rounded-l-md shadow-xs"></div>
            {/* Volume Up */}
            <div className="absolute -left-[5px] top-34 w-[3px] h-11 bg-slate-600 rounded-l-md shadow-xs"></div>
            {/* Volume Down */}
            <div className="absolute -left-[5px] top-48 w-[3px] h-11 bg-slate-600 rounded-l-md shadow-xs"></div>
            {/* Power Button */}
            <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-slate-600 rounded-r-md shadow-xs"></div>

            {/* Glass Screen Frame Container */}
            <div 
              className="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 border border-slate-800/90 shadow-inner"
            >
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-26 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-md border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-950"></div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]"></div>
              </div>

              {/* Dynamic Screen Sheen Reflection Sweep on Switch */}
              <motion.div 
                key={`sheen-${currentIndex}`}
                initial={{ x: '-100%', opacity: 0.6 }}
                animate={{ x: '250%', opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-40"
              />

              {/* Permanent Glass Top Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30"></div>

              {/* Animated Screen Content Switcher with Smooth Slide Transition */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentScreen.id}
                  custom={direction}
                  initial={{ 
                    x: direction > 0 ? 50 : -50,
                    opacity: 0,
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{ 
                    x: direction > 0 ? -50 : 50,
                    opacity: 0,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="w-full h-full"
                >
                  {currentScreen.renderScreen()}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

        {/* Refined Ambient Floating Shadow Beneath Phone */}
        <div className="w-48 sm:w-56 h-4 rounded-full bg-black/50 blur-lg mt-3 pointer-events-none"></div>

        {/* Left / Right Floating Navigation Glass Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute -left-3 sm:-left-6 top-[55%] -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/90 border border-slate-700/90 text-white hover:bg-emerald-600 hover:border-emerald-400 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
          aria-label="Previous Screen"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute -right-3 sm:-right-6 top-[55%] -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/90 border border-slate-700/90 text-white hover:bg-emerald-600 hover:border-emerald-400 shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
          aria-label="Next Screen"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Screen Details Box - Sleek Glassmorphism */}
      <div className="w-[280px] sm:w-[305px] mx-auto mt-2 space-y-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 shadow-2xl text-center space-y-1.5"
          >
            <div className="flex items-center justify-center space-x-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentScreen.badgeColor}`}>
                {currentScreen.tag}
              </span>
            </div>
            
            <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
              {currentScreen.title}
            </h4>

            <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed">
              {currentScreen.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Clean Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {screens.map((screen, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-6 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]' 
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to screen ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
}
