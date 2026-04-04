import { Router } from 'express';

const router = Router();    

// routing :

router.post('/auth/register', (req, res) => {
    res.json({ message: 'Desde register, lo envia res.json!...', data: req.body });
    console.log('Desde register!...');
    console.log(req.body);
})


export default router;