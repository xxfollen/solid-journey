import React, { useState } from 'react';
import { X, Lock, User, Check, KeyRound, LogOut, Sparkles, AlertCircle } from 'lucide-react';

export default function AccountSettingsModal({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onLogout,
}) {
  const [name, setName] = useState(currentUser?.name || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '👨‍💻');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !currentUser) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // If changing password
    let updatedPassword = currentUser.password;
    if (newPassword || currentPassword) {
      if (currentPassword !== currentUser.password) {
        setError('A senha atual está incorreta.');
        return;
      }
      if (newPassword.length < 4) {
        setError('A nova senha deve ter no mínimo 4 dígitos.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('A confirmação da nova senha não confere.');
        return;
      }
      updatedPassword = newPassword;
    }

    onUpdateUser({
      ...currentUser,
      name: name.trim() || currentUser.name,
      avatar,
      password: updatedPassword,
    });

    setMessage('Dados atualizados com sucesso!');
    setTimeout(() => {
      setMessage('');
      onClose();
    }, 1200);
  };

  const AVATARS = ['👨‍💻', '⚡', '🎯', '🚀', '🔥', '🦁', '🦊', '🦉', '🦾', '🌟'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#12151e] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/10 shadow-inner"
            style={{ backgroundColor: `${currentUser.color || '#f97316'}22` }}
          >
            <span>{avatar}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Configurações da Conta</h3>
            <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Seu Nome de Exibição
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Avatar Emoji
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVATARS.map((em) => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setAvatar(em)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-base border transition-all ${
                    avatar === em
                      ? 'bg-orange-500/20 border-orange-500 scale-110'
                      : 'bg-[#0a0c12] border-white/5 hover:border-white/20'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Change Password Block */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Alterar Senha</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Senha Atual
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite para autorizar alteração"
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nova senha"
                  className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-1.5 rounded-xl transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da Conta</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/20"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
