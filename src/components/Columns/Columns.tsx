import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {Card, Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

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
  const [newTitle, setNewTitle] = useState('');

  const handleColumnTitleChange = () => {
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            placeholder={title}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TouchableOpacity onPress={handleColumnTitleChange}>
            <Text style={{marginLeft: 15}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleColumnDelete}>
            <Text style={{marginLeft: 15}}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          style={styles.columnText}
          onPress={() =>
            navigation.navigate('Column', {
              title,
              columnId: id,
            })
          }
          onLongPress={() => setIsEditing(true)}>
          {title}
        </Text>
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
    paddingHorizontal: 20,
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
    marginTop: 20,
  },
  columnText: {
    fontWeight: '700',
  },
});

export default Columns;
