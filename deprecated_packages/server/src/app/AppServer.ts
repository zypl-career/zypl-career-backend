import * as dotenv from 'dotenv';
dotenv.config({});
import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import multer from 'fastify-multer';
import { AppConfig } from './AppConfig.js';
import { getConnection } from '../utils/connection.js';
import { getUsersResolver } from '../resolver/sign-up/get-users.resolver.js';
import { signUpResolver } from '../resolver/sign-up/sign-up.resolver.js';
import { deleteUserResolver } from '../resolver/sign-up/delete-user.resolver.js';
import { updateUserResolver } from '../resolver/sign-up/update-user.resolver.js';
import { signInRefreshTokenResolver } from '../resolver/sign-in/sign-in-refresh-token.resolver.js';
import { signInResolver } from '../resolver/sign-in/sign-in.resolver.js';
import { verifyEmail } from '../resolver/verify-email/verify-email.resolver.js';
import { hasUserResolver } from '../resolver/sign-up/has-user.resolver.js';
import { restorePassword } from '../resolver/restore-password/restore-password.resolver.js';
import { checkCodeResolver } from '../resolver/verify-email/check-code.resolver.js';
import { getMmtResolver } from '../resolver/mmt/get-mmt.resolver.js';
import { resultModalResolver } from '../resolver/result-modal/result-modal.resolver.js';
import { getResultModalsResolver } from '../resolver/result-modal/get-result-modals.resolver.js';
import { getSpecialtyResolver } from '../resolver/mmt/get-specialty.resolver.js';

const server = fastify();

server.register(fastifyCors, {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

server.register(multer.contentParser);

await getConnection();

server.get('/api/user/get', getUsersResolver);
server.post('/api/user/register', signUpResolver);
server.post('/api/user/delete', deleteUserResolver);
server.put('/api/user/update/:email', updateUserResolver);
server.post('/api/user/login', signInResolver);
server.post('/api/user /has', hasUserResolver);
server.post('/api/user/auth/refresh-token', signInRefreshTokenResolver);
server.post('/api/user/restore', restorePassword);
server.post('/api/verify/email', verifyEmail);
server.post('/api/user/check-code', checkCodeResolver);
server.get('/api/mmt/get', getMmtResolver);
server.post('/api/model/result', resultModalResolver);
server.get('/api/get/model/results', getResultModalsResolver);
server.get('/api/get/specialty', getSpecialtyResolver);

server.listen({ host: '0.0.0.0', port: parseInt(AppConfig.port) }, async () => {
  try {
    console.log(`Server started at ${AppConfig.domain}`);
  } catch (e) {
    console.error(e);
  }
});
// const modelResults = [
//   0.16244679843018997, 0.3483607299783784, 0.14179696093098604,
//   0.08439969767908463, 0.2629958129813609,
// ];
