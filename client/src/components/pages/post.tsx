interface IPostPageProps {
	post: any;
}

export const PostPage: React.FC<IPostPageProps> = (props) => {
	return <div>{props.post.name}</div>;
};
