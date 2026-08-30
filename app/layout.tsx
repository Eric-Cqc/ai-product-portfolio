import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://eric-cqc.github.io/ai-product-portfolio/'),
  title: {
    default: '蔡骐充｜AI 产品作品集',
    template: '%s｜蔡骐充 AI 产品作品集',
  },
  description: '九个个人项目与一个开源产品拆解：四个完整案例、三个短案例与三个项目笔记。',
  authors: [{ name: '蔡骐充', url: 'https://github.com/Eric-Cqc' }],
  keywords: ['AI 产品', 'Agent', '产品作品集', 'RAG', '人工参与', '模型评测'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '蔡骐充 AI 产品作品集',
    title: '蔡骐充｜AI 产品作品集',
    description: '九个个人项目与一个开源产品拆解，覆盖创作协同、战略情报、智能教育、商业研究、Agent 控制与模型决策。',
    images: [{ url: 'https://eric-cqc.github.io/ai-product-portfolio/og.png', width: 1200, height: 630, alt: '蔡骐充 AI 产品作品集' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '蔡骐充｜AI 产品作品集',
    description: '九个个人项目与一个开源产品拆解及其产品证据。',
    images: ['https://eric-cqc.github.io/ai-product-portfolio/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f3f1ea',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><head><base href="/" /></head><body>{children}</body></html>;
}
