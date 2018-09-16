import { connect } from "react-redux";
import { ArtistsProps, Artists } from "./Artists/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";

export default connect(
    (state: AppState): StateProps<ArtistsProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtistsProps> => {
        return {
            updateCounter() {
            }
        };
    }
)(Artists);
