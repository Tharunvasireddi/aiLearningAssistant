import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();



if (!process.env.GEMINI_API_KEY) {
  console.log(
    "FATAl Error : GEMINI_API_KEY is not set in the environment varaibles"
  );
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
/**
 * Genrate flashcard from text
 * @param {string} text -document of flashcards to genrate
 * @params {number} count - Number of flashcards to generate
 * @returns {Promises<Arrays<{quesions:string,answer :string ,dfficulty : string}>>}
 */

export const generateFlashcards = async (text, count = 10) => {
  const prompt = `Generate exactly ${count} education flashcards from the following text.
    Format each flashcard as:
    Q:[Clear,specific question]
    A:[Concise ,accurate answer]
    D:[Difficulty level : easy,meduim,or hard]
    
    Separate each flashcards with "---"

    Text
    ${text.substring(0, 1500)}`;

  try {
    console.log("hi hellooo");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    console.log(
      "i am the response at the gemeni sevice generae flsshdffkj",
      response
    );
    const generatedText = response.text;

    // parse the response
    const flashcards = [];
    const cards = generatedText.split("---").filter((c) => c.trim());

    for (const card of cards) {
      const lines = card.trim().split("\n");
      let question = "",
        answer = "",
        difficulty = "meduim";

      for (const line of lines) {
        if (line.startsWith("Q:")) {
          question = line.substring(2).trim();
        } else if (line.startsWith("A:")) {
          answer = line.substring(2).trim();
        } else if (line.startsWith("D:")) {
          const diff = line.substring(2).trim().toLowerCase();
          if (["easy", "meduim", "hard"].includes(diff)) {
            difficulty = diff;
          }
        }
      }
      if (question && answer) {
        flashcards.push({ question, answer, difficulty });
      }
    }
    return flashcards.slice(0, count);
  } catch (error) {
    console.log("Gemini API error:", error);
    throw new Error("Failed to generate flashcards");
  }
};

/**
 * generate quiz questions
 * @param {string} text - Documents text
 * @params {number} numQuesions - Number of questions
 * @return {Promise<Array<{question : string,options:Array,correctAnswer :string,difficulty}}
 */

export const generateQuiz = async (text, numQuestions = 5) => {
  const prompt = `Generate exactly ${numQuestions} multiple chice questions from the following text.
    Format each question as :
    Q:[question]
    O1:[Option 1]
    O2:[Option 2]
    O3:[Option 3]
    O4:[Option 4]
    C:[Correct option - exactly as written above]
    E:[Breif explained]
    D:[Difficulty : easy,medium,or hard]

    separate question with "---"
    Text :
    ${text.substring(0, 1500)}
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const generatedText = response.text;

    const questions = [];

    const questionBlocks = generatedText.split("---").filter((q) => q.trim());

    for (const block of questionBlocks) {
      const lines = block.trim().split("\n");
      let question = "",
        options = [],
        correctAnswer = "",
        explaination = "",
        difficulty = "medium";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("Q:")) {
          question = trimmed.substring(2).trim();
        } else if (trimmed.match(/^O\d:/)) {
          options.push(trimmed.substring(3).trim());
        } else if (trimmed.startsWith("C:")) {
          correctAnswer = trimmed.substring(3).trim();
        } else if (trimmed.startsWith("E:")) {
          explaination = trimmed.substring(2).trim();
        } else if (trimmed.startsWith("D:")) {
          const diff = trimmed.subsstring(2).trim().toLowerCase();
          if (["easy", "medium", "hard"].includes(diff)) {
            difficulty = diff;
          }
        }
      }
      if (question && options.length === 4 && correctAnswer) {
        questions.push({
          question,
          options,
          correctAnswer,
          explaination,
          difficulty,
        });
      }
    }
    return questions.slice(0, numQuestions);
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate quiz");
  }
};

/**
 * Generate document summary
 * @param {string} tex - Document text
 * @return {Promise<string>}
 */

export const generateSummary = async (text) => {
  const prompt = `Provide a concise summary of the following ext ,highlighting the key concpets ,main ideas,and important points, keep the summary clear and structure
  Text :
  ${text.substring(0, 20000)}
  `;

  try {
    const response = await a.models.generatContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const generatedText = response.text;
    return generatedText;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed o generate summary");
  }
};

/**
 * chat with document context
 * @param {string} question -user question
 * @param {Array<Object>} chunks - Relevant Document chunks
 * @returns {Promise<string>}
 */

export const chatWithContext = async (quesion, chunks) => {
  const context = chunks
    .map((c, i) => `[chunk ${i + 1}]\n${c.content}`)
    .join("\n\n");

  const prompt = `Based on the following context from a document ,Analyse the context and answer the user's question 
    if the answer is not in the context say so.

    Context : 
    ${context}

    Question:${quesion}

    Answer :
    `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    const generatedText = response.text;
    return generatedText;
  } catch (error) {
    console.error("gemini API error:", error);
    throw new Error("Failed to process chat request");
  }
};

/**
 * Explain a specific concpet
 * @param {string} concept - concept to explain
 * @param {string} context - Relevant context
 * @returns {Promise<string>}
 */

export const explainConcept = async (concept, context) => {
  const prompt = `Explain the concept of "${concept}" based on the folloing context.
  Provide a clear educational explaination that easy to understand.
  easy to example if relevant.

  context : ${context.substring(0, 10000)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const generatedText = response.text;
    return generatedText;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("failed to explain concept");
  }
};
