import type { LexicalContent, LexicalNode } from '../types'

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const renderNode = (node: LexicalNode): string => {
  if (node.type === 'text') {
    return escapeHtml(node.text || '')
  }

  const children = (node.children || []).map(renderNode).join('')

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading':
      return `<${node.tag || 'h2'}>${children}</${node.tag || 'h2'}>`
    case 'list':
      return `<ul>${children}</ul>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'linebreak':
      return '<br />'
    default:
      return children
  }
}

export const lexicalToHtml = (content?: LexicalContent | null): string => {
  if (!content?.root?.children?.length) return ''
  return content.root.children.map(renderNode).join('')
}

export const lexicalToPlainText = (content?: LexicalContent | null): string => {
  if (!content?.root?.children?.length) return ''

  const extract = (node: LexicalNode): string => {
    if (node.type === 'text') return node.text || ''
    return (node.children || []).map(extract).join(' ')
  }

  return content.root.children.map(extract).join(' ').trim()
}
