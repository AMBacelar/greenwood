import './env';
import logger from './logger';
import MongoConnection from './mongo-connection';
import app from './app';

const mongoConnection = new MongoConnection(
  process.env.MONGODB_CONNECTION_STRING
);

if (process.env.MONGODB_CONNECTION_STRING == undefined) {
  logger.log({
    level: 'error',
    message: 'MONGODB_CONNECTION_STRING not specified in environment',
  });
  process.stdin.emit('SIGINT');
  process.exit(1);
} else {
  mongoConnection.connect(() => {
    app.listen(app.get('port'), (): void => {
      logger.info(
        `*🌏Express server started at http://localhost:${app.get('port')}🌏*`
      );
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('\nGracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err,
      });
    }
    process.exit(0);
  });
});
