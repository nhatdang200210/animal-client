export default function reducer(state, action) {
    switch ( action.type){
        case "CURRENT_USER":
            return { ...state, user: action.payload };
        case "GET_POST":
            return { ...state, posts: action.payload };
        case "CREATE_POST":
            return { ...state, posts: [...state.posts, action.payload] };

        case "UPDATE_POST":
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id
                        ? { ...post, ...action.payload}
                        : post
                ),
            };
        case "DELETE_POST": 
            return{
                ...state,
                post: state.post.filter((post) => post._id !== action.payload._id),
            };
    default:
        return state;
    }
}
