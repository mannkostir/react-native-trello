import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import EditColumnModal from '../EditColumnModal';
import MainText from '../MainText';

const ListItem = ({
  title,
  id,
  navigation,
  dispatch,
}: {
  title: string;
  id: number;
  navigation: BoardScreenNavigation;
  dispatch: React.Dispatch<any>;
}) => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleColumnTitleChange = (newTitle: string) => {
    if (newTitle) {
      dispatch(
        columnsActions.updateColumn({
          columnData: {title: newTitle},
          listId: id,
          token,
        }),
      );
    }
    setIsEditing(false);
  };

  const handleColumnDelete = () => {
    dispatch(columnsActions.deleteColumn({listId: id, token}));
    setIsEditing(false);
  };
  return (
    <View style={styles.column}>
      {isEditing ? (
        <EditColumnModal
          onSubmit={handleColumnTitleChange}
          onDiscard={() => setIsEditing(false)}
          columnTitle={title}
        />
      ) : (
        <>
          <MainText
            weight="Medium"
            onPress={() =>
              navigation.navigate('Column', {
                title,
                columnId: id,
              })
            }>
            {title}
          </MainText>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              top: 5,
              right: 10,
            }}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => setIsEditing(true)}>
              <Text style={{color: '#72A8BC'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#AC5253'}} onPress={handleColumnDelete}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

interface IListsProps {
  lists: Column[];
  navigation: BoardScreenNavigation;
  dispatch: React.Dispatch<any>;
}

const Columns = ({lists, navigation, dispatch}: IListsProps) => {
  return (
    <SafeAreaView style={styles.columnsSection}>
      <FlatList
        data={lists}
        style={styles.columnsList}
        renderItem={({item}) => (
          <ListItem
            dispatch={dispatch}
            navigation={navigation}
            title={item.title}
            id={item.id}
          />
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
  column: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 17,
    marginBottom: 10,
  },
  columnsList: {
    flex: 1,
    marginTop: 20,
  },
});

export default Columns;
