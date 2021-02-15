import AddColumn from '@/components/AddColumn';
import Columns from '@/components/Columns';
import {RootState} from '@/store';
import {columnsAccessors, columnsActions} from '@/store/columns';
import {BoardScreenNavigation} from '@/types/navigationTypes';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
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
  const columns = useSelector((state: RootState) =>
    columnsAccessors.getColumnsState(state),
  );
  const dispatch = useDispatch();

  const handleColumnCreationSubmit = (columnTitle: string) => {
    if (columnTitle) {
      dispatch(
        columnsActions.createColumn({
          columnData: {title: columnTitle, description: ''},
        }),
      );
    }
    setIsAddingColumn(false);
  };

  useEffect(() => {
    dispatch(columnsActions.getAllColumns());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isAddingColumn ? (
        <AddColumn handleSubmit={handleColumnCreationSubmit} />
      ) : null}
      <Columns
        dispatch={dispatch}
        navigation={navigation}
        isLoading={columns.isLoading}
        columns={columns.currentColumns}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Board;
