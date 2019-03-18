import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getArtists, searchArtists } from "../Modules/Artists";
import { Artists, ArtistsProps } from "./Artists/index";

export default connect(
    (state: AppState): StateProps<ArtistsProps> => {
        return {
            artists: state.artists,
            filteredArtists: state.filteredArtists
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtistsProps> => {
        return {
            getArtists() {
                return dispatch(getArtists())
            },
            searchArists(keyword: string) {
                return dispatch(searchArtists(keyword));
            }
        };
    }
)(Artists);
