import { connect } from "react-redux";
import { SearchBar, SearchBarStateProps } from "./SearchBar/index";

export default connect(
    (state: AppState): SearchBarStateProps => {
        return {
            isLoading: state.tasksCount > 0
        };
    }
)(SearchBar);
