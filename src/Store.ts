import * as config from "./Configuration"
import { Store, createStore, applyMiddleware } from "redux"
import logger from "redux-logger";
import thunk from "redux-thunk";

import { appReducer } from "./Modules/Reducers"

declare var window: { __REDUX_DEVTOOLS_EXTENSION__: any };
export let store: Store<any>;

if (config.IsDebug) {
    store = createStore(
        appReducer as any,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(
            thunk,
            logger
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
