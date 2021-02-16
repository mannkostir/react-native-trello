import {useSelector} from 'react-redux';
import {RootState} from '..';

export const useCommentsSelector = () => {
  const commentsState = useSelector((state: RootState) => state.comments);

  return {
    comments: commentsState.currentComments,
    isCommentsLoading: commentsState.isLoading,
    commentsError: commentsState.error,
  };
};
