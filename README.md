## Installation

```
npm i react-recorder-voice
```

or

```
yarn add react-recorder-voice
```

## Usage

**React**

```JavaScript
import { useRecorder } from "react-recorder-voice";

function App() {
  const {
    audioURL,
    audioData,
    timer,
    recordingStatus,
    cancelRecording,
    saveRecordedAudio,
    startRecording,
  } = useRecorder();

  return (
    <div>
      <button onClick={startRecording}>Start</button>
      <button onClick={cancelRecording}>Cancel</button>
      <button onClick={saveRecordedAudio}>Stop and Save</button>
      <audio controls src={audioURL}></audio>
      <h1>{timer}</h1>
    </div>
  );
}

export default App;
```


| Options / Props   | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| audioURL          | gives you recorded audio URL you can put this URL in src of audio tag |
| audioData         | gives you recorded audio data for use or send with API or ...         |
| timer             | gives you a time for showing to user                                  |
| recordingStatus   | gives you status of recording for example => recording or cancel      |
| cancelRecording   | with this method you can cancel recording                             |
| saveRecordedAudio | with this method you can save recording                               |
| startRecording    | with this method you can start recording                              |


## Contributing

ّّIf you find a bug, just let me know or submit a pull request

Thanks.
