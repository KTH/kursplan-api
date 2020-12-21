/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
import React, { Fragment } from 'react'
import { View, Text, Link } from '@react-pdf/renderer'
import parse, { domToReact } from 'html-react-parser'

import styles from './SyllabusStyles'

// Borrowed from https://github.com/diegomura/react-pdf/
const PROTOCOL_REGEXP = /^([a-z]+:(\/\/)?)/i

const DEST_REGEXP = /^#.+/

export const isSrcId = (src) => src.match(DEST_REGEXP)

const getURL = (value) => {
  if (!value) return ''

  if (isSrcId(value)) return value // don't modify it if it is an id

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `https://kth.se${value}` // Fix internal links, like profiles
  }

  return value
}
// End borrowed from https://github.com/diegomura/react-pdf/

const inlineElementsPresent = (nodes) => {
  const inlineElementTags = ['em', 'strong', 'i', 'b', 'a']
  return nodes && nodes.some((node) => inlineElementTags.includes(node.name))
}

const components = {
  p: (domNode) =>
    inlineElementsPresent(domNode.children) ? (
      <View style={styles.p}>
        <Text>{domToReact(domNode.children, htmlParseOptions)}</Text>
      </View>
    ) : (
      <View style={styles.p}>{domToReact(domNode.children, htmlParseOptions)}</View>
    ),
  em: (domNode) => <Text style={styles.em}>{domToReact(domNode.children, htmlParseOptions)}</Text>,
  strong: (domNode) => <Text style={styles.strong}>{domToReact(domNode.children, htmlParseOptions)}</Text>,
  i: (domNode) => <Text style={styles.i}>{domToReact(domNode.children, htmlParseOptions)}</Text>,
  b: (domNode) => <Text style={styles.b}>{domToReact(domNode.children, htmlParseOptions)}</Text>,
  ul: (domNode) => <View style={styles.ul}>{domToReact(domNode.children, htmlParseOptions)}</View>,
  ol: (domNode) => <View style={styles.ol}>{domToReact(domNode.children, htmlParseOptions)}</View>,
  li: (domNode) => {
    let number
    if (domNode.parent && domNode.parent.name === 'ol') {
      number = domNode.parent.counter
      // eslint-disable-next-line no-param-reassign
      domNode.parent.counter += 1
    }
    return (
      <Text style={number ? styles.olItem : styles.ulItem}>
        {/* TODO: Bullet and spacing should maybe be CSS instead */}
        {number ? `${number < 10 ? '\xa0' + number : number}. ` : ' • '}
        {domToReact(domNode.children, htmlParseOptions)}
      </Text>
    )
  },
  a: (domNode) => <Link src={getURL(domNode.attribs.href)}>{domToReact(domNode.children, htmlParseOptions)}</Link>,
  default: () => <></>
}

const htmlParseOptions = {
  replace: (domNode) => {
    const node = domNode
    if (node.type === 'text') {
      if (node.next && node.next.name === 'p') {
        // Handle HTML where a text node is followed by a paragraph element
        return <Text style={styles.p}>{node.data}</Text>
      }
      return <Text>{node.data}</Text>
    }
    if (node.name === 'ol') {
      node.counter = 1
    }
    const component = components[node.name] || components.default
    return component(node)
  }
}

const removeExcessWhitespace = (html) => html.replace(/\u0020{2,}/g, '\u0020')

const replaceLineBreaks = (html = '') => html.replace(/\n|\r/g, '').replace(/<br>|<br.?\/>/g, '\n')

const addListElement = (html) => {
  if (html.startsWith('<li>')) {
    const indexOfLastCloseListItem = html.lastIndexOf('</li>')
    if (indexOfLastCloseListItem !== -1) {
      return '<ul>' + html.slice(0, indexOfLastCloseListItem + 5) + '</ul>' + html.slice(indexOfLastCloseListItem + 5)
    }
  }
  return html
}

const htmlParser = (rawHtml) => {
  // console.time("htmlParser: replaceLineBreaks");
  const html = addListElement(removeExcessWhitespace(replaceLineBreaks(rawHtml)))
  // console.timeEnd("htmlParser: replaceLineBreaks");
  // console.time("htmlParser: parse");
  const parsedHtml = parse(html, htmlParseOptions)
  // console.timeEnd("htmlParser: parse");
  return parsedHtml
}

export default htmlParser
