import BoardScreenTitle from '@/components/BoardScreenTitle';
import Columns from '@/components/Columns';
import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const Board = () => {
  const navigation = useNavigation<BoardScreenNavigation>();
  const state = useSelector((state: RootState) => ({
    cards: state.cards,
    columns: state.columns,
    auth: state.auth,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      columnsActions.getAllColumns({
        token: state.auth.currentUser?.token || null,
      }),
    );
  }, []);

  return (
    <ScrollView>
      <Columns
        dispatch={dispatch}
        navigation={navigation}
        lists={state.columns.currentColumns}
      />
      <BoardScreenTitle
        dispatch={dispatch}
        token={state.auth.currentUser?.token || null}
        title="Test"
      />
    </ScrollView>
  );
};

export default Board;
