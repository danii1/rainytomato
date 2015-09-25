'use strict';

describe('BackgroundBox', () => {
  let React = require('react/addons');
  let TestUtils = require('react/lib/ReactTestUtils');
  let BackgroundBox = require('components/background-box');

  it('should render BackgroundBox', () => {
    var element = TestUtils.renderIntoDocument(<BackgroundBox />);
    expect(element).toBeTruthy();
  });

  it('should render BackgroundBox with default className', () => {
    var element = TestUtils.renderIntoDocument(<BackgroundBox />);
    expect(React.findDOMNode(element).className).toEqual('background-box');
  });

  it('should render BackgroundBox with custom className', () => {
    var element = TestUtils.renderIntoDocument(<BackgroundBox className={'customClass'}/>);
    expect(React.findDOMNode(element).classList).toContain('customClass');
  });

  it('should set defaultStyle', () => {
    let element = TestUtils.renderIntoDocument(<BackgroundBox />);
    expect(element.props.defaultStyle).toBeTruthy();
  });

  it('should render BackgroundBox with image as background', () => {
    let element = TestUtils.renderIntoDocument(<BackgroundBox />);
    let style = React.findDOMNode(element).getAttribute('style');
    expect(style.indexOf('background')).toBeGreaterThan(-1);
  });
});
