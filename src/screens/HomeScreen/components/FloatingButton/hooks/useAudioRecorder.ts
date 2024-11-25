import { useState } from 'react';

export const useAudioRecorder = () => {
  const recorder = {};
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const path = 'audioRecord.m4a';
      console.log(path);
      /**
       * TODO:
       * 1. build path
       * 2. record audio
       * 3. get uri?
       */
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    try {
      const uri = 'uri';
      setIsRecording(false);
      console.log('Audio saved at:', uri);
      return uri;
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  return { startRecording, stopRecording, isRecording, recordingPath };
};
