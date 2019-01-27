import * as Nav from "react-navigation";
import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import * as Routes from "../Routes";
import { Camera, CameraProps } from "./Camera/index";

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
