import {connect} from "react-redux";
import {ThunkDispatch} from "../Helpers/StateHelpers";
import {Camera, CameraProps} from "./Camera/index";
import {AppState} from "../Modules/Async/AsyncStat";
import * as Routes from "../Routes";
import * as Nav from "react-navigation";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<CameraProps> => {
        return {
            imageUrl: ownProps.navigation.getParam(Routes.NavParamImageUrl),
            imageDimension: ownProps.navigation.getParam(Routes.NavParamImageDimension)
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<CameraProps> => {
        return {};
    }
)(Camera);
