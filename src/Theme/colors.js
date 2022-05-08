import {orderStatus} from '@constants/Utils';

export const Colors = {
  bg: '#FAFAFA',
  pr: '#F15B5D',
  grey: '#828282',
  black: '#565656',
  yellow: '#FFDB2D',
  orange: '#FAC389',
  green: '#90C99F',
  lightGrey: '#CECECE',
  white: '#FFFFFF',
  dark: '#000000',
};

export const statusColor = (status) => {
  switch (status) {
    case orderStatus.PENDING:
      return Colors.grey;
    case orderStatus.IN_PROGRESS:
      return Colors.orange;
    case orderStatus.DONE:
      return Colors.green;
    case orderStatus.CANCELED:
      return Colors.pr;
    default:
      return Colors.grey;
  }
};
