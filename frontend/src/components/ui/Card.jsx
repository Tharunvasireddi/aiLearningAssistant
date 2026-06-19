import { classNames } from "../../utils/classNames";

const Card = ({ className, children, ...props }) => (
	<section
		className={classNames("glass-card rounded-3xl p-5", className)}
		{...props}
	>
		{children}
	</section>
);

export default Card;
