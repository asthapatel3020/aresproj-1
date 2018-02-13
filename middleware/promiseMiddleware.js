
export default function promiseMiddleware() {

  return next => action => {
    const { promise, type, ...rest } = action;

    switch (type) {
      case "APPLY_FILTER":
        return (
          next({type:"ADD_FILTER_FULFILLED"}), 
          next({type:"APPLY_FILTER", filters:action.filters}), 
          action.filters.from=='clear'&&next({type:"CLEAR_PERIOD"})
          )
    }

    if (!promise) return next(action);
   
    const SUCCESS = type ;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    // console.log("promise", action.type)
    next({ ...rest, type: REQUEST });
    switch (type) {

      default: 
        // console.log("PROMISE", promise)
        return promise
        .then(res => {
          console.log("res", res, res.config.url)
          
          next({ ...rest, res, type: SUCCESS }),
          next({type:"_SUCCESS"});
          return res; /* simple chaining mechanism, at least return something from our promise */
        })
        .catch(error => {
          console.log("fail", error)

          next({ ...rest, error, type: FAILURE });

          return false;
        });
    }
   };
}