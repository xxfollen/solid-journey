import React, { useMemo } from 'react';

// Generates the activity grid matrix
export default function Heatmap({ habits = [], color = '#f97316', title = 'Mapa de Consistência & Sequência' }) {
  // Aggregate completions per day for all habits
  const { grid, maxCount, totalCheckins, daysActive } = useMemo(() => {
    const dayMap = {};
    let total = 0;

    habits.forEach((habit) => {
      if (!habit.history) return;
      Object.entries(habit.history).forEach(([dateStr, done]) => {
        if (done) {
          dayMap[dateStr] = (dayMap[dateStr] || 0) + 1;
          total += 1;
        }
      });
    });

    // Generate past 14 weeks (98 days) leading up to today
    const today = new Date();
    const days = [];
    const totalDays = 98; // 14 weeks * 7 days

    // Align to start on Monday
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      const count = dayMap[iso] || 0;
      days.push({
        date: d,
        iso,
        count,
        dayOfWeek: d.getDay(), // 0 = Sun, 1 = Mon ...
      });
    }

    // Split into 14 columns of 7 days
    const columns = [];
    for (let i = 0; i < days.length; i += 7) {
      columns.push(days.slice(i, i + 7));
    }

    const counts = Object.values(dayMap);
    const max = counts.length > 0 ? Math.max(...counts, 1) : 1;
    const activeDaysCount = Object.keys(dayMap).length;

    return {
      grid: columns,
      maxCount: max,
      totalCheckins: total,
      daysActive: activeDaysCount,
    };
  }, [habits]);

  // Color intensity helper
  const getCellBg = (count) => {
    if (count === 0) return 'bg-[#151922] hover:bg-[#1e2433] border border-white/5';
    const ratio = count / Math.max(maxCount, 1);
    if (ratio < 0.25) return 'bg-orange-950/80 text-orange-200 border border-orange-800/40';
    if (ratio < 0.5) return 'bg-orange-800 text-orange-100 border border-orange-600/50';
    if (ratio < 0.8) return 'bg-orange-600 text-white shadow-sm shadow-orange-600/30';
    return 'bg-orange-500 text-white shadow-md shadow-orange-500/50 animate-pulse-subtle';
  };

  return (
    <div className="bg-[#12151e] border border-white/10 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Registro visual dos últimos 98 dias no estilo InlitX Streak
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-slate-400">Total Check-ins:</span>
            <span className="font-bold text-orange-400">{totalCheckins}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-slate-400">Dias Ativos:</span>
            <span className="font-bold text-emerald-400">{daysActive}d</span>
          </div>
        </div>
      </div>

      {/* Grid container with horizontal scroll on small mobile */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[580px]">
          <div className="flex gap-1.5 justify-between">
            {grid.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {col.map((day) => {
                  const dateLabel = day.date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  });
                  return (
                    <div
                      key={day.iso}
                      title={`${dateLabel}: ${day.count} hábitos completados`}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[4px] transition-all duration-200 cursor-pointer ${getCellBg(
                        day.count
                      )} hover:scale-125 hover:z-10`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 px-1">
            <div className="flex gap-6">
              <span>90 dias atrás</span>
              <span>Hoje</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Menos</span>
              <div className="w-2.5 h-2.5 rounded bg-[#151922] border border-white/10" />
              <div className="w-2.5 h-2.5 rounded bg-orange-950/80 border border-orange-800/40" />
              <div className="w-2.5 h-2.5 rounded bg-orange-800" />
              <div className="w-2.5 h-2.5 rounded bg-orange-600" />
              <div className="w-2.5 h-2.5 rounded bg-orange-500" />
              <span>Mais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
