import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react'

function splitNode(node: ReactNode, counter: { i: number }): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((tok, k) => {
      if (!tok) return null
      if (/^\s+$/.test(tok)) return ' '
      const style = { '--i': counter.i++ } as CSSProperties
      return (
        <span key={k} className="w" style={style}>
          <span className="wi">{tok}</span>
        </span>
      )
    })
  }
  if (Array.isArray(node)) return Children.map(node, (n) => splitNode(n, counter))
  if (isValidElement(node)) {
    if (node.type === 'br') return node
    const el = node as ReactElement<{ children?: ReactNode }>
    return cloneElement(el, undefined, splitNode(el.props.children, counter))
  }
  return node
}

export function Words({ children }: { children: ReactNode }) {
  return <>{splitNode(children, { i: 0 })}</>
}

export function Chars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="c" style={{ '--i': i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  )
}
