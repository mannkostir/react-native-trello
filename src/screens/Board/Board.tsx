import AddColumn from '@/components/AddColumn';
import Columns from '@/components/Columns';
import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const Board = ({
  isAddingColumn,
  setIsAddingColumn,
}: {
  isAddingColumn: boolean;
  setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigation = useNavigation<BoardScreenNavigation>();
  const state = useSelector((state: RootState) => ({
    cards: state.cards,
    columns: state.columns,
    token: state.auth.currentUser?.token || null,
  }));
  const dispatch = useDispatch();

  const handleColumnCreationSubmit = (columnTitle: string) => {
    if (columnTitle) {
      dispatch(
        columnsActions.createColumn({
          columnData: {title: columnTitle, description: ''},
          token: state.token,
        }),
      );
    }
    setIsAddingColumn(false);
  };

  useEffect(() => {
    dispatch(
      columnsActions.getAllColumns({
        token: state.token,
      }),
    );
  }, []);

  return (
    <SafeAreaView>
      {isAddingColumn ? (
        <AddColumn handleSubmit={handleColumnCreationSubmit} />
      ) : null}
      <Columns
        dispatch={dispatch}
        navigation={navigation}
        lists={state.columns.currentColumns}
      />
    </SafeAreaView>
  );
};

export default Board;
