// routes/profile.route.ts
import { Router } from 'express';
import ProfileController from '../controllers/profile.controller';

class ProfileRoute {
  private readonly profileController: ProfileController;
  public readonly router: Router;

  constructor() {
    this.profileController = new ProfileController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/', this.profileController.create.bind(this.profileController)); 
    this.router.put('/:id', this.profileController.update.bind(this.profileController));
    this.router.get('/:id', this.profileController.findById.bind(this.profileController));
  }
}

export default new ProfileRoute().router;