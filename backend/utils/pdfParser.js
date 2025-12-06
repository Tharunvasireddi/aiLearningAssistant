import fs from "fs/promises";
import PDFParse from "pdf-parser";
const extractTextFromPdf = async (filepath) => {
  try {
    const dataBuffer = await fs.readFile(filepath);

    const parser = new PDFParse(new Uint8Array(dataBuffer));

    const data = await parser.getText();

    return {
      data: data,
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
