import { useEffect, useState } from "react";

export const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [recordingStatus, setRecordingStatus] = useState("save");
  const [recorder, setRecorder] = useState(null);
  const [audioData, setAudioData] = useState(null);

  useEffect(() => {
    if (recorder === null) {
      if (recordingStatus === "recording") {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (recordingStatus === "recording") {
      recorder.start();
    } else if (recordingStatus === "save") {
      recorder.stop();
    } else {
      setRecorder(null);
      setAudioData(null);
      setAudioURL("");
      recorder.stop();
    }

    const handleData = (e: any) => {
      setAudioData(e.data);
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, recordingStatus]);

  const [timer, setTimer] = useState(0);

  const startRecording = () => {
    setRecordingStatus("recording");
  };

  const cancleRecording = () => {
    setRecordingStatus("cancle");
  };

  const saveRecordedAudio = () => {
    setRecordingStatus("save");
  };

  useEffect(() => {
    let counter: any;
    if (recordingStatus === "recording") {
      setTimer(0);
      counter = setInterval(() => {
        setTimer((prevState) => prevState + 1);
      }, 1000);
    } else {
      clearInterval(counter);
      setTimer(0);
    }

    return () => {
      clearInterval(counter);
      setTimer(0);
    };
  }, [recordingStatus]);

  return {
    audioURL,
    recordingStatus,
    startRecording,
    cancleRecording,
    saveRecordedAudio,
    audioData,
    timer,
  };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
