import React from 'react';
import StringFormatter from '../helpers/string-formatter';

class SoundcloudWidget extends React.Component {
  componentDidMount() {
    /*
    let widgetIframe = React.findDOMNode(this.refs.playlist);
    let widget = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function() {
      console.log('soundcloud widget ready');
    });
    */
  }

  render() {
    let escapedPlaylistUrl = StringFormatter.escapeUri(this.props.playlist);
    let playlistWidgetUrl = `https://w.soundcloud.com/player/?url=${escapedPlaylistUrl}&auto_play=false&hide_related=true&show_user=true&show_reposts=false&visual=true&show_comments=false`;
    return (
      <div className="soundcloud-widget" >
        <iframe id="souncloud-playlist" ref="playlist" width="100%" height="500px" scrolling="no" frameBorder="no" src={playlistWidgetUrl}></iframe>
      </div>
    );
  }
}

export default SoundcloudWidget;
