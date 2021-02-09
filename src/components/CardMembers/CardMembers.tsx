import {User} from '@/types/Common.types';
import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const CardMembersItem = ({memberInfo}: {memberInfo: User}) => {
  return (
    <View>
      <Text>{memberInfo.name}</Text>
    </View>
  );
};

const CardMembers = ({members}: {members: User[]}) => {
  return (
    <View>
      <Text>Members</Text>
      <FlatList
        data={members}
        renderItem={({item}) => <CardMembersItem memberInfo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CardMembers;
