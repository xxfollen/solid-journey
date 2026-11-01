import React, { useState, useEffect } from 'react';
import { X, Sparkles, Flame, Check } from 'lucide-react';

const PRESET_ICONS = ['💧', '💻', '🏋️‍♂️', '📖', '🧘‍♀️', '🥗', '🌙', '🎨', '🏃‍♂️', '🎯', '⚡', '🚴‍♂️', '🎸', '💰', '🧠'];
const PRESET_COLORS = [
  '#f97316', // Orange
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#3b82f6', // Blue
];

const PRESET_CATEGORIES = ['Saúde', 'Fitness', 'Foco & Carreira', 'Mente', 'Estudos', 'Finanças', 'Criatividade'];
const PRESET_TIMES = ['Manhã', 'Tarde', 'Noite', 'Dia Todo'];

export default function HabitModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(PRESET_CATEGORIES[0]);
  const [icon, setIcon] = useState('🔥');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [timeOfDay, setTimeOfDay] = useState('Dia Todo');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || PRESET_CATEGORIES[0]);
      setIcon(initialData.icon || '🔥');
      setColor(initialData.color || PRESET_COLORS[0]);
      setTimeOfDay(initialData.timeOfDay || 'Dia Todo');
    } else {
      setTitle('');
      setDescription('');
      setCategory(PRESET_CATEGORIES[0]);
      setIcon('🔥');
      setColor(PRESET_COLORS[0]);
      setTimeOfDay('Dia Todo');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: initialData?.id,
      title: title.trim(),
      description: description.trim(),
      category,
      icon,
      color,
      timeOfDay,
      currentStreak: initialData?.currentStreak || 0,
      bestStreak: initialData?.bestStreak || 0,
      streakFreeze: initialData?.streakFreeze ?? 2,
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      history: initialData?.history || {},
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#131620] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: `${color}22` }}
          >
            <span>{icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {initialData ? 'Editar Hábito' : 'Novo Hábito / Tarefa'}
            </h3>
            <p className="text-xs text-slate-400">
              Configure sua rotina para construir sequências inquebráveis
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Título do Hábito *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Ler 20 páginas, Treinar musculação..."
              className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Descrição / Meta (Opcional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Sem celular durante o processo, focar em retenção..."
              className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              >
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Horário Preferido
              </label>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              >
                {PRESET_TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Emoji Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Ícone
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_ICONS.map((em) => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setIcon(em)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                    icon === em
                      ? 'bg-orange-500/20 border-orange-500 text-white scale-110'
                      : 'bg-[#0a0c12] border-white/5 hover:border-white/20'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Cor de Destaque
            </label>
            <div className="flex items-center gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#131620] scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {color === c && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{initialData ? 'Atualizar Hábito' : 'Salvar Hábito'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
