const segmenter = new Intl.Segmenter("und", { granularity: "grapheme" });

export const getGraphemeLength = (value: string): number =>
  Array.from(segmenter.segment(value)).length;
