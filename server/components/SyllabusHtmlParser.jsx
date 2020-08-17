/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
import React, { Fragment } from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import parse, { domToReact } from "html-react-parser";

import styles from "./SyllabusStyles";

// Borrowed from https://github.com/diegomura/react-pdf/
const PROTOCOL_REGEXP = /^([a-z]+:(\/\/)?)/i;

const DEST_REGEXP = /^#.+/;

export const isSrcId = (src) => src.match(DEST_REGEXP);

const getURL = (value) => {
  if (!value) return "";

  if (isSrcId(value)) return value; // don't modify it if it is an id

  if (typeof value === "string" && !value.match(PROTOCOL_REGEXP)) {
    return `https://kth.se${value}`; // Fix internal links, like profiles
  }

  return value;
};
// End borrowed from https://github.com/diegomura/react-pdf/

const components = {
  p: (domNode) => (
    <View style={styles.p}>
      {domToReact(domNode.children, htmlParseOptions)}
    </View>
  ),
  ul: (domNode) => (
    <View>{domToReact(domNode.children, htmlParseOptions)}</View>
  ),
  li: (domNode) => (
    <Text>
      {/* TODO: Bullet and spacing should maybe be CSS instead */}
      {`\n• `}
      {domToReact(domNode.children, htmlParseOptions)}
    </Text>
  ),
  a: (domNode) => (
    <Link src={getURL(domNode.attribs.href)}>
      {getURL(domNode.attribs.href)}
    </Link>
  ),
  default: () => <Fragment />,
};

const htmlParseOptions = {
  replace: (domNode) => {
    if (domNode.type === "text") {
      return <Text>{domNode.data}</Text>;
    }
    const component = components[domNode.name] || components.default;
    return component(domNode);
  },
};

const replaceLineBreaks = (html) =>
  html.replace(/\n/g, "").replace(/<br>|<br.?\/>/g, "\n");

const htmlParser = (rawHtml) => {
  console.time("htmlParser: replaceLineBreaks");
  const html = replaceLineBreaks(rawHtml);
  console.timeEnd("htmlParser: replaceLineBreaks");
  console.time("htmlParser: parse");
  const parsedHtml = parse(html, htmlParseOptions);
  console.timeEnd("htmlParser: parse");
  return parsedHtml;
};

export default htmlParser;
