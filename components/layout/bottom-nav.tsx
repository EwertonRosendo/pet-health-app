"use client"

interface BottomNavProps {
  section: string
  onChange: (section: string) => void
}

export default function BottomNav({ section, onChange }: BottomNavProps) {
  const items = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "pets", icon: "🐾", label: "Pets" },
    { id: "health", icon: "❤️", label: "Saúde" },
    { id: "quest", icon: "🏆", label: "Quest" },
    { id: "connect", icon: "👨‍⚕️", label: "Connect" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[414px] mx-auto bg-slate-800/95 backdrop-blur-md border-t border-slate-600 p-3 flex justify-around">
      {items.map((item) => {
        const isActive = section === item.id

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 bg-transparent border-none cursor-pointer rounded-xl text-xs transition ${
              isActive ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
