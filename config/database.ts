import path from 'path';

export default ({ env }) => {
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        schema: env('DATABASE_SCHEMA', 'public'),

        ssl: env.bool('DATABASE_SSL', false)
          ? {
              rejectUnauthorized: env.bool(
                'DATABASE_SSL_REJECT_UNAUTHORIZED',
                true
              ),
            }
          : false,
      },

      pool: {
        min: env.int('DATABASE_POOL_MIN', 1),
        max: env.int('DATABASE_POOL_MAX', 5),
      },

      acquireConnectionTimeout: env.int(
        'DATABASE_CONNECTION_TIMEOUT',
        60000
      ),
    },
  };
};
