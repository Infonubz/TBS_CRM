// import { combineReducers } from "redux";
// import { crmreducer } from "./Reducer";
// const appreducer = combineReducers({ crmreducer });
// export default (state, action) => {
//   return appreducer(state, action);
// };
import { combineReducers } from "redux";
import { crmreducer } from "./Reducer"; // Adjust the import path as per your folder structure

const rootReducer = combineReducers({
  crm: crmreducer,
  // Add other reducers here if needed
});

export default rootReducer;
