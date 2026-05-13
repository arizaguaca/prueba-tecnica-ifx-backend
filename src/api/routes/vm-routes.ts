import { Router } from 'express';
import { VmController } from '../controllers/vm-controller';
import { authMiddleware } from '../middlewares/auth-middleware';
import { roleMiddleware } from '../middlewares/role-middleware';

const router = Router();
const vmController = new VmController();

// Apply Auth to all VM routes
router.use(authMiddleware);

// GET is allowed for both Admin and Cliente
router.get('/', roleMiddleware(['Administrador', 'Cliente']), vmController.getAll.bind(vmController));

// POST, PUT, DELETE are restricted to Administrador
router.post('/', roleMiddleware(['Administrador']), vmController.create.bind(vmController));
router.put('/:id', roleMiddleware(['Administrador']), vmController.update.bind(vmController));
router.delete('/:id', roleMiddleware(['Administrador']), vmController.delete.bind(vmController));

export default router;
