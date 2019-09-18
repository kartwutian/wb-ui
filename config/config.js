import baseConfig from './config.base';
import devConfig from './config.dev';
import prodConfig from './config.prod';

let config = {};

// uEnvDev
if (process.env.NODE_ENV === 'development') {
	config = Object.assign(baseConfig, devConfig);
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
	config = Object.assign(baseConfig, prodConfig);
}

export default config;
