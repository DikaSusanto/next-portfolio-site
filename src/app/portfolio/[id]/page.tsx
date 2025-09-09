import { notFound } from 'next/navigation'
import { projects } from '../../../data/projects'
import ProjectDetailPage from '../../../components/ProjectDetailPage'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: {
    id: string
  }
}

// Get site URL from env or fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Generate metadata for each project page
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return {
      title: 'Project Not Found',
      metadataBase: new URL(siteUrl),
    }
  }

  return {
    title: `${project.title} - Dika Susanto Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    metadataBase: new URL(siteUrl),
  }
}

// Generate static params for all projects (for static generation)
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectDetailPage project={project} />
    </>
  )
}