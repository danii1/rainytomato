import React from 'react';

import bg1 from 'images/background/bg1.jpg';
import bg2 from 'images/background/bg2.jpg';

class BackgroundBox extends React.Component {
  constructor(props) {
    super(props);
  }

  static getRandomImageStyle() {
    var images = [bg1, bg2];
    var randomImage = images[Math.floor(Math.random() * images.length)];
    return {
      background: 'no-repeat center/cover url(' + randomImage + ')'
    };
  }

  /*
  mountRainyDay() {
    var element = React.findDOMNode(this.refs.image);
    console.log('element:', element);

    var engine = new RainyDay({
        image: element
    });

    engine.rain([ [0, 2, 200], [3, 3, 1] ], 100);
  }
  */

  render() {
    var classes = 'background-box';
    if (this.props.className != null) {
      classes += ' ' + this.props.className;
    }

    return (
      <div className={classes} style={this.props.defaultStyle}>
        {this.props.children}
      </div>
    );
  }
}

BackgroundBox.propTypes = { className: React.PropTypes.string };
BackgroundBox.defaultProps = { defaultStyle: BackgroundBox.getRandomImageStyle() };

export default BackgroundBox;
