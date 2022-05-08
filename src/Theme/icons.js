import {isRTL} from '@root/i18n';
import RightRedBackArrow from '@svg/arrow-left-red.svg';
import LeftRedBackArrow from '@svg/arrow-right-red.svg';
import RightWhiteBackArrow from '@svg/arrow-right.svg';
import LeftWhiteBackArrow from '@svg/arrow-left.svg';
import Currency from '@svg/dollar-sign.svg';
import RightSend from '@svg/send-right.svg';
import LeftSend from '@svg/send.svg';

console.log({icons: isRTL});

export const ICONS = {
  menuRedArrow: isRTL ? RightRedBackArrow : LeftRedBackArrow,
  redBackArrow: isRTL ? LeftRedBackArrow : RightRedBackArrow,
  whiteBackArrow: isRTL ? RightWhiteBackArrow : LeftWhiteBackArrow,
  currency: Currency,
  send: isRTL ? RightSend : LeftSend,
};
