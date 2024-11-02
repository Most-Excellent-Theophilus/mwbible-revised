// import { Linking, Alert,Share  } from 'react-native';
//   import Share as  from 'react-native-share';

// export const openWhatsApp = (phone: string, text: string) => {
//   // Format phone number and message
//   const url = `whatsapp://send?text=${encodeURIComponent(text)}&phone=${phone}`;

//   // Check if WhatsApp is available on the device
//   Linking.canOpenURL(url)
//     .then((supported) => {
//       if (supported) {
//         Linking.openURL(url);
//       } else {
//         Alert.alert("WhatsApp is not installed on this device.");
//       }
//     })
//     .catch((err) => console.error("An error occurred", err));
// };

// export const onShare = async () => {
//     try {
//       const result = await Share.share({
//         message: 'Check out this amazing app! https://example.com',
//       });
  
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // Shared with specific activity type
//         } else {
//           // Shared successfully
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // Dismissed
//       }
//     } catch (error: any) {
//       console.error("Error sharing:", error.message);
//     }
//   };
  


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
