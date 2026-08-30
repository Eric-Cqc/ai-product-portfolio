import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortfolioProjectPageV3 } from '@/components/portfolio-v3';
import { getProjectV3, projectsV3 } from '@/lib/v3-portfolio';

export function generateStaticParams() {
  return projectsV3.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectV3(slug);

  if (!project) {
    return { title: '项目未找到' };
  }

  return {
    title: project.title,
    description: `${project.summary.from} ${project.summary.to}`,
    openGraph: {
      title: `${project.title}｜人工智能产品案例`,
      description: project.summary.promise,
      images: [],
    },
    twitter: {
      title: `${project.title}｜人工智能产品案例`,
      description: project.summary.promise,
      images: [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectV3(slug);

  if (!project) {
    notFound();
  }

  return <PortfolioProjectPageV3 project={project} />;
}
