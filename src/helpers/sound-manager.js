// sounds
import dingWav from 'sounds/ding.wav';
import dingOgg from 'sounds/ding.ogg';
import dingMp3 from 'sounds/ding.mp3';

import tickWav from 'sounds/tick.wav';
import tickOgg from 'sounds/tick.ogg';
import tickMp3 from 'sounds/tick.mp3';

export default class SoundManager {
  static playStopSound() {
    const sound = new Howler.Howl({
      urls: [dingMp3, dingOgg, dingWav]
    });
    sound.play();
  }

  static playStartSound() {
    const sound = new Howler.Howl({
      urls: [tickMp3, tickOgg, tickWav]
    });
    sound.play();
  }

}
