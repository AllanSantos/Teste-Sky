import mongoose from 'mongoose';
import app from './app';
import 'dotenv/config'

mongoose.connect(
  'mongodb+srv://teste:teste@cluster0-9jsyr.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

app.listen(process.env.PORT || 3333);
