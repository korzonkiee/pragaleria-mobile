import { createAction, ReducerMap } from "redux-actions";
import { Dispatch } from "redux";
import { endTask, startTask } from "../Async";
import Logger from "../../Services/Logger"
import * as Api from "../../Services/Api";

const setCatalog = createAction("CATALOG/SET_CATALOG");
const setCatalogLoading = createAction("CATALOG/SET_CATALOG_LOADING");

const TAG = "CATALOG";


export function getCatalog(id: number) {
    return async (dispatch: Dispatch<any>) => {
        dispatch(startTask());
        dispatch(setCatalogLoading({ id: id, loading: true }));
        try {
            const catalog = await Api.getCatalog(id);
            console.log(catalog)
            dispatch(setCatalog({id: id, data: catalog}));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch catalog with id ${id} . ` +
                `Error: ${e}`);

            dispatch(setCatalogLoading({ id: id, loading: false }));
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const
    catalogReducers: ReducerMap<AppState, any> = {
        [setCatalog.toString()](state, action) {
            if (action.payload) {
                return {
                    ...state,
                    catalogs: {
                        ...state.catalogs,
                        [action.payload.id]: {
                            data: action.payload.data,
                            loading: false
                        }
                    }
                }
            }

            return state;
        },
        [setCatalogLoading.toString()](state, action) {
            if (action.payload) {
                return {
                    ...state,
                    catalogs: {
                        ...state.catalogs,
                        [action.payload.id]: {
                            ...state.catalogs[action.payload.id],
                            loading: action.payload.loading,
                        }
                    }
                };
            }

            return state;
        }
    }
