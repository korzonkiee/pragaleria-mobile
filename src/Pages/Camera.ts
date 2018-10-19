import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import {Camera, CameraProps} from "./Camera/index";
import {AppState} from "../Modules/Async/AsyncStat";

export default connect(
    (state: AppState): StateProps<CameraProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<CameraProps> => {
        return {
        };
    }
)(Camera);
