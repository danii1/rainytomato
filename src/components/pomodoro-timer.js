import React from 'react';

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    var progress = Math.round(new Date().getSeconds() / 60 * 100);
    this.state = {
      progress: progress
    };

    setInterval( () => {
      var second = new Date().getSeconds();
      this.setState({
        progress: Math.round(second / 60 * 100)
      });
    }, 1000);
  }

  render() {
    const strokeWidth = 4, trailColor = '#ddd', color = 'tomato',
      dashSize = 301.635,
      dashArray = `${dashSize}px, ${dashSize}px`;

    var dashOffset = dashSize - (dashSize / 100 * this.state.progress);

    return (
      <div className="pomodoro-timer" data-reactid=".0.2.0.0">
        <svg viewBox="0 0 100 100">
          <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" shapeRendering="crispEdges" stroke={trailColor} strokeWidth={strokeWidth} fillOpacity="0" style={{ shapeRendering: 'optimizeQuality' }}></path>
          <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke={color} strokeWidth={strokeWidth} fillOpacity="0" strokeDasharray={dashArray} style={{ strokeDashoffset: dashOffset, shapeRendering: 'optimizeQuality' }}></path>
        </svg>
        <p className="progressbar-text" style={{color: color}}>{this.state.progress}</p>
      </div>
    );
  }
}

export default PomodoroTimer;
