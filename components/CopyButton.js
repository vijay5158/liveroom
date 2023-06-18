import React from 'react';
import { Pressable, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import alertFunc from './Alert';


const CopyButton = ({ text }) => {
    const handleCopyText = async () => {
      await Clipboard.setStringAsync(text);
      alertFunc('Text copied to clipboard!');
    };
  
    return (
        <Pressable className="inline" onPress={handleCopyText}>
            <Text className="text-[white] font-semibold mr-2">Copy code </Text>
        <Ionicons name="copy" size={18} color="#fff" />
        </Pressable>
    );
  };

export default CopyButton;