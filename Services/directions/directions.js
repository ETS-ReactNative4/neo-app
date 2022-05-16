import {Linking} from 'react-native';
import {logError} from '../errorLogger/errorLogger';

// const directions = ({ latitude, longitude }) => {
//   const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

//   Linking.canOpenURL(mapUrl)
//     .then(supported => {
//       if (!supported) {
//         alert("Unable to open maps!");
//         logError("dialer url failed", {
//           eventType: "Device cannot open maps!"
//         });
//       } else {
//         return Linking.openURL(mapUrl);
//       }
//     })
//     .catch(err => {
//       alert("No maps found!");
//       logError(err, {
//         eventType: "Device cannot open maps!"
//       });
//     });
// };

const directions = (number, field, country_code) => {
  let mapUrl = '';
  if (field === 'product') {
    mapUrl = `https://staging.wwmib.com/customize/region/view/${number}`;
  } else {
    mapUrl = `https://wa.me/${country_code}${number}`;
  }

  Linking.canOpenURL(mapUrl)
    .then(supported => {
      console.log(supported);
      if (supported) {
        alert('Unable to open maps!');
        logError('dialer url failed', {
          eventType: 'Device cannot open maps!',
        });
      } else {
        return Linking.openURL(mapUrl);
      }
    })
    .catch(err => {
      console.log(err);
      alert('No maps found!');
      logError(err, {
        eventType: 'Device cannot open maps!',
      });
    });
};

export default directions;
