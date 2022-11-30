"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecorder = void 0;
const react_1 = require("react");
const useRecorder = () => {
    const [audioURL, setAudioURL] = (0, react_1.useState)("");
    const [recordingStatus, setRecordingStatus] = (0, react_1.useState)("save");
    const [recorder, setRecorder] = (0, react_1.useState)(null);
    const [audioData, setAudioData] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
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
        }
        else if (recordingStatus === "save") {
            recorder.stop();
        }
        else {
            setRecorder(null);
            setAudioData(null);
            setAudioURL("");
            recorder.stop();
        }
        // Obtain the audio when ready.
        const handleData = (e) => {
            setAudioData(e.data);
            setAudioURL(URL.createObjectURL(e.data));
        };
        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);
    }, [recorder, recordingStatus]);
    const [timer, setTimer] = (0, react_1.useState)(0);
    const startRecording = () => {
        setRecordingStatus("recording");
    };
    const cancelRecording = () => {
        setRecordingStatus("cancel");
    };
    const saveRecordedAudio = () => {
        setRecordingStatus("save");
    };
    (0, react_1.useEffect)(() => {
        let counter;
        if (recordingStatus === "recording") {
            setTimer(0);
            counter = setInterval(() => {
                setTimer((prevState) => prevState + 1);
            }, 1000);
        }
        else {
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
        cancelRecording,
        saveRecordedAudio,
        audioData,
        timer,
    };
};
exports.useRecorder = useRecorder;
function requestRecorder() {
    return __awaiter(this, void 0, void 0, function* () {
        const stream = yield navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream);
    });
}
//# sourceMappingURL=index.js.map