import { connect } from "react-redux";

import { AppTextFieldStateProps, AppTextField as AppTextFieldComponent } from "./AppTextField/index";

export const AppTextField = connect(
    (state: AppState): AppTextFieldStateProps => {
        return {
            isLoading: state.tasksCount > 0
        };
    },
    undefined, undefined, { withRef: true }
)(AppTextFieldComponent);

export { AppTextField as AppTextFieldComponent } from "./AppTextField/index";
