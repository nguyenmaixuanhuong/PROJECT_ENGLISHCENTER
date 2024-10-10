import React, { useState, useRef, useEffect } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Button } from '@mui/material';
import Image from 'next/image';
import { uploadFile } from '@/context/uploadFile';
const AudioVoiceItem = ({ result }) => {

    return (
        <div>
            {result.userAnswer && <audio style={{ width: '100%' }} src={result.userAnswer} controls />}
        </div>
    );
};

export default AudioVoiceItem;
