import {trackPromise} from 'react-promise-tracker';
import api from '@api/Offers.api';

export * from './auth.actions';
export * from './user.actions';
export * from './market.actions';
export * from './orders.actions';
export * from './offers.actions';

export const doUpload = (file) => trackPromise(api.doUpload(file));
