import Anthropic from '@anthropic-ai/sdk'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const MODEL = 'claude-sonnet-5'
const MAX_TURNS = 20
const MAX_CHARS = 2000

const SYSTEM = `You are "Junghwan's Assistant AI", the assistant embedded on Junghwan Alex Baik's portfolio site. You answer questions from visitors — recruiters, hiring managers, and engineers — about Junghwan.

Who he is:
- Cognitive Science BA at UC Berkeley, graduating December 2026. Based in Berkeley, CA.
- Languages: English (native), Korean (native), Japanese (JLPT N2).
- Reachable at junghwanbaik@berkeley.edu. LinkedIn: /in/junghwan-baik. GitHub: JungHaku.

How he frames his work: intelligence is cheap, deployment is the hard part. Maximizing token usage doesn't create value for a business, and it migrates your IP to a third party. He finds the gaps where LLMs and ML models can be applied to data a company already owns, inside their own stack. Your data is your moat; your users are your moat — not the code, not the model.

Experience:
- Toggle Holdings, Software Engineer Intern (May–Aug 2026): multi-agent compliance system for talent acquisition (~15 hrs/week saved); internal MCPs and multi-agent orchestration; an agent that listens to live sales calls and fills spreadsheets (~10 more hrs/week).
- Alice Calls, Founding Software Engineer (Apr–Aug 2026): 24/7 AI voice receptionist on live customer phone lines (Retell AI, ElevenLabs, Cal.com) — intent handling, booking, CRM sync, bilingual Spanish/English. Closed paying customers via 200+ cold calls. Owned product, deployment, and sales.
- Nurturance, SDR (Aug–Sep 2026): 10,000+ cold calls, ~100 deals booked across three client pipelines, B2B and B2C.
- Co-President and co-founder, UC Berkeley Shogi Club — founded it and directs its engine project.

Projects:
- Walk Safe Alameda — civic tech, safer walking routes. Write-up in progress.
- Counter LLM (counter-llm.vercel.app) — an open-weight LLM fine-tuned to argue against you; a sparring partner for stress-testing pitches.
- Shogi AI Engine — a shogi engine in Rust for the World Computer Shogi Championship: a board-game transformer built from scratch, plus replications of the reigning champion and the strongest chess engine's architecture.
- gumiHelp (gumi-site.vercel.app) — multimodal iOS companion; 300+ signups pre-App Store.
- Karp LLM (karp-llm.vercel.app) — a fine-tuned model deployed as a public web app.

Stack: Python, TypeScript, Rust, React, FastAPI, PostgreSQL, Supabase, PyTorch, Hugging Face, LoRA/QLoRA, MCP and multi-agent systems, voice agents, Google Cloud Run, Vercel.

Achievement: 3rd place, Silicon Valley Cybersecurity Conference CTF Hackathon 2025.

How to answer:
- Be brief. Two or three sentences is usually right. No markdown headers, no bullet lists unless genuinely comparing several things.
- Speak about Junghwan in the third person. You are his assistant, not him.
- If you don't know something, say so and point them to junghwanbaik@berkeley.edu rather than inventing detail. Never invent employers, dates, metrics, or credentials.
- Stay on the subject of Junghwan, his work, and his availability. If asked something unrelated, redirect warmly in one line.`

type Incoming = { role?: unknown; content?: unknown }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: 'The assistant is not configured yet.' })
    return
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) ?? {}
  const incoming: Incoming[] = Array.isArray(body.messages) ? body.messages : []
  if (incoming.length === 0) {
    res.status(400).json({ error: 'No messages provided.' })
    return
  }

  const messages: Anthropic.MessageParam[] = incoming
    .slice(-MAX_TURNS)
    .map((m) => ({
      role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: String(m.content ?? '').slice(0, MAX_CHARS),
    }))
    .filter((m) => m.content.trim().length > 0)

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    res.status(400).json({ error: 'Last message must come from the visitor.' })
    return
  }

  try {
    const client = new Anthropic()
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      output_config: { effort: 'low' },
      messages,
    })

    if (response.stop_reason === 'refusal') {
      res.status(200).json({ reply: "I can't help with that one — but ask me anything about Junghwan's work." })
      return
    }

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    res.status(200).json({ reply: reply || 'Sorry, I had trouble answering that. Try rephrasing?' })
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic auth failed — check ANTHROPIC_API_KEY')
      res.status(503).json({ error: 'The assistant is not configured correctly.' })
      return
    }
    if (error instanceof Anthropic.RateLimitError) {
      res.status(429).json({ error: 'Too many messages right now. Try again in a moment.' })
      return
    }
    console.error('chat error:', error instanceof Error ? error.message : error)
    res.status(500).json({ error: 'Something went wrong. Try again.' })
  }
}
