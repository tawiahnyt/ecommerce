import express, {Express} from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';


const app:Express = express();

app.use('/api', rootRouter)

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
