import { shallow } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { initialState } from '../getStore';
import { AppRoot, mapStateToProps } from '../App';

describe('Root App component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppRoot started={true} onStart={() => null} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders loading state', () => {
    const props = {
      started: false,
      onStart: jest.fn(),
    };
    const wrapper = shallow(<AppRoot {...props} />);
    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.find('.app').exists()).toBe(false);
  });

  it('renders started state', () => {
    const props = {
      started: true,
      onStart: jest.fn(),
    };
    const wrapper = shallow(<AppRoot {...props} />);
    expect(wrapper.find('.loading').exists()).toBe(false);
    expect(wrapper.find('.app').exists()).toBe(true);
  });

  it('properly binds state', () => {
    const state = {
      ...initialState,
      started: true,
    };
    const props = mapStateToProps(state);
    expect(props.started).toEqual(true);
  });
});
