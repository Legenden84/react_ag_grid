const stateLogger = store => next => action => {
    console.log('State before action: ', store.getState());
    console.log('Action: ', action);
    next(action);
    console.log('State after action: ', store.getState());
};
  
export default stateLogger;  