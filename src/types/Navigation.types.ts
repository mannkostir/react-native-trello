import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Prayer} from './Common.types';

export type MainNavigatorParamList = {
  Board: undefined;
  List: {title: string; cards: Prayer[]};
  PrayerDetails: {cardInfo: Prayer};
  Auth: undefined;
};

export type ListNavigatorParamList = {
  cards: Prayer[];
  subscribed: Prayer[];
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
