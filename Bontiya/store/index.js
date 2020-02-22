import { createStore, applyMiddleware, compose } from 'redux';
import thunk from './middlewares/thunk';
import rootReducer from './reducers';

export default createStore(
    rootReducer,
    compose( applyMiddleware(thunk) )
)