import * as types from '../constants/appConstants'; // TODO: refactoring  code!!!

const initislState = {
  isFetching: false,
  data: {}
}
const application = (state = initislState, action) => {
  switch(action.type) {
        case types.START_DATA_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case types.STOP_DATA_FETCHING:
            return {
                ...state,
                isFetching: false
            }
        case types.RECIEVE_DATA:
            return {
                ...state,
                data: action.data
            }
        case types.SELECT_ITEM:
            return {
                ...state,
                selected: action.item
            }
        default:
          return state;
        }
      }

export default application;
