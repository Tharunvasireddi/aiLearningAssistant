import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
const extractTextFromPdf = async (filepath) => {
  try {
    // const dataBuffer = await fs.readFile(filepath);
    // console.log("this is data buffer", dataBuffer);
    const data = new PDFParse({ url: filepath });
    const result = await data.getText();
    // console.log("this is result :", Object.keys(result));
    // console.log("this is line 9:", result.text);

    // console.log("this is total of the result :", result.total);
    return {
      text: result.text,
      numpages: result.pages,
      total: result.total,
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
