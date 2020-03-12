import { setRequestOptions } from './api';
import createRootSchema from './create-root-schema';
import * as dateTimeType from './datetime';
import * as filterableTypes from './filterable-types';
import * as status from './status';
import * as wordpress from './wordpress';

export const createSchema = (options = {}) => {
  setRequestOptions(options);
  return createRootSchema([dateTimeType, filterableTypes, status, wordpress]);
};

export default createSchema;
