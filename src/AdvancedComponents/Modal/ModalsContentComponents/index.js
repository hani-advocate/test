import React from 'react';
import LoginBody from './login';
import FailedOrderBody from './failedOrder';
import RateOrderBody from './rateOrder';
import SuccessOrderBody from './successOrder';
import LeaveMarket from './leaveMarket';
import ConfirmationContent from './confirmationContent';
import ChangeRoleContent from './change-role-content';
import {modalModes} from '@constants/Utils';
import SuccessOrderIllustration from '@svg/illustration-successful-order.svg';
import FailedOrderIllustration from '@svg/illustration-failed-order.svg';
import RateOrderIllustration from '@svg/illustration-star.svg';
import LoginTarboushIllustration from '@svg/tarboush.svg';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  illustration: {
    marginBottom: 16,
  },
});

const ModalContent = ({mode}) => {
  switch (mode) {
    case modalModes.SUCCESS:
      return (
        <>
          <SuccessOrderIllustration style={styles.illustration} />
          <SuccessOrderBody />
        </>
      );
    case modalModes.FAILED:
      return (
        <>
          <FailedOrderIllustration style={styles.illustration} />
          <FailedOrderBody />
        </>
      );
    case modalModes.RATE:
      return (
        <>
          <RateOrderIllustration style={styles.illustration} />
          <RateOrderBody />
        </>
      );
    case modalModes.LOGIN:
      return (
        <>
          <LoginTarboushIllustration style={styles.illustration} />
          <LoginBody />
        </>
      );
    case modalModes.LEAVE_MARKET:
      return (
        <>
          <FailedOrderIllustration style={styles.illustration} />
          <LeaveMarket />
        </>
      );
    case modalModes.CONFIRMATION:
      return (
        <>
          <FailedOrderIllustration style={styles.illustration} />
          <ConfirmationContent />
        </>
      );
    case modalModes.CHANGE_ROLE:
      return (
        <>
          <RateOrderIllustration />
          <ChangeRoleContent />
        </>
      );
    default: {
      return null;
    }
  }
};

export default ModalContent;
