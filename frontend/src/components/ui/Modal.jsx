const Modal = ({ open, title, children, onClose }) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
			<div className="glass-card w-full max-w-2xl rounded-3xl p-6">
				<div className="mb-4 flex items-start justify-between gap-4">
					<div>
						<h3 className="text-xl font-semibold text-white">{title}</h3>
					</div>
					<button
						className="text-slate-400 transition hover:text-white"
						onClick={onClose}
					>
						Close
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
