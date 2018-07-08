// components/__tests__/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../src/App';



it('renders correctly with defaults', () => {
    const text = renderer
        .create(<App />)
        .toJSON();
    expect(text).toMatchSnapshot();
});
