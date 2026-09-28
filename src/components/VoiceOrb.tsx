import { ConversationProvider, useConversation } from '@elevenlabs/react'
import { useEffect, useRef, useState } from 'react'
import { VOICE_CONTEXT } from '../voiceContext'
import { IDLE_HINT, VoiceShell } from './VoiceShell'

const AGENT_ID = 'agent_7201m3k2eycbf0qvmh90cjry222p'

async function getSignedUrl(): Promise<string> {
  const res = await fetch('/api/voice-session')
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error ?? 'Could not start a voice session.')
  return data.signedUrl
}

export default function VoiceOrb() {
  return (
    <ConversationProvider>
      <Orb />
    </ConversationProvider>
  )
}

function Orb() {
  const [caption, setCaption] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const orb = useRef<HTMLButtonElement>(null)

  const conv = useConversation({
    onMessage: ({ role, message }) => {
      if (role === 'agent') setCaption(message)
    },
    onError: (message) => setError(message || 'Something went wrong.'),
    onDisconnect: () => setCaption(null),
    onConnect: () => conv.sendContextualUpdate(VOICE_CONTEXT),
  })
  const { status, isSpeaking } = conv
  const live = status === 'connected'
  const connecting = status === 'connecting'

  // Drive the orb's scale from the agent's output level while it speaks.
  useEffect(() => {
    if (!live) { orb.current?.style.removeProperty('--v'); return }
    let raf = 0
    const tick = () => {
      const v = isSpeaking ? conv.getOutputVolume() : conv.getInputVolume() * 0.6
      orb.current?.style.setProperty('--v', Math.min(1, v * 2.2).toFixed(3))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [live, isSpeaking, conv])

  async function toggle() {
    if (live || connecting) { conv.endSession(); return }
    setError(null)
    setCaption(null)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setError('Microphone access is needed to talk to Gumi.')
      return
    }
    try {
      const signedUrl = await getSignedUrl().catch((e) => {
        // Local dev without the API key: fall back to the public agent id.
        if (import.meta.env.DEV) return null
        throw e
      })
      if (signedUrl) conv.startSession({ signedUrl, connectionType: 'websocket' })
      else conv.startSession({ agentId: AGENT_ID, connectionType: 'websocket' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start a voice session.')
    }
  }

  const state = live ? (isSpeaking ? 'speaking' : 'listening') : connecting ? 'connecting' : 'idle'
  const label = { idle: 'Talk to Gumi', connecting: 'Connecting…', speaking: 'Gumi is speaking', listening: 'Listening…' }[state]

  return (
    <VoiceShell state={state} label={label} orbRef={orb} onToggle={toggle}>
      {live || connecting
        ? <span className="voice-hint"><i>Gumi</i> · Junghwan's assistant · <button className="voice-end" onClick={toggle}>End</button></span>
        : <span className="voice-hint">{IDLE_HINT}</span>}
      {error && <span className="voice-error" role="alert">{error}</span>}
      {live && caption && <span className="voice-caption" aria-live="polite">{caption}</span>}
    </VoiceShell>
  )
}
