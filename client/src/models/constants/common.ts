import { DATE_TIME_FORMAT } from '@/models/constants/dateTime';
import dayjs from 'dayjs';

export const VERSION = '0.0.0.1';
export const STRING_EMPTY = '';
export const VALUE_ALL = -1;
export const UNLIMITED = 9999;
export const TODAY_FORMATTED = dayjs(new Date()).format(DATE_TIME_FORMAT['YYYY-MM-DD']);
export const INVALID_DATE = 'Invalid Date';

// Cookie Keys
export const TOKEN = 'jwtToken';
export const AUTH_KEY = 'authKey';
export const USERNAME = 'username';

export const DEFAULT_RATING = 3;