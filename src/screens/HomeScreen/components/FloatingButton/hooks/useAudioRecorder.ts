import { useState } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import { usePermissions } from '@root/src/utils/hooks/usePermissions';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState<string | null>(null);
  const { requestAudioPermissions } = usePermissions();

  const startRecording = async () => {
    try {
      const hasPermissions = await requestAudioPermissions();
      if (!hasPermissions) {
        console.log('Permissions not granted');
        return;
      }

      setIsRecording(true);
      const path = 'audioRecord.m4a';
      const uri = await audioRecorderPlayer.startRecorder(path);
      setRecordingPath(uri);
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
