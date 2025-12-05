import Document from "../models/Document.js";

const createDocumentController = async (req, res) => {
  console.log("this create document controller");
};

const getDocumentsController = async (req, res) => {
  console.log("this is get all dcoument controller");
};

const getDocumentController = async (req, res) => {
  console.log("this is get single document controller");
};

const updateDocumentController = async (req, res) => {
  console.log("this is update controller document");
};

const deleteDocumentController = async (req, res) => {
  console.log("this is delete document controller");
};

export {
  createDocumentController,
  getDocumentsController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
};
