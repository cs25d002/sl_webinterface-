async function main(): Promise<void> {
  try {
    const { createApp } = await import('./app');
    const { env } = await import('./config/env');

    const app = createApp();

    app.listen(env.port, '0.0.0.0', () => {
      // eslint-disable-next-line no-console
      console.log(`swasthyalekha-backend listening on http://0.0.0.0:${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('swasthyalekha-backend failed to start due to a configuration error:');
    // eslint-disable-next-line no-console
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

void main();
