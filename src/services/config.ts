// Get host details of micro service apps
export const HOST = () => {
  const ENV = process.env.ENV;
  let IDENTITY: any;
  if (ENV === 'localhost') {
    IDENTITY = process.env.AUTH_APP_NAME;
  } else {
    IDENTITY = process.env.AUTH_APP_NAME;
  }
  return {
    IDENTITY,
  };
};

// SETUP Identity Service Routes
export const IDENTITY = {
  AUTHORIZE_USER: 'private/authorize',
};
