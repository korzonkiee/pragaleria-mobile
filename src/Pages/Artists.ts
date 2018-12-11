import { connect } from "react-redux";
import { ArtistsProps, Artists } from "./Artists/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getArtists, searchArtists } from "../Modules/Artists";

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
