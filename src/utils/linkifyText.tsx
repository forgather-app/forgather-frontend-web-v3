import type { ReactNode } from "react";
import { InlineLink } from "@/styles/@common/InlineLink/InlineLink.styles";

const URL_PATTERN = /https?:\/\/[^\s]+|www\.[^\s]+/gi;
const TRAILING_PUNCTUATION_PATTERN = /[.,!?;:)\]}'"]+$/;

const splitTrailingPunctuation = (
  match: string,
): [url: string, trailing: string] => {
  const trailingMatch = match.match(TRAILING_PUNCTUATION_PATTERN);
  if (!trailingMatch) return [match, ""];

  const trailing = trailingMatch[0];
  return [match.slice(0, match.length - trailing.length), trailing];
};

const toHref = (url: string): string =>
  url.startsWith("www.") ? `https://${url}` : url;

/**
 * 텍스트 안의 URL(http(s):// 또는 www.로 시작하는 문자열)을 하이퍼링크로 변환한다.
 * 문장 부호나 괄호에 바로 뒤따르는 URL은 해당 문자를 링크에서 제외하고 일반 텍스트로 남긴다.
 */
export const linkifyText = (text: string | undefined): ReactNode[] => {
  const input = text ?? "";
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(URL_PATTERN)) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      nodes.push(input.slice(lastIndex, matchIndex));
    }

    const [url, trailing] = splitTrailingPunctuation(match[0]);
    nodes.push(
      <InlineLink
        key={matchIndex}
        href={toHref(url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </InlineLink>,
    );
    if (trailing) nodes.push(trailing);

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < input.length) {
    nodes.push(input.slice(lastIndex));
  }

  return nodes;
};
