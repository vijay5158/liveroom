import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import AxiosInstance from "../../utils/AxiosInstance";
import { setPostSuccess } from "./postReducer";
import { Alert } from "react-native";


const initialState = {
    classes: [],
    currentClass: {},
    announcements: [],
    error: null,
    loading: false
};

export const classSlice = createSlice({
  name: "classReducer",
  initialState,
  reducers: {
    //Actions
    classError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCLSListSuccess: (state,action) => {
        state.classes = action.payload
    },
    getAnmntListSuccess: (state,action) => {
        state.announcements = action.payload.reverse();
    },
    createAnmntSuccess: (state,action) => {
        state.announcements = [action.payload,...state.announcements]
    },
    addCLSSuccess: (state,action) => {
        state.classes = [...state.classes,action.payload]
    },
    deleteCLSSuccess: (state,action) => {
        const index = state.classes.indexOf(state.classes.filter(cls=> cls.id===action.payload)[0])
        state.classes.splice(index,1);
    },
    setCurrentClass: (state,action) => {
        state.currentClass=action.payload
    },
   
   
  },
});

export const { classError, setCurrentClass, getCLSListSuccess, getAnmntListSuccess, createAnmntSuccess, addCLSSuccess, deleteCLSSuccess } = classSlice.actions;


export const getAllClasses = () => {
    return useSelector((root) => root.classReducer.classes);
  };

export const getCurrentClass = () => {
    return useSelector((root) => root.classReducer.currentClass);
  };

export const getAllAnnouncements = () => {
    return useSelector((root) => root.classReducer.announcements);
  };


export const getClasses = token => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance
            .get("classes/")
            .then(res => {
                const classes = res.data;
                dispatch(getCLSListSuccess(classes));
            })
            .catch(err => {
                Alert.alert(err);
            });
    };
};

export const getAnnouncements = (token,slug) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance
            .get(`announcement/${slug}`)
            .then(res => {
                const announcements = res.data;
                dispatch(getAnmntListSuccess(announcements));
            })
            .catch(err => {
                Alert.alert(err);
            });
    };
};


export const createAnnouncement = (token, Anmnt) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.post(`announcement/`, Anmnt)
            .then(res => {
                console.log(res.data)

                const announcement = res.data
                dispatch(createAnmntSuccess(announcement));
            })
            .catch(err => {
            });
    };
};

export const createCLS = (token, cls,setModalVisible) => {
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.post(`classes/`, cls)
            .then(res => {
                
                dispatch(addCLSSuccess(res.data));
            })
            .catch(err => {
            })
            .finally(()=> setModalVisible(false));
    };
};


export const joinCLS = (token, data,setModalVisible) => {
    const slug = data['slug'];
    const student = {"students" : [data['student_id']]}
    return dispatch => {
        // dispatch(joinCLSStart());
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.patch(`classes/${slug}/`,student)
            .then(res => {
                // const Class = [res.data]
                dispatch(addCLSSuccess(res.data));
            })
            .catch(err => {
                Alert.alert(err);
            })
            .finally(()=> setModalVisible(false))
    };
};

export const deleteCLS = (token, data) => {
    const slug = data['slug'];
    const id = data['id']
    return dispatch => {
        AxiosInstance.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        AxiosInstance.delete(`classes/${slug}/`)
            .then(res => {
                dispatch(deleteCLSSuccess(id))
                Alert.alert("Class deleted");
            })
            .catch(err => {

                Alert.alert(err);
            });
    };
};



export const getCurrentClassSuccess = (token, slug) => {
    return dispatch => {

        AxiosInstance.defaults.headers = {
            Authorization: `Bearer ${token}`
        };
        const url = `class/${slug}/`
        AxiosInstance
            .get(url)
            .then(res => {
                const classData = res.data;
                dispatch(setPostSuccess(classData?.posts));
                dispatch(setCurrentClass(classData))
// console.log(classData);
            })
            .catch(err => {
                Alert.alert(err);
            });

    };
};


export default classSlice.reducer;
