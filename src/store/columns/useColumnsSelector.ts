import {useSelector} from 'react-redux';
import {RootState} from '..';

export const useColumnsSelector = () => {
  const columnsState = useSelector((state: RootState) => state.columns);

  const getColumn = (columnId: number) =>
    columnsState.currentColumns.find((column) => column.id === columnId) ||
    null;

  return {
    getColumn,
    currentColumns: columnsState.currentColumns,
    isColumnsLoading: columnsState.isLoading,
  };
};
