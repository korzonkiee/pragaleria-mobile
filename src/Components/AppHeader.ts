import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { ThunkDispatch } from "../Helpers/StateHelpers"
import { hideError } from "../Modules/Error";
import { AppHeaderStateProps, AppHeaderDispatchProps, AppHeader } from "./AppHeader/index";

export default connect(
    (state: AppState): AppHeaderStateProps => {
        return {
            isLoading: state.tasksCount > 0,
            errorVisible: state.errorVisible
        };
    },
    (dispatch: ThunkDispatch): AppHeaderDispatchProps => {
        return {
            hideError() {
                dispatch(hideError());
            }
        };
    }
)(withNavigation(AppHeader));
