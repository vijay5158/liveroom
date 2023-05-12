import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import AxiosInstance from "../../utils/AxiosInstance";
import { Alert } from "react-native";


const initialState = {
    classSlug: null,
    posts: {},
    comments:[],
    error: null,
    loading: false
};


export const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    //Actions
    postError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPostSuccess: (state,action) => {
        state.posts = action.payload
    },
    createPostSuccess: (state,action) => {
        state.posts = {...state.posts,[action.payload.id]:action.payload}
    },
    createCommentSuccess: (state,action) => {
        const postId = action.payload?.post;
        const newComment = { ...action.payload };
        if(state.posts.hasOwnProperty(postId)){
        state.posts = {
            ...state.posts,
            [postId]:{
                ...state.posts[postId],
                comments:{...state.posts[postId].comments,[newComment.id]:newComment}
            }
        }
    }
    }
  },
});

export const { postError,setPostSuccess,createPostSuccess,createCommentSuccess } = postSlice.actions;

export const usePosts = () => useSelector(root => root?.postReducer?.posts);
export const useclassSlug = () => useSelector(root => root?.postReducer?.classSlug);
export const useComments = () => useSelector(root => root?.postReducer?.comments);
export const usePostError = () => useSelector(root => root?.postReducer?.error);
export const usePostloading = () => useSelector(root => root?.postReducer?.loading);

export const createPost = (token, post) => {
    return dispatch => {
        AxiosInstance.post('post/', post, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${post._boundary}`,
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data);
                // dispatch(createPostSuccess(res.data));
            })
            .catch(err => {
            });
    };
};



export const createComment = (token, comment,setNewComment) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
  
        AxiosInstance.post('comment/', comment)
            .then(res => {
                console.log(res.data);
                setNewComment("");
                // Alert.alert(res.data)
                // dispatch(createCommentSuccess(res.data));
            })
            .catch(err => {
                Alert.alert(err)
            });
    };
};

export default postSlice.reducer;