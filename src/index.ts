import sequelize from '../models';
import app from './app';

const PORT = process.env.PORT || 2000;

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  await sequelize.authenticate();
  console.log('Database Connected!');
});
