import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Flame, Coffee, Target } from 'lucide-react';
import { playSuccessSound } from '../utils/audio';

const MODES = {
  POMODORO: { label: 'Foco Streak', time: 25 * 60, icon: Flame, color: '#f97316' },
  SHORT_BREAK: { label: 'Pausa Curta', time: 5 * 60, icon: Coffee, color: '#10b981' },
  LONG_BREAK: { label: 'Pausa Longa', time: 15 * 60, icon: Target, color: '#06b6d4' },
};

export default function PomodoroModal({ isOpen, onClose, activeHabitTitle }) {
  const [currentMode, setCurrentMode] = useState('POMODORO');
  const [timeLeft, setTimeLeft] = useState(MODES.POMODORO.time);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playSuccessSound();
            if (currentMode === 'POMODORO') {
              setCompletedSessions((s) => s + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, currentMode]);

  if (!isOpen) return null;

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setIsRunning(false);
    setTimeLeft(MODES[mode].time);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(MODES[currentMode].time);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalTime = MODES[currentMode].time;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#12151e] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Streak Focus Timer
          </span>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-2 p-1 bg-black/40 rounded-2xl border border-white/5 mb-6">
          {Object.entries(MODES).map(([key, config]) => {
            const Icon = config.icon;
            const isSelected = currentMode === key;
            return (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white/10 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timer Circle */}
        <div className="relative w-52 h-52 mx-auto flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-white/5"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke={MODES[currentMode].color}
              strokeWidth="6"
              strokeDasharray={276.4}
              strokeDashoffset={276.4 - (276.4 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-extrabold tracking-tight font-mono text-white">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">
              {isRunning ? 'Em andamento...' : 'Pausado'}
            </span>
          </div>
        </div>

        {activeHabitTitle && (
          <div className="bg-black/30 rounded-xl px-4 py-2 border border-white/5 mb-6 inline-block">
            <span className="text-[11px] text-slate-400">Vinculado a: </span>
            <span className="text-xs font-semibold text-orange-400">
              {activeHabitTitle}
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            title="Reiniciar"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>Começar Foco</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <span>Sessões concluídas hoje:</span>
          <span className="font-bold text-orange-400">{completedSessions} 🔥</span>
        </div>
      </div>
    </div>
  );
}
