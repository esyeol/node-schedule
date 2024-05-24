import app from './app';
import { rescheduleHandler } from './common/event/reschedule.handler';

app.set('port', process.env.PORT || 80);

const server = app.listen(app.get('port'), () => {
  console.log(`START RUN SERVER WITH ${app.get('port')}`);
  rescheduleHandler();
});

export default server;

