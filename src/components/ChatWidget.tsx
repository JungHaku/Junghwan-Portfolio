import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

const GREETING: Msg = {
  role: 'assistant',
  content: "Hi — I'm Junghwan's assistant. Ask me about his work, his projects, or what he's looking for next.",
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function send() {
    const text = draft.trim()
    if (!text || busy) return
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setDraft('')
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Request failed')
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        className={`chat-launcher${open ? ' hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open Junghwan's Assistant AI"
      >
        <img src="/intmaxx-logo.png" alt="" />
        <span>Ask about Junghwan</span>
      </button>

      <div className={`chat-panel${open ? ' open' : ''}`} role="dialog" aria-label="Junghwan's Assistant AI">
        <header className="chat-head">
          <img src="/intmaxx-logo.png" alt="" className="chat-avatar" />
          <div className="chat-id">
            <span className="chat-name">Junghwan's Assistant AI</span>
            <span className="label">Claude Sonnet 5</span>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
        </header>

        <div className="chat-log" ref={scroller}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>{m.content}</div>
          ))}
          {busy && <div className="chat-msg assistant typing"><i /><i /><i /></div>}
          {error && <div className="chat-error">{error}</div>}
        </div>

        <div className="chat-input">
          <textarea
            ref={input}
            value={draft}
            rows={1}
            placeholder="Ask a question…"
            maxLength={2000}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
            }}
          />
          <button onClick={send} disabled={busy || !draft.trim()} aria-label="Send message">→</button>
        </div>
      </div>
    </>
  )
}
