import { useRef, useState } from "react";
import { useUploadDocumentMutation } from "../../hooks/useDocuments";
import Button from "../ui/Button";
import Input from "../ui/Input";

const DocumentUploadForm = ({ onSuccess }) => {
	const [title, setTitle] = useState("");
	const [file, setFile] = useState(null);
	const fileInputRef = useRef(null);
	const uploadMutation = useUploadDocumentMutation();
	const selectedFileLabel = file ? file.name : "No file selected";

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!file || !title.trim()) return;

		const formData = new FormData();
		formData.append("title", title.trim());
		formData.append("file", file);
		uploadMutation.mutate(formData, {
			onSuccess: () => {
				setTitle("");
				setFile(null);
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				onSuccess?.();
			},
		});
	};

	return (
		<form
			className="glass-card grid gap-4 rounded-3xl p-5"
			encType="multipart/form-data"
			onSubmit={handleSubmit}
		>
			<Input
				label="Document title"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder="Enter a title"
			/>
			<label className="flex flex-col gap-2 text-sm text-slate-200">
				<span className="font-medium text-slate-100">PDF file</span>
				<input
					ref={fileInputRef}
					className="safe-focus rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
					type="file"
					accept="application/pdf"
					required
					onChange={(event) => setFile(event.target.files?.[0] || null)}
				/>
				<span className="text-xs text-slate-400">{selectedFileLabel}</span>
			</label>
			<Button
				type="submit"
				loading={uploadMutation.isPending}
				disabled={!title.trim() || !file}
			>
				Upload document
			</Button>
		</form>
	);
};

export default DocumentUploadForm;
