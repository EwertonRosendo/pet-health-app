interface NotificationProps {
  title: string
  msg: string
}

export default function Notification({ title, msg }: NotificationProps) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-5 duration-300">
      <div className="bg-slate-800 border border-purple-500 rounded-2xl p-4 shadow-2xl max-w-sm">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shrink-0">
            ✓
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-1">{title}</h4>
            <p className="text-slate-400 text-xs">{msg}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
