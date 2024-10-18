/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {expect, it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {TodoAppScreen} from '../src/screens';

it('renders correctly', () => {
  const tree = renderer.create(<App />);
});
