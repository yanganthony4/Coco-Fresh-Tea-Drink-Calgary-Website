/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "geolocation=(self), microphone=()" },
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                img-src 'self' data: blob: https: http:;
                font-src 'self' https://fonts.gstatic.com;
                connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://emailjs.com https://api.emailjs.com;
                frame-src https://www.google.com;
              `.replace(/\s{2,}/g, " ").trim(),
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  