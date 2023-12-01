/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.intra.42.fr",
      "i.pravatar.cc",
      "cloudflare-ipfs.com",
    ],
    minimumCacheTTL: 60,
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  async headers() {
    return [
      {
        source: "/oauth/authorize/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

// standalone 상태로 export 하면 프로덕션 배포에 필요한 파일들만 추출해서 독립 실행 가능한 폴더 만들어준다구 해여
// 근데 원래 쓰던 게 있어서 ... 일단 주석처리하고 도커 빌드 되게 해뒀습니다

// module.exports = nextConfig;
module.exports = {
  output: "standalone",
};
