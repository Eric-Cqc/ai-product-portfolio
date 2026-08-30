import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://eric-cqc.github.io/ai-product-portfolio/'),
  title: {
    default: '蔡骐充｜人工智能产品案例集',
    template: '%s｜蔡骐充人工智能产品案例集',
  },
  description:
    '三个从具体任务出发的人工智能产品案例，覆盖创作前期协作、医疗竞争情报和奥数训练。',
  authors: [{ name: '蔡骐充', url: 'https://github.com/Eric-Cqc' }],
  keywords: ['人工智能产品', '智能体产品', '产品案例', '人工审核', '模型评测'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '蔡骐充人工智能产品案例集',
    title: '蔡骐充｜人工智能产品案例集',
    description:
      '三个从具体任务出发的人工智能产品案例，覆盖创作前期协作、医疗竞争情报和奥数训练。',
    images: [
      {
        url: 'https://eric-cqc.github.io/ai-product-portfolio/og.png',
        width: 1200,
        height: 630,
        alt: '蔡骐充人工智能产品作品集',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '蔡骐充｜人工智能产品案例集',
    description:
      '三个从具体任务出发的人工智能产品案例，覆盖创作前期协作、医疗竞争情报和奥数训练。',
    images: ['https://eric-cqc.github.io/ai-product-portfolio/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f3f1ea',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <base href="/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
