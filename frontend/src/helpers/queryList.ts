const queryList = {
	createUser: 'createUser',
	removeUser: 'removeUser',
	updateUser: 'updateUser',
	getUser: 'getUser',
	allUsers: 'allUsers',
	createPost: 'createPost',
	removePost: 'removePost',
	updatePost: 'updatePost',
	getPost: 'getPost',
	getFeaturedPosts:'getFeaturedPosts',
	allPost: 'allPost',
	createCategory: 'createCategory',
	removeCategory: 'removeCategory',
	updateCategory: 'updateCategory',
	getCategory: 'getCategory',
	allCategories: 'allCategories',
	login: 'login',
	postByCategoryName: 'postByCategoryName',
	postByAuthor: 'postByAuthor',
	validateUser: 'validateUser',
	publishPost: 'publishPost',
	featurePost: 'featurePost',
	userBookmarks: 'userBookmarks',
	bookmarkPost: 'bookmarkPost',
	userLikes: 'userLikes',
	likePost: 'likePost',
	addComment: 'addComment',
	searchTerm: 'searchTerm',
	refillTerms:'refillTerms'
};

const uploadQueryList = {
	uploadImage: 'uploadImage',
	loadImage: 'loadImage',
	uploadProfile: 'uploadProfile',
};

export { queryList, uploadQueryList };
