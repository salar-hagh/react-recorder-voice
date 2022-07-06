import { useEffect, useState } from "react";

export const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [recordingStatus, setRecordingStatus] = useState("send");
  const [recorder, setRecorder] = useState(null);
  const [voiceData, setVoiceData] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (recordingStatus === "recording") {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (recordingStatus === "recording") {
      recorder.start();
    } else if (recordingStatus === "send") {
      recorder.stop();
    } else {
      setRecorder(null);
      setVoiceData(null);
      setAudioURL("");
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      setVoiceData(e.data);
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

  const sendRecordedVoice = () => {
    setRecordingStatus("send");
  };

  useEffect(() => {
    let counter;
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
    sendRecordedVoice,
    voiceData,
    timer: timer,
  };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
