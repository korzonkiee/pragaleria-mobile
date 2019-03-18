import * as Nav from "react-navigation";
import { connect } from "react-redux";
import { ThunkDispatch } from "../../Helpers/StateHelpers";
import { getCatalog } from "../../Modules/Catalogs";
import * as Routes from "../../Routes";
import { ExhibitionDetails, ExhibitionDetailsProps } from "./ExhibitionDetails/index";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ExhibitionDetailsProps> => {
        const exhibition: Exhibition = ownProps.navigation.getParam(Routes.NavParamExhibition);
        return {
            exhibition: exhibition,
            catalog: state.catalogs[exhibition.id]
        }
    },
    (dispatch: ThunkDispatch, ownProps: Nav.NavigationInjectedProps): DispatchProps<ExhibitionDetailsProps> => {
        const exhibition: Exhibition = ownProps.navigation.getParam(Routes.NavParamExhibition);
        return {
            getExhibitionsDetails() {
                return dispatch(getCatalog(exhibition.id));
            }
        };
    }
)(ExhibitionDetails);
