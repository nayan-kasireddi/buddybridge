/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // add other env variables you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
