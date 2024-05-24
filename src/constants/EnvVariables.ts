interface EnvVariables {
    BASE_URL: string;
}

export const EnvVariables: EnvVariables = {
    BASE_URL: __ENV.BASE_URL || ' ',
};