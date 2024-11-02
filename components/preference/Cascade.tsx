import {Alert  } from 'react-native';
//   import Share   from 'react-native-share';
import * as Linking from 'expo-linking';

 export const openWhatsApp = ({phoneNumber, message}:{phoneNumber :string, message: string}) => {
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
        Alert.alert("Error", "WhatsApp is not installed on this device.");
    });
};

 export const openWebsite = ({url}:{url : string}) => {
    Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Unable to open the website.");
    });
};

export const sendEmail = ({email, subject, body}:{email : string, subject: string, body : string}) => {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Unable to open email app.");
    });
};

export const makeCall = ({phoneNumber}:{phoneNumber :string}) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Unable to make a call.");
    });
};

// const onAdvancedShare = () => {
//   const shareOptions = {
//     title: 'Share via',
//     message: 'Check out this amazing app!',
//     url: 'https://example.com',
//     social: Share.Social.WHATSAPP, // You can target specific apps like WhatsApp, Facebook, etc.
//   };

//   Share.open(shareOptions)
//     .then((res) => console.log('Shared successfully:', res))
//     .catch((err) => console.log('Error sharing:', err));
// };
