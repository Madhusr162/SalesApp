import { createStore } from "redux";
import { combineReducer } from "./userReducer";

export const store=createStore(combineReducer)