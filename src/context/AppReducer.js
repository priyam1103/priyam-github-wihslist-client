/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                user_data: action.payload,
                authenticated:true
            }
            case "LOGOUT":
                return {
                    ...state,
                    user_data: {},
                    authenticated:false
            }
            case "UPDATE_LOADING":
                return {
                    ...state,
                    loading:!state.loading
                }
        default:return
    }
}