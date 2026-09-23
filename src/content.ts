export const EMAIL = 'junghwanbaik@berkeley.edu'

export const NAV_LINKS = [
  { href: '#approach', label: 'Approach' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export const STRIP = [
  { label: 'Education', value: 'UC Berkeley, Cognitive Science' },
  { label: 'Available', value: 'December 2026' },
  { label: 'Languages', value: 'English, Korean, Japanese' },
  { label: 'Focus', value: 'Agents, fine-tuning, deployment' },
]

export const MARQUEE = [
  'Agents', 'Evals', 'MCP', 'Fine-tuning', 'LoRA / QLoRA', 'PyTorch', 'Rust',
  'Voice AI', 'n8n', 'Cloud Run', 'Vercel', 'Forward deployed', 'EN · KO · JA',
]

// TODO: Walk Safe Alameda and Karp LLM descriptions are placeholders pending real copy.
// Links: Walk Safe Alameda still needs one.
export const WORK = [
  { n: '01', title: 'Walk Safe Alameda', href: '#', desc: 'A tool for finding safer walking routes around Alameda. Full write-up coming soon.', meta: ['Civic tech', 'Maps'] },
  { n: '02', title: 'Counter LLM', href: 'https://counter-llm.vercel.app/', desc: 'An open-weight LLM fine-tuned to argue against you: a sparring partner for stress-testing pitches and arguments before high-stakes conversations. Live on Vercel.', meta: ['Fine-tuning', 'LoRA'] },
  { n: '03', title: 'Shogi AI Engine', href: '#', desc: 'A Japanese chess engine in Rust built for the World Computer Shogi Championship: a board-game transformer from scratch, plus replications of the reigning champion and the strongest chess engine\'s architecture.', meta: ['Rust', 'ML'] },
  { n: '04', title: 'gumiHelp', href: 'https://gumi-site.vercel.app', desc: 'A multimodal iOS companion: AI news, games, calendar, voice conversation, chat, photo understanding and lecture notes. 300+ signups ahead of the App Store release.', meta: ['iOS', 'Multimodal'] },
  { n: '05', title: 'Karp LLM', href: 'https://karp-llm.vercel.app/', desc: 'A custom fine-tuned language model deployed as a public web application. Full write-up coming soon.', meta: ['Fine-tuning', 'Web'] },
]

export const EXPERIENCE: {
  n: string; org: string; role: string; dates: string[]; desc: string; logo?: string; logoH?: number
}[] = [
  { n: '01', org: 'Toggle Holdings', logo: '/toggle-logo.png', role: 'Software Engineer Intern', dates: ['May – Aug', '2026'], desc: 'Built and deployed a multi-agent compliance system for talent acquisition, saving ~15 hours a week. Set up internal MCPs and multi-agent orchestration for the agent platform, and shipped an agent that listens to live sales calls and fills in the spreadsheets, saving ~10 more.' },
  { n: '02', org: 'Alice Calls', role: 'Founding Software Engineer', dates: ['Apr – Aug', '2026'], desc: 'Shipped a 24/7 AI voice receptionist (Retell AI, ElevenLabs, Cal.com) on live customer phone lines: intent handling, booking, CRM sync and bilingual Spanish/English. Closed paying customers through 200+ cold calls and owned product, deployment and sales end to end.' },
  { n: '03', org: 'Nurturance', logo: '/nurturance-logo.png', logoH: 34, role: 'SDR', dates: ['Aug – Sep', '2026'], desc: 'Cold-called 10,000+ prospects and booked ~100 deals across three client pipelines, B2B and B2C. Discovered ICPs, wrote the pitches, and delivered them.' },
  { n: '04', org: 'UC Berkeley Shogi Club', role: 'Co-President & Co-Founder', dates: ['2026 –', 'Present'], desc: 'Co-founded Berkeley\'s first shogi club and registered it as a student organization. Lead the officer team and direct the club\'s engine project.' },
]

export const PRINCIPLES = [
  { n: 'I', title: 'The metric comes first.', desc: "If we can't name the number that should move, we're not ready to write code." },
  { n: 'II', title: 'Sit with the user.', desc: "The edge cases live in someone's head, not in the spec. I go find them." },
  { n: 'III', title: 'Own it end to end.', desc: 'Discovery, model, infrastructure, rollout. One person accountable for the outcome.' },
]

export const FACTS = [
  { label: 'Based in', value: 'Berkeley, CA' },
  { label: 'Graduating', value: 'December 2026' },
  { label: 'Languages', value: 'English · 한국어 · 日本語 (N2)' },
  { label: 'Stack', value: 'Python, TypeScript, Rust, PyTorch, MCP, n8n, Cloud Run' },
  { label: 'Achievement', value: '3rd place, SVCC CTF Hackathon 2025' },
  { label: 'Off hours', value: 'Shogi, MMA' },
]

export const SOCIAL = [
  { href: 'https://www.linkedin.com/in/junghwan-baik', label: 'LinkedIn' },
  { href: 'https://github.com/JungHaku', label: 'GitHub' },
]
