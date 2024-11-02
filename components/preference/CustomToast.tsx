// CustomToast.tsx
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useState } from 'react';
import {  Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

interface CustomToastProps {
    message: string;
    visible: boolean;
    onClose: () => void;
    duration?: number;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, visible, onClose, duration = 3000 }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
    useEffect(() => {
        if (visible) {
            // Show the toast
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Hide the toast after the specified duration
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    if (!visible) return null;

    return (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim , backgroundColor:themeColors.text}]}>
            <TouchableOpacity onPress={hideToast} activeOpacity={0.9}>
                <Text style={{...styles.toastText, color:themeColors.background}}>{message}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        padding: 10,
        
        borderRadius: 10,
        zIndex: 10000,
        alignItems: 'center',
    },
    toastText: {
     
        fontSize: 16,
    },
});

export default CustomToast;
