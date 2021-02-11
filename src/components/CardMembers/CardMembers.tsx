import commonStyles from '@/styles/common.styles';
import {User} from '@/types/Common.types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const CardMembersItem = ({
  memberInfo,
}: {
  memberInfo: {name: string; id: number};
}) => {
  return (
    <View>
      <Text>{memberInfo.name}</Text>
    </View>
  );
};

const CardMembers = ({members}: {members: {name: string; id: number}[]}) => {
  return (
    <View>
      <Text style={commonStyles.sectionTitle}>Members</Text>
      <FlatList
        style={styles.membersList}
        data={members}
        renderItem={({item}) => <CardMembersItem memberInfo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  membersList: {
    flexDirection: 'row',
  },
});

export default CardMembers;
