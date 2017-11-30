import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/containers/app';
import allReducers from '../src/reducers/allReducers';

configure({ adapter: new Adapter() });

const store = createStore(allReducers);

test('test', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(wrapper.find('button').length).toEqual(2);
});
