// export const API_HOST = 'https://api.yalla-liefer.de/api/v1';
// export const SOCKET_HOST = 'https://api.yalla-liefer.de';

// localhost
import {Platform} from 'react-native';

export const API_HOST = Platform.select({
  android: 'http://192.168.207.185:7000/api/v1',
  ios: 'http://localhost:7200/api/v1',
});
export const SOCKET_HOST = Platform.select({
  android: 'http://192.168.207.185:7000',
  ios: 'http://localhost:7200',
});
