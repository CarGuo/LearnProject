/**
 * Created by guoshuyu on 2017/2/7.
 */
'use strict';

import * as TYPES from '../actions/types';

const initialState = {
  seePhotoView: false,
};

export default function Page1(state=initialState, action) {

  switch (action.type) {
    case TYPES.SEE_PHOTO:
      return {
        ...state,
        seePhotoView:true
      };

    case TYPES.HIDE_PHOTO:
      return {
        ...state,
        seePhotoView:false
      };
    default:
      return state;
  }

}