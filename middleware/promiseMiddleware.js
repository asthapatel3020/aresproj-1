import axios from 'axios';
const API_URL = 'https://api.dev-ares.tk/';

export default function promiseMiddleware() {

  return next => action => {

    const { promise, type, ...rest } = action;
    // switch (type) {

    //   case "SIGN_IN":
    //     if(action.login=='admin'&&action.pass=='admin123') {
    //       console.log('YES', action)
    //       return (
    //         next({type:"SIGN_IN_SUCCESS1"})
    //         // next({type:"APPLY_FILTER", filters:action.filters}), 
    //         // action.filters.from=='clear'&&next({type:"CLEAR_PERIOD"})
    //         )
    //     } else {
    //       return (
    //         next({type:'SIGN_IN_FAILURE'})
    //       )
    //     }
     
    // }

    if (!promise) return next(action);
   
    const SUCCESS = type ;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    // console.log("promise", action.type)
    next({ ...rest, type: REQUEST });
     
        // console.log("PROMISE", promise)
        return promise
        .then(res => {
          console.log("res", res, res.config.url)
          
          next({ ...rest, res, type: SUCCESS })
          next({type:`${SUCCESS}_SUCCESS`})

          return res; /* simple chaining mechanism, at least return something from our promise */
        })
        .catch(error => {
          console.log("fail", error, error.data)
      
          next({ ...rest, error, type: FAILURE });

          return false;
        });
    
   };
}