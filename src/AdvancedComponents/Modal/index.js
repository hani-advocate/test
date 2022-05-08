import React, {createContext, Fragment, useEffect, useReducer} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ModalContent from './ModalsContentComponents';
import ModalFooter from './modalFooter';
import {modalActionTypes, modalModes} from '@constants/Utils';
import modalReducer from './reducer';
import Toast from './toast';
import X from '@svg/x-red.svg';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 24,
  },
  cancel: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export const ModalContext = createContext({
  state: {
    visible: false,
  },
  dispatch: () => {},
});

const initialState = {
  visible: false,
  mode: modalModes.LOGIN,
  message: 'Thanks for rating this shop',
  onConfirm: () => {},
  onCancel: () => {},
  onRate: () => {},
  onDismiss: () => {},
};

const loginDefaults = {
  visible: true,
  mode: modalModes.LOGIN,
  message: '',
};

const isToast = (state) => state.mode === modalModes.MESSAGE;

const ModalHeader = ({onDismiss}) => (
  <TouchableOpacity
    hitSlop={{top: 12, left: 12, right: 12, bottom: 12}}
    onPress={onDismiss}
    style={styles.cancel}>
    <X />
  </TouchableOpacity>
);

export const YallaModal = ({children}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const backdropOpacity = isToast(state) ? 0 : 0.5;
  const props = {
    swipeDirection: ['right', 'left'],
    backdropOpacity,
    swipeThreshold: 100,
    animationOut: isToast(state) ? 'slideOutRight' : 'slideOutDown',
    animationIn: isToast(state) ? 'slideInRight' : 'slideInUp',
    onSwipeComplete: () => dispatch({type: modalActionTypes.HIDE}),
  };

  useEffect(() => {
    if (state.visible && isToast(state)) {
      setTimeout(() => {
        dispatch({
          type: modalActionTypes.HIDE,
        });
      }, 3000);
    }
  }, [state, state.visible]);

  const onDismiss = () => {
    if (!isToast(state)) {
      dispatch({type: modalActionTypes.HIDE});
    }
    if (state.onDismiss) {
      state.onDismiss();
    }
  };

  return (
    <Fragment>
      <Modal isVisible={state.visible} onBackdropPress={onDismiss} {...props}>
        {isToast(state) ? (
          <Toast toast={state} />
        ) : (
          <View style={styles.container}>
            <ModalHeader onDismiss={onDismiss} />
            <ModalContent mode={state.mode} />
            <ModalFooter state={state} hide={onDismiss} />
          </View>
        )}
      </Modal>
      <ModalContext.Provider value={[state, dispatch]}>
        {children}
      </ModalContext.Provider>
    </Fragment>
  );
};
