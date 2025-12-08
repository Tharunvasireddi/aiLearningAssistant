import fs from "fs/promises";
import {PDFParse} from "pdf-parse";
const extractTextFromPdf = async (filepath) => {
  try {
    const dataBuffer = await fs.readFile(filepath);

    const data = await new PDFParse(dataBuffer);

    return {
      text: data.text,
      numpages: data.numpages,
      info: data.info,
    };
  } catch (error) {
    console.log(
      "error while extracting the text from the given document",
      error
    );
    throw new Error("Failed to extract text from pdf");
  }
};

export default extractTextFromPdf;
