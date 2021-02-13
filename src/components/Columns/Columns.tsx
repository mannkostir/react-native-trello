import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import ColumnsItem from '../ColumnsItem';
import EditColumnModal from '../EditColumnModal';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RightActions} from './SwipeableActions';

interface IListsProps {
  columns: Column[];
  navigation: BoardScreenNavigation;
  dispatch: React.Dispatch<any>;
}

const Columns = ({columns, navigation, dispatch}: IListsProps) => {
  const [editingColumnId, setEditingColumnId] = useState<number | null>(null);

  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  const handleColumnTitleChange = ({
    newTitle,
    column,
  }: {
    newTitle: string;
    column: Column | null;
  }) => {
    if (newTitle && editingColumnId && column) {
      dispatch(
        columnsActions.updateColumn({
          columnData: {title: newTitle},
          listId: column.id,
          token,
        }),
      );
    }

    disableColumnEditMode();
  };

  const handleColumnDelete = (columnId: number) => {
    dispatch(columnsActions.deleteColumn({listId: columnId, token}));
  };

  const enableColumnEditMode = (columnId: number) => {
    setEditingColumnId(columnId);
  };
  const disableColumnEditMode = () => {
    setEditingColumnId(null);
  };

  return (
    <SafeAreaView style={styles.columnsSection}>
      <EditColumnModal
        column={columns.find((column) => column.id === editingColumnId) || null}
        onSubmit={handleColumnTitleChange}
        onDiscard={disableColumnEditMode}
        visible={!!editingColumnId}
        onRequestClose={disableColumnEditMode}
      />
      <FlatList
        data={columns}
        style={styles.columnsList}
        renderItem={({item}) => (
          <View style={{marginBottom: 10}}>
            <Swipeable
              overshootLeft={false}
              overshootRight={false}
              renderRightActions={() => (
                <RightActions
                  handleDeletePress={() => handleColumnDelete(item.id)}
                  handleEditPress={() => enableColumnEditMode(item.id)}
                />
              )}>
              <ColumnsItem
                navigation={navigation}
                title={item.title}
                id={item.id}
              />
            </Swipeable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  columnsSection: {
    flex: 1,
  },
  columnsList: {
    flex: 1,
    marginTop: 20,
  },
});

export default Columns;
