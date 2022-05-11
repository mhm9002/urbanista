interface IProfilePageProps {
	user: any;
}

export const ProfilePage: React.FC<IProfilePageProps> = (props) => {
	return <div>{props.user.name}</div>;
};
