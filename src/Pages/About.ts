import { connect } from "react-redux";
import { AboutProps, About } from "./About/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";

export default connect(
    (state: AppState): StateProps<AboutProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<AboutProps> => {
        return {
        };
    }
)(About);
