import { Link } from "react-router-dom"
import "../scss/sidebarButton.scss";

interface SidebarButtonProps {
	img?: string
	text: string
	link: string
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({ img, text, link }: SidebarButtonProps) => {
	return (
		<Link className="sidebar-btn" to={link}>
			{img &&
			<div>
				<img src={img} alt="Wasn't found!"></img>
			</div>}
			<h3>{text}</h3>
		</Link>
	)
}
