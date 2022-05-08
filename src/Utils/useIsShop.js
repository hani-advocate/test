import {useSelector} from 'react-redux';

export const useIsShop = () => {
  const {me} = useSelector((state) => state.User);
  return ['shopOwner', 'shopAssistant'].indexOf(me.role) > -1;
};

export const useIsShopAssistant = () => {
  const {me} = useSelector((state) => state.User);
  return ['shopAssistant'].indexOf(me.role) > -1;
};
