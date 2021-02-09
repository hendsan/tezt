import firebase from '@firebase/app';
import '@firebase/firestore';
import { FIREBASE_CONFIG } from './constants';

export default class WorldData {

  static farmRef;
  static tokenRef;

  static init() {
    firebase.initializeApp(FIREBASE_CONFIG);
    const db = firebase.firestore();
    WorldData.farmRef = db.collection('farm-stats');
    WorldData.tokenRef = db.collection('token-stats');
  }

  static async getFarmStats(startDate) {
    const snapshot = await WorldData.farmRef.where('timestamp', '>=', startDate).get();
    const data = snapshot.docs.map((doc) => doc.data());

    // const latestVal = data[data.length - 1];
    // const latestDate = dayjs(latestVal.timestamp.seconds * 1000);
    // if (latestDate.format('MM-DD-YYYY') === dayjs().format('MM-DD-YYYY')) {
    //   return data.slice(0, data.length - 1);
    // }

    return data || [];
  }

  static async getTokenStats(startDate) {
    const snapshot = await WorldData.tokenRef.where('timestamp', '>=', startDate).get();
    const data = snapshot.docs.map((doc) => doc.data());
    return data || [];
  }
}
