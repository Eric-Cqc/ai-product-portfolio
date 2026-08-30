import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortfolioProjectPage } from '@/components/portfolio-v2';
import { getProjectV2, projectsV2 } from '@/lib/v2-portfolio';

export function generateStaticParams() {
  return projectsV2.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectV2(slug);

  if (!project) {
    return { title: '项目未找到' };
  }

  return {
    title: project.title,
    description: `${project.statement} ${project.problem}`,
    openGraph: {
      title: `${project.title}｜AI 产品作品集`,
      description: project.statement,
      images: [],
    },
    twitter: {
      title: `${project.title}｜AI 产品作品集`,
      description: project.statement,
      images: [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectV2(slug);

  if (!project) {
    notFound();
  }

  return <PortfolioProjectPage project={project} />;
}
