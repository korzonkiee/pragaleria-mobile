import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { ExhibitionsProps, Exhibitions } from './Exhibitions/index';
import { getExhibitions } from '../Modules/Exhibitions/index';

export default connect(
    (state: AppState): StateProps<ExhibitionsProps> => {
        return {
            exhibitions: state.exhibitions
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ExhibitionsProps> => {
        return {
            getExhibitions () {
                dispatch(getExhibitions())
            }
        };
    }
)(Exhibitions);
