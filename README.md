## Installation

```
npm i react-recorder-voice --save
```

## Usage
**React**	
```JavaScript
import { useRecorder } from "react-recorder-voice";

function App() {
  const {
    audioURL,
    audioData, // you can use this for send audio to server
    timer,
    recordingStatus,
    cancleRecording,
    saveRecordedAudio,
    startRecording,
  } = useRecorder();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "50px",
        flexDirection: "column",
      }}
    >
      <div>
        <button onClick={startRecording}>Start</button>
        <button onClick={cancleRecording}>Cancle</button>
        <button onClick={saveRecordedAudio}>Stop and Save</button>
      </div>
      <div>
        <audio controls src={audioURL}></audio>
      </div>
      <h1>{timer}</h1>
    </div>
  );
}

export default App;
```

## Example
In this example, you can send the audio to server as a formData.
```JavaScript
import { useEffect } from "react";
import { useRecorder } from "react-recorder-voice";

function App() {
  const {
    audioURL,
    audioData, // you can use this for send audio to server
    timer,
    recordingStatus,
    cancleRecording,
    saveRecordedAudio,
    startRecording,
  } = useRecorder();

  useEffect(() => {
    if (recordingStatus === "save") {
      const formData = new FormData();
      formData.append("file", audioData);
      // Just here send **formData** to any API you want
    }
  }, [audioData]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "50px",
        flexDirection: "column",
      }}
    >
      <div>
        <button onClick={startRecording}>Start</button>
        <button onClick={cancleRecording}>Cancle</button>
        <button onClick={saveRecordedAudio}>Stop and Save</button>
      </div>
      <div>
        <audio controls src={audioURL}></audio>
      </div>
      <h1>{timer}</h1>
    </div>
  );
}

export default App;

```
