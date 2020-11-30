import { NextApiHandler } from 'next';
import { clearGraphQLCache } from '../../api';

const clearCache: NextApiHandler = function clearCache(_req, res) {
  clearGraphQLCache();
  res.json({ success: true });
};

export default clearCache;
