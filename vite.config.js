import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://54.243.116.117:4000",
        // target: "http://54.243.116.117:6133",
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Assuming theport is being passed as a custom header
            const userPort = req.headers["x-user-port"] || 4000; // Default to port 3000 if not provided
            console.log("userPort",userPort)
            proxy.options.target = `http://54.243.116.117:${userPort}`; // Dynamically change target port
          });
        },
        // rewrite: (path) => {
        //   console.log("path",path);  // Log the path if needed
        //   return path.replace(/^\/api/, "");  // Make sure to return the value
        // },
      },
    },
  },
});

// import { createProxyMiddleware } from 'http-proxy-middleware';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // default target
//         changeOrigin: true,
//         configure: (proxy, options) => {
//           proxy.on('proxyReq', (proxyReq, req, res) => {
//             // Assuming the port is being passed as a custom header
//             const userPort = req.headers['x-user-port'] || 3000; // Default to port 3000 if not provided
//             proxy.options.target = http://localhost:${userPort}; // Dynamically change target port
//           });
//         },
//       },
//     },
//   },
// });

// const { createProxyMiddleware } = require('http-proxy-middleware');

// // Define a router function that changes the target dynamically
// const dynamicRouter = (req) => {
//   const userPort = req.headers['x-user-port'];  // You could pass the port via headers
//   const targetUrl = http://localhost:${userPort};
//   return targetUrl;  // dynamically changing the port in the target URL
// };

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:3000', // default target
//       changeOrigin: true,
//       router: dynamicRouter,  // use dynamic router
//     })
//   );
// };
