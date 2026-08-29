import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://eric-cqc.github.io/ai-product-portfolio/'),
  title: {
    default: '蔡骐充｜AI 产品经理作品集',
    template: '%s｜蔡骐充 AI 产品作品集',
  },
  description: '把模糊问题，做成可验证的 AI 产品。三个旗舰 Agent、六个精选项目，以及产品判断、架构取舍和评测闭环。',
  authors: [{ name: '蔡骐充 / Eric CQC', url: 'https://github.com/Eric-Cqc' }],
  keywords: ['AI 产品经理', 'Agent', '产品作品集', 'RAG', 'Human-in-the-loop', '模型评测'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '蔡骐充 AI 产品经理作品集',
    title: '把模糊问题，做成可验证的 AI 产品。',
    description: '三个旗舰 Agent、六个精选项目，以及产品判断、架构取舍和评测闭环。',
    images: [{ url: 'https://eric-cqc.github.io/ai-product-portfolio/og.png', width: 1200, height: 630, alt: '蔡骐充 AI 产品经理作品集' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '把模糊问题，做成可验证的 AI 产品。',
    description: '蔡骐充 / Eric CQC · AI 产品经理作品集',
    images: ['https://eric-cqc.github.io/ai-product-portfolio/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f4ed',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><head><base href="/" /></head><body>{children}</body></html>;
}
