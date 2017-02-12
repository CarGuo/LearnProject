/**
 * Created by guoshuyu on 2017/2/7.
 */
'use strict';

import * as TYPES from './types';


export function seePhoto() {

  return (dispatch) => {
    dispatch({'type': TYPES.SEE_PHOTO})
  }
}

export function hidePhoto(){
  return (dispatch) => {
    dispatch({'type': TYPES.HIDE_PHOTO})
  }
}