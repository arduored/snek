// snowpack.config.js
module.exports = {
    buildOptions: {
        minify: true,
        clean: true,
    },
    plugins: [
        [
            "snowpack-plugin-terser",
            {
                terserOptions: {
                    compress: {
                        module: true,
                        arguments: true,
                        passes: 2,
                        unsafe_arrows: true,
                    },
                },
            },
        ],
    ],
}
