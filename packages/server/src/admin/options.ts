import { AdminJSOptions } from 'adminjs';
import * as entity from '../_db/entity/_index.js';

import componentLoader from './component-loader.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: Object.values(entity),
};

export default options;
