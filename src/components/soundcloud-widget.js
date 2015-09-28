import React from 'react';

class SoundcloudWidget extends React.Component {
  componentDidMount() {
    let widgetIframe = React.findDOMNode(this.refs.playlist);
    let widget = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function() {
      // load new widget
      widget.bind(SC.Widget.Events.FINISH, function() {
        widget.load(this.props.playlist);
      });
    });
  }

  render() {
    let escapedPlaylistUrl = encodeURIComponent(this.props.playlist).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
    console.log(escapedPlaylistUrl);
    let playlistUrl = `https://w.soundcloud.com/player/?url=${escapedPlaylistUrl}&amp;auto_play=false&amp;hide_related=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`;

    return (
      <div className="soundcloud-widget" >
        <iframe id="souncloud-playlist" ref="playlist" width="100%" height="465" scrolling="no" src={playlistUrl}></iframe>
      </div>
    );
  }
}

export default SoundcloudWidget;
