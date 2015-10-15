import React from 'react';
import routeTransitionActions from '../helpers/route-decorators';

@routeTransitionActions
class AboutRoute extends React.Component {
  render() {
    return (
      <div className='about-route'>
        <div className='about-box centered-box'>
          <h5>Design and development:</h5>
          <h4>Daniil Pokrovsky</h4>
        </div>
      </div>
    );
  }
}

export default AboutRoute;
