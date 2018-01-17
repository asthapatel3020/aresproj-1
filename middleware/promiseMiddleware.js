/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule promiseMiddleware
 */

export default function promiseMiddleware() {

  return next => action => {
    const { promise, type, ...rest } = action;
   
    if (!promise) return next(action);
   
    const SUCCESS = type ;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    console.log("promise", action.type)
    next({ ...rest, type: REQUEST });
    switch (type) {
      case "ADD_COUNTRY":
        return promise
          .then(res => {
            next({ ...rest, res, type: SUCCESS }),
            next({type:`${type}_SUCCESS`});
            console.log("EDIT PROMISE")
            return res; /* simple chaining mechanism, at least return something from our promise */
          })
          .catch(error => {
            next({ ...rest, error, type: FAILURE });
            console.log("fail1", error)

            return false;
          });

      default: 
        return promise
        .then(res => {
          next({ ...rest, res, type: SUCCESS }),
          next({type:"_SUCCESS"});
          console.log("res", res)
          return res; /* simple chaining mechanism, at least return something from our promise */
        })
        .catch(error => {
          next({ ...rest, error, type: FAILURE });
          console.log("fail", error)

          return false;
        });
    }
   };
}