import React from 'react';
import StringFormatter from '../helpers/string-formatter';
require('../vendor/soundcloud');

class SoundcloudWidget extends React.Component {
  componentDidMount() {
    this._adjustWidgetHeight();
    window.addEventListener('resize', ::this._adjustWidgetHeight, true);
    /*
    let widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, () => {
      console.log('soundcloud widget ready');
    });
    */
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this._adjustWidgetHeight);
  }

  _adjustWidgetHeight() {
    let widgetIframe = React.findDOMNode(this.refs.iframe);
    if (widgetIframe) {
      widgetIframe.height = document.body.clientHeight - 4 * 16;
    }
  }

  render() {
    let escapedPlaylistUrl = StringFormatter.escapeUri(this.props.playlist);
    let playlistWidgetUrl = `https://w.soundcloud.com/player/?url=${escapedPlaylistUrl}&auto_play=false&hide_related=true&show_user=true&show_reposts=false&visual=false&show_comments=false`;
    return (
      <div className="soundcloud-widget" >
        <iframe id="souncloud-playlist" ref="iframe" width="100%" height="320px" scrolling="no" frameBorder="no" src={playlistWidgetUrl}></iframe>
      </div>
    );
  }
}

SoundcloudWidget.propTypes = { playlist: React.PropTypes.string.isRequired };

export default SoundcloudWidget;
