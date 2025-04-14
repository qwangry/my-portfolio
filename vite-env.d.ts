/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_PETERCAT_TOKEN: string; // 定义你的自定义环境变量
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}