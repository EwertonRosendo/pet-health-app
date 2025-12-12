"use client"

import { useState } from "react"

interface QuestProps {
  quests: any[]
  onComplete: (id: number) => void
  stats: any
}

export default function Quest({ quests, onComplete, stats }: QuestProps) {
  const [tab, setTab] = useState("ativas")

  const activeQuests = quests.filter((q) => q.active !== false)
  const completedQuests = quests.filter((q) => q.active === false)

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl font-bold">PetQuest</h2>
        <div className="flex items-center gap-2 text-yellow-500 font-bold">
          <span>🏆</span>
          <span>{stats.xp} XP</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-white font-medium">Nível {stats.level}</span>
          <span className="text-slate-400 text-sm">{stats.xp % 100}/100 XP</span>
        </div>
        <div className="w-full h-3 bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
            style={{ width: `${stats.xp % 100}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-700/50 rounded-xl p-1 mb-6">
        <TabButton active={tab === "ativas"} onClick={() => setTab("ativas")}>
          Ativas
        </TabButton>
        <TabButton active={tab === "completas"} onClick={() => setTab("completas")}>
          Completas
        </TabButton>
      </div>

      {/* Quests List */}
      {tab === "ativas" &&
        activeQuests.map((quest) => <QuestCard key={quest.id} quest={quest} onComplete={onComplete} />)}

      {tab === "completas" && completedQuests.map((quest) => <QuestCard key={quest.id} quest={quest} completed />)}
    </div>
  )
}

function TabButton({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 border-none rounded-lg cursor-pointer text-sm font-medium transition ${
        active ? "bg-purple-600 text-white" : "bg-transparent text-slate-400 hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  )
}

function QuestCard({ quest, completed, onComplete }: any) {
  return (
    <div
      onClick={() => !completed && onComplete?.(quest.id)}
      className={`bg-slate-700/50 backdrop-blur-lg rounded-2xl p-5 mb-5 cursor-pointer transition flex gap-4 ${
        completed ? "border border-green-500/50 opacity-70" : "border border-slate-600/30 hover:border-slate-500/50"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
          completed ? "bg-green-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
        }`}
      >
        {completed ? "✓" : "🏆"}
      </div>

      <div className="flex-1">
        <h3 className="text-white font-bold mb-1">{quest.name}</h3>
        <p className="text-slate-400 text-sm mb-3">{quest.description}</p>
        <div className="flex gap-4 text-sm">
          <span className="text-green-500">+{quest.xp} XP</span>
          {!completed && (
            <span className="text-slate-400">
              {quest.progress || 0} / {quest.times}
            </span>
          )}
        </div>
      </div>

      {completed && <div className="text-green-500 text-2xl">✓</div>}
    </div>
  )
}
