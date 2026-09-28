import type { VercelRequest, VercelResponse } from '@vercel/node'

// The agent id is not secret (it ships in the client bundle either way); the
// signed URL is what keeps the ElevenLabs API key server-side and stops other
// sites from embedding the agent on our minutes.
export const VOICE_AGENT_ID = 'agent_7201m3k2eycbf0qvmh90cjry222p'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const key = process.env.ELEVENLABS_API_KEY
  if (!key) {
    res.status(503).json({ error: 'Voice is not configured yet.' })
    return
  }

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${VOICE_AGENT_ID}`,
      { headers: { 'xi-api-key': key } },
    )
    if (!upstream.ok) {
      console.error('elevenlabs signed-url failed:', upstream.status, await upstream.text())
      res.status(502).json({ error: 'Could not start a voice session. Try again.' })
      return
    }
    const data = (await upstream.json()) as { signed_url?: string }
    if (!data.signed_url) {
      res.status(502).json({ error: 'Could not start a voice session. Try again.' })
      return
    }
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json({ signedUrl: data.signed_url })
  } catch (error) {
    console.error('voice-session error:', error instanceof Error ? error.message : error)
    res.status(500).json({ error: 'Something went wrong. Try again.' })
  }
}
