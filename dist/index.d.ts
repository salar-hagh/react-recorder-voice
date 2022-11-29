export declare const useRecorder: () => {
    audioURL: string;
    recordingStatus: string;
    startRecording: () => void;
    cancleRecording: () => void;
    saveRecordedAudio: () => void;
    audioData: any;
    timer: number;
};
