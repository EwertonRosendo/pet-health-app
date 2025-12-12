"use client"

interface HeaderProps {
  user: any
  stats: any
  onLogout: () => void
}

export default function Header({ user, stats, onLogout }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white text-xl">👤</div>
        <div>
          <h3 className="text-white font-bold text-base">{user?.name}</h3>
          <p className="text-white/80 text-sm">
            Nível {stats.level} • {stats.xp} XP
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="w-10 h-10 bg-purple-600/50 border-none rounded-xl text-white cursor-pointer relative hover:bg-purple-600/70 transition">
          🔔
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <button
          onClick={onLogout}
          className="w-10 h-10 bg-red-500/50 border-none rounded-xl text-white cursor-pointer hover:bg-red-500/70 transition"
        >
          🚪
        </button>
      </div>
    </div>
  )
}
