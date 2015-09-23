import React from 'react';

import bg1 from 'images/background/bg1.jpg';
import bg2 from 'images/background/bg2.jpg';
import bg3 from 'images/background/bg3.jpg';
import bg4 from 'images/background/bg4.jpg';
import bg5 from 'images/background/bg5.jpg';
import bg6 from 'images/background/bg6.jpg';
import bg7 from 'images/background/bg7.jpg';
import bg8 from 'images/background/bg8.jpg';

class BackgroundBox extends React.Component {
  constructor(props) {
    super(props);
  }

  static getRandomImageStyle() {
    var images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];
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
