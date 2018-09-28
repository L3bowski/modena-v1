import { existsSync } from 'fs';
import { join } from 'path';
import { getDirectoriesName } from './fs-utils';
import tracer from './tracer';
import { AppConfig, ModenaConfig } from './types';

export const discoverApps = (modenaConfig: ModenaConfig) => {
    if (!modenaConfig.APPS_FOLDER) {
        tracer.error('No APPS_FOLDER path was provided');
        return [];
    }

    const appsFolderName = tracer.trace(getDirectoriesName)(modenaConfig.APPS_FOLDER);
    
    tracer.info('Discovered ' + appsFolderName.length + ' folders');

    const appsConfig = appsFolderName.map((appName: string) => {
        const appPath = join(modenaConfig.APPS_FOLDER, appName);

        const appConfig: AppConfig = {
            name: appName,
            path: appPath,
            assetsFolder: 'public'
        };

        const configFilePath = join(appPath, 'modena-config.json');
        if (existsSync(configFilePath)) {
            tracer.info(appName + ': Loading additional configuration');
            const localConfig = require(configFilePath);
            Object.assign(appConfig, localConfig);
        }
        else {
            tracer.info(appName + ': No additional configuration found');
        }

        const modenaSetupPath = join(appPath, 'modena-setup.js');
        if (existsSync(modenaSetupPath)) {
            appConfig.modenaSetupPath = modenaSetupPath;
            tracer.info(appName + ': Loading endpoints configuration');
        }
        else {
            tracer.info(appName + ': No endpoints configuration found');
        }

        return appConfig;
    });

    return appsConfig;
};
