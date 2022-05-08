import {useSelector} from 'react-redux';

const useCollapsibleStack = () => {
  const collapsible = useSelector(state => state.Animation.collapsible);

  return (
    collapsible || {
      onScroll: null,
      onScrollWithListener: e => null,
    }
  );
};

export {useCollapsibleStack, useCollapsibleStack as default};
