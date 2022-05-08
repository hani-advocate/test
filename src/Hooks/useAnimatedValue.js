import {useRef} from 'react';
import Animated from 'react-native-reanimated';

const {Value} = Animated;

export default initialValue => {
  const ref = useRef(new Value(initialValue));
  return ref.current;
};
