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
 