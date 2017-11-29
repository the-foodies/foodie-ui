import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../src/components/App';
import allReducers from '../src/reducers/allReducers';

test('test', () => {
  const store = createStore(allReducers);
  const component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const comp = component.toJSON();
  expect(comp.children.includes('HELLO WORLD! ')).toEqual(true);
});
