import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import * as config from "./Configuration";
import { appReducer } from "./Modules/Reducers";


declare var window: { __REDUX_DEVTOOLS_EXTENSION__: any };
export let store: Store<any>;

if (config.IsDebug) {
    store = createStore(
        appReducer as any,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(
            thunk
        )
    );
}
else {
    store = createStore(
        appReducer as any,
        applyMiddleware(
            thunk
        ),
    );
}
