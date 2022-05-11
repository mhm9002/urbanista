interface IAuthorPageProps {
	author: any;
}

export const AuthorPage: React.FC<IAuthorPageProps> = (props) => {
	return <div>{props.author.name}</div>;
};
