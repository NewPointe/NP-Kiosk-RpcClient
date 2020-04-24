import path from 'path';

const srcRoot = path.resolve(__dirname, 'src');
const outRoot = path.resolve(__dirname, 'dist');

export = {
    mode: "production" as const,
    context: srcRoot,
    entry: './checkin-rpc.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: './checkin-rpc.js',
        path: outRoot,
    },
};
