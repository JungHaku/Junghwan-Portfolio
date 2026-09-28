import type { ReactNode, RefObject } from 'react'

export const IDLE_HINT = 'Ask Gumi about Junghwan out loud'

type Props = {
  state: 'idle' | 'connecting' | 'listening' | 'speaking'
  label: string
  orbRef?: RefObject<HTMLButtonElement | null>
  onToggle?: () => void
  children?: ReactNode
}

// The orb's markup, shared by the live widget and the fallback Hero shows while
// the ElevenLabs bundle loads, so the swap is invisible.
export function VoiceShell({ state, label, orbRef, onToggle, children }: Props) {
  const active = state !== 'idle'
  return (
    <div className={`voice ${state}`}>
      <button
        ref={orbRef}
        className="voice-orb"
        onClick={onToggle}
        aria-label={active ? 'End the conversation with Gumi' : 'Talk to Gumi, a voice assistant that answers questions about Junghwan'}
        aria-pressed={active}
      >
        <span className="voice-glow" aria-hidden="true" />
        <span className="voice-ring" aria-hidden="true" />
        <span className="voice-core" aria-hidden="true" />
      </button>
      <div className="voice-text">
        <span className="label">{label}</span>
        {children ?? <span className="voice-hint">{IDLE_HINT}</span>}
      </div>
    </div>
  )
}
