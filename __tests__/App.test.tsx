import 'react-native';
import React from 'react';
import App from '../App';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  let tree;

    await act(async () => {
    tree = renderer.create(<App />);
  });

  expect(tree).toBeTruthy();
});
