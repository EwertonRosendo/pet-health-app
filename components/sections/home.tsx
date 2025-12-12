interface HomeProps {
  stats: any
  pets: any[]
}

export default function Home({ stats, pets }: HomeProps) {
  return (
    <div>
      <h2 className="text-white text-3xl font-bold mb-2">Dashboard</h2>
      <p className="text-slate-400 mb-6">Bem-vinda de volta!</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon="🏆" value={stats.xp} label="XP" gradient="from-yellow-500 to-orange-500" />
        <StatCard icon="🎯" value={stats.completed} label="Missões" gradient="from-green-500 to-emerald-600" />
        <StatCard icon="🐾" value={pets.length} label="Pets" gradient="from-blue-500 to-blue-600" />
        <StatCard icon="📅" value="3" label="Consultas" gradient="from-purple-500 to-purple-700" />
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">📈 Atividades Recentes</h3>

        <Activity icon="🏆" title="Missão Completa!" desc="Exercício diário +15 XP" time="2h" />
        <Activity icon="💊" title="Medicação" desc="Vermífugo para Rex" time="1d" />
        <Activity icon="👨‍⚕️" title="Teleconsulta" desc="Dr. Carlos Silva" time="3d" />
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, gradient }: any) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 cursor-pointer transition hover:scale-105`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-white text-3xl font-bold">{value}</div>
      <div className="text-white/90 text-sm">{label}</div>
    </div>
  )
}

function Activity({ icon, title, desc, time }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl mb-2 last:mb-0">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h4 className="text-white text-sm font-bold">{title}</h4>
        <p className="text-slate-400 text-xs">{desc}</p>
      </div>
      <span className="text-slate-500 text-xs">{time}</span>
    </div>
  )
}
