/**
 * Created by guoshuyu on 2017/2/12.
 */
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}