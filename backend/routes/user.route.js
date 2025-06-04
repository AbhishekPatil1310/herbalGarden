import { Router } from 'express';
import {
  login,
  refreshTheToken,
  register,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { trackPlantVisit,handleHighScore } from '../controllers/user.controller.js';

const appRouter = Router();

appRouter.post('/register', register);
appRouter.post('/login', login);
appRouter.post('/refresh-token', refreshTheToken);

appRouter.get('/me', verifyJWT);
// appRouter.post('/track-visit', trackPlantVisit); // it will take (user_id and plant_id) and add plant_id in user schema as visited or else you can just provide the plant_id i will take out the user from request automatically

appRouter.post('/track-visit', verifyJWT, trackPlantVisit);

appRouter
  .route('/highscore')
  .get(verifyJWT, handleHighScore)
  .post(verifyJWT, handleHighScore);


export default appRouter;
