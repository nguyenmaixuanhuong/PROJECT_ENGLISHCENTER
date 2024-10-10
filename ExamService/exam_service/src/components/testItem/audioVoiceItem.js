import React, { useState, useRef, useEffect } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { Button } from '@mui/material';
import Image from 'next/image';
import { uploadFile } from '@/context/uploadFile';
const AudioVoiceItem = ({ handleChangeAnswer, answer }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };
        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audio = await uploadFile(audioBlob);
            handleChangeAnswer(audio.url, null)
            setAudioURL(audio.url);
            audioChunksRef.current = [];
        }
    };
    useEffect(() => {
        if (answer) {
            const answerSaved = JSON.parse(answer);
            setAudioURL(answerSaved.answer)
        }
    }, [answer])

    return (
        <div>
            <Button
                variant='outlined'
                sx={{ my: 2, p: 2 }}
                fullWidth onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? <>
                    <Image style={{ width: "20%", }} src={'/images/image/sound-wave.gif'} width={0} height={30}></Image>
                    <Image style={{ width: "20%", mr: '-20px' }} src={'/images/image/sound-wave.gif'} width={0} height={30}></Image>
                    <Image style={{ width: "20%", mr: '-20px' }} src={'/images/image/sound-wave.gif'} width={0} height={30}></Image> </>
                    : <> <KeyboardVoiceIcon />  ghi âm câu trả lời</>}

            </Button>
            {audioURL && <audio style={{ width: '100%' }} src={audioURL} controls />}
        </div>
    );
};

export default AudioVoiceItem;
