import React, { useState } from 'react';
import { Flame, Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage({ users = [], onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      setError('E-mail não cadastrado. Selecione um dos 3 membros abaixo.');
      return;
    }

    if (user.password !== password) {
      setError('Senha incorreta. A senha inicial é 123456.');
      return;
    }

    onLoginSuccess(user.id);
  };

  const handleSelectQuickUser = (user) => {
    setEmail(user.email);
    setPassword(user.password || '123456');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#12151e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 mx-auto flex items-center justify-center shadow-lg shadow-orange-500/25 ring-1 ring-white/20 mb-3">
            <Flame className="w-8 h-8 text-white fill-white animate-flame" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Streak • Trio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Entre com sua conta para acessar sua versão exclusiva e a do time
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="seu.email@gmail.com"
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Sua senha"
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all duration-200 active:scale-95"
          >
            <span>Entrar na Conta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick User Fill Buttons */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="text-[11px] font-semibold text-slate-400 block mb-2.5 text-center">
            Ou selecione um dos 3 integrantes:
          </span>

          <div className="space-y-2">
            {users.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleSelectQuickUser(u)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-black/30 hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{u.avatar}</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                      {u.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {u.email}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] bg-white/5 group-hover:bg-orange-500/20 text-slate-400 group-hover:text-orange-300 px-2 py-0.5 rounded-md border border-white/5">
                  Preencher
                </span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-4">
            Senha padrão de fábrica: <code className="text-orange-400 font-bold bg-black/40 px-1.5 py-0.5 rounded">123456</code>
          </p>
        </div>

      </div>

      <div className="mt-6 text-xs text-slate-500 text-center">
        <span>InlitX Streak • Desafio de Rotinas & Hábitos</span>
      </div>
    </div>
  );
}
