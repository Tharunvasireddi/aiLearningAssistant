/**
 * split text into chunks for better Ai processing
 * @param {string} text - Full text to chunk
 * @param {number} chunkSize - Target size per chunk(in words)
 * @param {number} overlap - Number of words to overlap between chhunks
 * @returns {Array <(content :string,chunkIndex : number,pageNumber:number)>}
 */

export const chunkText = (text, chunkSize = 500, overlap = 50) => {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // clean text whiile preserving paragraph structure
  const cleanText = text
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .replace(/\n /g, "\n")
    .replace(/ \n/g, "\n")
    .trim();

  // try to split by paragraph (single or double newlines)

  const paragraphs = cleanText.split(/\n+/).filter((p) => p.trim().length > 0);

  const chunks = [];
  let currentChunk = [];
  let currentWordCount = 0;
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    const paragraphWords = paragraph.trim().split(/\s+/);
    const paragraphWordCount = paragraphWords.length;

    // if single paragraph exceeda chunk size ,split it by words
    if (paragraphWordCount > chunkSize) {
      if (currentChunk.length > 0) {
        chunks.push({
          content: currentChunk.join(" "),
          chunkIndex: chunkIndex++,
          pageNumber: 0,
        });

        currentChunk = [];
        currentWordCount = 0;
      }

      // split large paragraph into word-based hunks
      for (let i = 0; i < paragraphWords.length; i += chunkSize - overlap) {
        const chunkWords = paragraphWords.slice(i, i + chunkSize);
        chunks.push({
          content: chunkWords.join(" "),
          chunkIndex: chunkIndex++,
          pageNumber: 0,
        });
        if (i + chunkSize >= paragraphWords.length) break;
      }
      continue;
    }

    //if adding this  pragraph exceeds chunk size ,save current chunk
    if (
      currentWordCount + paragraphWordCount > chunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push({
        content: currentChunk.join("\n\n"),
        chunkIndex: chunkIndex++,
        pageNumber: 0,
      });

      // create overlap from previous chunk
      const prevChunkText = currentChunk.join(" ");
      const prevWords = prevChunkText.split(/\s+/);
      const overlapWords = prevWords.slice(-overlap);

      currentChunk = [...overlapWords, paragraph.trim()];
      currentWordCount = overlapWords.length + paragraphWordCount;
    } else {
      // Add paragraph to current chunk
      currentChunk.push(paragraph.trim());
      currentWordCount += paragraphWordCount;
    }
  }

  // add the last chunk
  if (currentChunk.length > 0) {
    chunks.push({
      content: currentChunk.join("\n\n"),
      chunkIndex: chunkIndex,
      pageNumber: 0,
    });

    // fallback if no chunks created split by words
    if (chunks.length === 0 && cleanText.length > 0) {
      const allWords = cleanText.split(/\s+/);
      for (let i = 0; i < allWords.length; i += chunkSize - overlap) {
        const chunkWords = allWords.slice(i, i + chunkSize);
        chunks.push({
          content: chunkWords.join(" "),
          chunkIndex: chunkIndex++,
          pageNumber: 0,
        });

        if (i + chunkSize >= allWords.length) break;
      }
    }
  }
  return chunks;
};

/**
 * Find relevent chunks based on kayword matching
 * @param {Array<Object>} chunks - Array of Chunks
 * @param {string} query - search query
 * @param {number} maxchunks - maximum chunks to return
 * @returns {Array<Object>}
 */

export const findReleventChunks = (chunks, query, maxChunks = 3) => {
  if (!chunks || chunks.length === 0 || !query) {
    return [];
  }

  // common stop words to exclude
  const stopWords = new Set([
    "the",
    "is",
    "at",
    "which",
    "on",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "with",
    "to",
    "for",
    "of",
    "as",
    "by",
    "this",
    "that",
    "it",
  ]);

  // extreact and clean query words
  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  if (queryWords.length === 0) {
    // return clean chunk objects without mongoosse metadata
    return chunks.slice(0, maxChunks).map((chunk) => ({
      content: chunk.content,
      chunkIndex: chunk.chunkIndex,
      pageNumber: chunk.pageNumber,
      _id: chunk._id,
    }));
  }

  const scoredChunks = chunks.map((chunk, index) => {
    const content = chunk.content.toLowerCase();
    const contentWords = content.split(/\s+/).length;
    let score = 0;

    for (const word of queryWords) {
      // exact word match (higer score)
      const exactMathes = (
        content.Match(new RegExp(`\\b${word}\\b`, "g")) || []
      ).length;
      score += exactMathes * 3;

      // partial match (lower score)
      const partialMatches = (content.match(new RegExp(word, "g")) || [])
        .length;
      score = Math.max(0, partialMatches - exactMatches) * 1.5;
    }

    // Bonus  : Multiple query words found
    const uniqueWordsFound = queryWords.filter((word) =>
      content.includes(word)
    ).length;
    if (uniqueWordsFound > 1) {
      score += uniqueWordsFound * 2;
    }

    // Normalize by content length
    const normalizedScore = score / Math.sqrt(contentWords);

    // small bounus for earlier chuks
    const positionsBouns = 1 - (index / chunks.length) * 0.1;

    // Return clean object without mongoose metadata
    return {
      content: chunk.content,
      chunkIndex: chunk.chunkIndex,
      pageNumber: chunk.pageNumber,
      _id: chunk._id,
      score: normalizedScore * positionsBouns,
      rawScore: score,
      mathedWords: uniqueWordsFound,
    };
  });

  return scoredChunks
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (b.mathedWords !== a.mathedWords) {
        return b.mathedWords - a.mathedWords;
      }
      return a.chunkIndex - b.chunkIndex;
    })
    .slice(0, maxChunks);
};
