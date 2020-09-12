import AsyncStorage from "@react-native-community/async-storage";
import * as RootNavigation from "../RootNavigation";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };

    case "signup":
    case "signin":
      return { errorMessage: "", token: action.payload };

    case "clear_error_message":
      return { ...state, errorMessage: "" };

    case "signout":
      return { token: null, errorMessage: "" };

    default:
      return state;
  }
};

const navigateToPostLogin = () => {
  RootNavigation.navigate("BottomTab", {
    screen: "TabStack",
    params: {
      screen: "TrackList",
    },
  });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigateToPostLogin();
  } else {
    RootNavigation.navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make api request to sign up with that email and password
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });

      navigateToPostLogin();
    } catch (err) {
      // we can anytime call dispatch when we want to update the state
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
    // if we sign up, modify our state, and say that we are authenticated
    // if signing up fails, we probably need to reflect an error message somewhere
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      navigateToPostLogin();
    } catch (err) {
      // we can anytime call dispatch when we want to update the state
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  RootNavigation.navigate("Signin");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
