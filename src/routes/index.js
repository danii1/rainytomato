'use strict';

import React from 'react';
import exampleImage from '../assets/images/yeoman.png';

export default React.createClass({
  render() {
    var jqVersion = $.fn.jquery;
    return (
      <div className='index-route'>
        <h1>Index</h1>
        <p>Welcome to React! App is bundled with jQuery v.{jqVersion} in case
        you want to use some third-party libs, if not - just throw it away.</p>
        <img src={exampleImage} />
      </div>
    );
  }
});
