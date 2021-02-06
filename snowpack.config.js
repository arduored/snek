// snowpack.config.js
module.exports = {
    buildOptions: {
        minify: false,
    },
    plugins: [
        [
            "snowpack-plugin-terser",
            {
                terserOptions: {
                    compress: {
                        arguments: true,
                        passes: 2,
                        unsafe_arrows: true,
                    },
                },
            },
        ],
    ],
}
