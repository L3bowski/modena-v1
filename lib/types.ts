export interface AppConfig {
    name: string;
    modenaSetupPath?: string;
    path: string;
    assetsFolder: string;
    publicDomains?: string[];
    allowNamespaceTraversal?: boolean;
    [key: string]: any;
}

export interface AppMiddleware {
    passport?: any;
    bodyParser?: any;
    session?: any;
}

export interface AppUtils {
    userManagementUtils?: any;
}

// The ModenaConfig properties use SNAKE_CASE for Docker compatibility
export interface ModenaConfig {
    APPS_FOLDER: string;
    ENABLE_CONSOLE_LOGS: any;
    LOG_FILENAME: any;
    TRACER_LEVEL: any;
    PORT: any;
    DEFAULT_APP?: string;
    SESSION_SECRET?: string;
    beforeRegisteringApps?: (server: Express.Application, tracer: any, modenaConfig: ModenaConfig, appsConfig: AppConfig[]) => void;
    afterRegisteringApps?: (server: Express.Application, tracer: any, modenaConfig: ModenaConfig, appsConfig: AppConfig[]) => void;
    [key: string]: any;
}