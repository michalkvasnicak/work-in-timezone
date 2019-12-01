declare namespace NodeJS {
  export interface ProcessEnv {
    RAZZLE_ASSETS_MANIFEST: string;
    RAZZLE_PUBLIC_DIR: string;
  }
}

interface NodeModule {
  hot?: {
    accept: Function;
  };
}
