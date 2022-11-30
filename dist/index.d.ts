export declare const useRecorder: () => {
    audioURL: string;
    recordingStatus: string;
    startRecording: () => void;
    cancelRecording: () => void;
    saveRecordedAudio: () => void;
    audioData: any;
    timer: number;
};
