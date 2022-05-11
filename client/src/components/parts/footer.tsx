interface IFooterProps {}

export const Footer: React.FC<IFooterProps> = (props) => {
	return (
		<footer className='footer'>
			<div className='content has-text-centered'>
				<p>footer</p>
			</div>
		</footer>
	);
};
