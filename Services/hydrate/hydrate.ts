import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "mobx-persist";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

export default hydrate;
