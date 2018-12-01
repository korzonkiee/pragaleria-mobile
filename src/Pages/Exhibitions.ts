import { connect } from "react-redux";
import { ExhibitionsProps, Exhibitions } from "./Exhibitions/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";

export default connect(
    (state: AppState): StateProps<ExhibitionsProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ExhibitionsProps> => {
        return {
        };
    }
)(Exhibitions);
