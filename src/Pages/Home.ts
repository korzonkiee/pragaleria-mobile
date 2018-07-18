import { connect } from "react-redux";
import { HomeProps, Home } from "./Home/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { updateCounter } from "../Modules/Home";

export default connect(
    (state: AppState): StateProps<HomeProps> => {
        return {
            counter: state.counter
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<HomeProps> => {
        return {
            updateCounter() {
                dispatch(updateCounter());
            }
        };
    }
)(Home);
