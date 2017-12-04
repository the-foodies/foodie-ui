import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/containers/app';
import allReducers from '../src/reducers/allReducers';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(allReducers);

test('test', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(wrapper.find('button').length).toEqual(1);
});
