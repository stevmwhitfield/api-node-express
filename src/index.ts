import app from './server';
import config from './configs';

app.listen(config.port, () => {
    console.log(`[Server]: Running on http://localhost:${config.port}`);
});
