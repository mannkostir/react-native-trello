import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card} from './Common.types';

export type MainNavigatorParamList = {
  Board: undefined;
  List: {title: string; cards: Card[]};
  PrayerDetails: {cardInfo: Card};
  Auth: undefined;
};

export type ListNavigatorParamList = {
  cards: Card[];
  subscribed: Card[];
};

export type BoardScreenNavigation = StackNavigationProp<
  MainNavigatorParamList,
  'Board'
>;
export type ListScreenNavigation = StackNavigationProp<
  MainNavigatorParamList,
  'List'
>;

export type ListScreenRoute = RouteProp<MainNavigatorParamList, 'List'>;
export type PrayerDetailsRoute = RouteProp<
  MainNavigatorParamList,
  'PrayerDetails'
>;
