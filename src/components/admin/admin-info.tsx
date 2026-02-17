'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Information from './information'
import TypesCategoriesIndicators from './types-categories-indicators'

interface AdminInfoProps {
  links: { label: string; href: string }[]
  types: { type: string }[]
  indicators: { indicator: string; description: string; category: string }[]
  categories: { category: string }[]
  typeMappings: { id: string; type: string; pattern: string }[]
  typeIndicators: { id: string; type: string; indicator: string }[]
  resources: {
    id: string
    title: string
    description: string
    url: string
    category: string
    state: string
    country: string
  }[]
  faqs: {
    id: string
    question: string
    answer: string
  }[]
  jobs: {
    id: string
    title: string
    description: string
    responsibilities: string[] | null
    link: string | null
  }[]
  typeSubmit: (value: string) => void
  categorySubmit: (category: string) => void
  indicatorSubmit: (
    indicator: string,
    description: string,
    category: string,
  ) => void
  resourceSubmit: (formData: FormData) => void
  faqSubmit: (question: string, answer: string) => void
  jobSubmit: (formData: FormData) => void
  typeMappingSubmit: (type: string, pattern: string) => void
  typeIndicatorSubmit: (type: string, indicator: string) => void
}

export default function AdminInfo({
  links,
  types,
  indicators,
  categories,
  typeMappings,
  typeIndicators,
  resources,
  faqs,
  jobs,
  typeSubmit,
  categorySubmit,
  indicatorSubmit,
  resourceSubmit,
  faqSubmit,
  jobSubmit,
  typeMappingSubmit,
  typeIndicatorSubmit,
}: AdminInfoProps) {
  return (
    <Tabs defaultValue="types" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="types">Types, Categories & Indicators</TabsTrigger>
        <TabsTrigger value="information">Information</TabsTrigger>
      </TabsList>
      <TabsContent value="types" className="mt-6">
        <TypesCategoriesIndicators
          types={types}
          indicators={indicators}
          categories={categories}
          typeMappings={typeMappings}
          typeIndicators={typeIndicators}
          typeSubmit={typeSubmit}
          categorySubmit={categorySubmit}
          indicatorSubmit={indicatorSubmit}
          typeMappingSubmit={typeMappingSubmit}
          typeIndicatorSubmit={typeIndicatorSubmit}
        />
      </TabsContent>
      <TabsContent value="information" className="mt-6">
        <Information
          resources={resources}
          faqs={faqs}
          jobs={jobs}
          resourceSubmit={resourceSubmit}
          faqSubmit={faqSubmit}
          jobSubmit={jobSubmit}
        />
      </TabsContent>
    </Tabs>
  )
}
