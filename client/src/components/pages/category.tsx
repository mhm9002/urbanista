interface ICategoryPageProps {
	category: any;
}

export const CategoryPage: React.FC<ICategoryPageProps> = (props) => {
	return <div>{props.category.name}</div>;
};
