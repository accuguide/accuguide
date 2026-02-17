'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AdminSection, DataTable } from './index'

interface InformationProps {
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
  resourceSubmit: (formData: FormData) => void
  faqSubmit: (question: string, answer: string) => void
  jobSubmit: (formData: FormData) => void
}

export default function Information({
  resources,
  faqs,
  jobs,
  resourceSubmit,
  faqSubmit,
  jobSubmit,
}: InformationProps) {
  // Resource state
  const [resourceModalOpen, setResourceModalOpen] = useState(false)
  const [resourceFormData, setResourceFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'General',
    state: '',
    country: 'USA',
  })

  // FAQ state
  const [faqModalOpen, setFaqModalOpen] = useState(false)
  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: '',
  })

  // Job state
  const [jobModalOpen, setJobModalOpen] = useState(false)
  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    responsibilities: '',
    link: '',
  })

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', resourceFormData.title)
    formData.append('description', resourceFormData.description)
    formData.append('url', resourceFormData.url)
    formData.append('category', resourceFormData.category)
    formData.append('state', resourceFormData.state)
    formData.append('country', resourceFormData.country)

    resourceSubmit(formData)
    setResourceFormData({
      title: '',
      description: '',
      url: '',
      category: '',
      state: '',
      country: '',
    })
    setResourceModalOpen(false)
  }

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    faqSubmit(faqFormData.question, faqFormData.answer)
    setFaqFormData({ question: '', answer: '' })
    setFaqModalOpen(false)
  }

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', jobFormData.title)
    formData.append('description', jobFormData.description)
    formData.append(
      'responsibilities',
      JSON.stringify(
        jobFormData.responsibilities
          .split('\n')
          .filter((r) => r.trim())
          .map((r) => r.trim()),
      ),
    )
    formData.append('link', jobFormData.link)

    jobSubmit(formData)
    setJobFormData({
      title: '',
      description: '',
      responsibilities: '',
      link: '',
    })
    setJobModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Resources */}
      <AdminSection
        title="Resources"
        description="Helpful resources organized by category, state, and country."
        actionArea={
          <Button
            onClick={() => setResourceModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Resource
          </Button>
        }
      >
        <DataTable headers={['Title', 'Category', 'State', 'Country', 'URL']}>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {resource.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {resource.category}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {resource.state}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {resource.country}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {resource.url}
                </a>
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* FAQs */}
      <AdminSection
        title="FAQs"
        description="Frequently asked questions and their answers."
        actionArea={
          <Button
            onClick={() => setFaqModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add FAQ
          </Button>
        }
      >
        <DataTable headers={['Question', 'Answer']}>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td className="py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {faq.question}
              </td>
              <td className="px-3 py-4 text-sm">{faq.answer}</td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Volunteer Opportunities / Jobs */}
      <AdminSection
        title="Volunteer Opportunities"
        description="Job listings and volunteer opportunities."
        actionArea={
          <Button
            onClick={() => setJobModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Job
          </Button>
        }
      >
        <DataTable
          headers={['Title', 'Description', 'Responsibilities', 'Link']}
        >
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {job.title}
              </td>
              <td className="px-3 py-4 text-sm">{job.description}</td>
              <td className="px-3 py-4 text-sm">
                {job.responsibilities && job.responsibilities.length > 0 ? (
                  <ul className="list-inside list-disc space-y-1">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                ) : (
                  '-'
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {job.link ? (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {job.link}
                  </a>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Resource Modal */}
      <Dialog open={resourceModalOpen} onOpenChange={setResourceModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>
              Add a new resource with all required information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResourceSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={resourceFormData.title}
                  onChange={(e) =>
                    setResourceFormData({
                      ...resourceFormData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={resourceFormData.description}
                  onChange={(e) =>
                    setResourceFormData({
                      ...resourceFormData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={resourceFormData.url}
                  onChange={(e) =>
                    setResourceFormData({
                      ...resourceFormData,
                      url: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={resourceFormData.category}
                  onChange={(e) =>
                    setResourceFormData({
                      ...resourceFormData,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={resourceFormData.state}
                  onChange={(e) =>
                    setResourceFormData({
                      ...resourceFormData,
                      state: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={resourceFormData.country}
                  onChange={(e) =>
                    setResourceFormData({
                      ...resourceFormData,
                      country: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setResourceModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Resource
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQ Modal */}
      <Dialog open={faqModalOpen} onOpenChange={setFaqModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New FAQ</DialogTitle>
            <DialogDescription>
              Add a new frequently asked question and its answer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFaqSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={faqFormData.question}
                  onChange={(e) =>
                    setFaqFormData({
                      ...faqFormData,
                      question: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={faqFormData.answer}
                  onChange={(e) =>
                    setFaqFormData({
                      ...faqFormData,
                      answer: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFaqModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add FAQ
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Modal */}
      <Dialog open={jobModalOpen} onOpenChange={setJobModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Volunteer Opportunity</DialogTitle>
            <DialogDescription>
              Add a new job listing or volunteer opportunity.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJobSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job-title">Title</Label>
                <Input
                  id="job-title"
                  value={jobFormData.title}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-description">Description</Label>
                <Textarea
                  id="job-description"
                  value={jobFormData.description}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="responsibilities">
                  Responsibilities (one per line)
                </Label>
                <Textarea
                  id="responsibilities"
                  placeholder="Enter each responsibility on a new line"
                  value={jobFormData.responsibilities}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      responsibilities: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-link">Link (optional)</Label>
                <Input
                  id="job-link"
                  type="url"
                  value={jobFormData.link}
                  onChange={(e) =>
                    setJobFormData({
                      ...jobFormData,
                      link: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setJobModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Job
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
