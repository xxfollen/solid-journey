import React, { useState } from 'react';
import { X, UserCheck, Shield, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginModal({
  isOpen,
  onClose,
  users,
  currentUserId,
  onSelectUser,
  onCreateUser,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAvatar, setNewAvatar] = useState('🚀');

  if (!isOpen) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onCreateUser({
      name: newName.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@streak.app`,
      avatar: newAvatar,
      role: 'Membro Ativo',
      color: '#f97316',
    });
    setIsCreating(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#12151e] border border-white/10 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Autenticação & Perfis do Time
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Acesse sua <strong>Versão Exclusiva</strong> pessoal ou sincronize com a{' '}
            <strong>Versão em Conjunto</strong> dos 3 membros.
          </p>
        </div>

        {!isCreating ? (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
              <span>Selecione seu perfil ativo:</span>
              <span className="text-[11px] text-orange-400 font-normal">3 Membros sincronizados</span>
            </div>

            <div className="space-y-2.5 mb-6">
              {users.map((u) => {
                const isSelected = u.id === currentUserId;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUser(u.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'bg-orange-500/10 border-orange-500/40 shadow-sm'
                        : 'bg-[#161a25] border-white/5 hover:border-white/20 hover:bg-[#1a1e2b]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border border-white/10 shadow-inner"
                        style={{ backgroundColor: `${u.color || '#f97316'}22` }}
                      >
                        <span>{u.avatar || '👤'}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{u.name}</h4>
                          {isSelected && (
                            <span className="text-[10px] bg-orange-500/20 text-orange-300 font-semibold px-2 py-0.5 rounded-md border border-orange-500/30">
                              Ativo agora
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{u.role || u.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                          <UserCheck className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/5 text-slate-400 flex items-center justify-center group-hover:text-white group-hover:bg-white/10">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Quer alternar ou cadastrar?</span>
              <button
                onClick={() => setIsCreating(true)}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Adicionar outro usuário</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nome do Membro *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Carlos, Ana..."
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail (Opcional)
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Ex: carlos@streak.app"
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Avatar Emoji
              </label>
              <div className="flex gap-2">
                {['🚀', '⚡', '🌟', '🦊', '🦁', '🦉', '🦾', '🔥'].map((em) => (
                  <button
                    type="button"
                    key={em}
                    onClick={() => setNewAvatar(em)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                      newAvatar === em
                        ? 'bg-orange-500/20 border-orange-500 scale-110'
                        : 'bg-[#0a0c12] border-white/5'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20"
              >
                Cadastrar Perfil
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
