import app from './app';

app.set('port', process.env.PORT || 80);

const server = app.listen(app.get('port'), () => {
  console.log(`START RUN SERVER WITH ${app.get('port')}`);
});

export default server;

