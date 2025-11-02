'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

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
  typeSubmit: (value: string) => void
  indicatorSubmit: (
    indicator: string,
    description: string,
    category: string,
  ) => void
  resourceSubmit: (formData: FormData) => void
}

interface AdminSectionProps {
  title: string
  description: string
  actionArea?: ReactNode
  children: ReactNode
}

function AdminSection({
  title,
  description,
  actionArea,
  children,
}: AdminSectionProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold">{title}</h1>
          <p className="mt-2 text-sm">{description}</p>
        </div>
        {actionArea && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">{actionArea}</div>
        )}
      </div>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DataTableProps {
  headers?: string[]
  children: ReactNode
}

function DataTable({ headers, children }: DataTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
      {headers && (
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={cn(
                  'py-3.5 text-left text-sm font-semibold',
                  index === 0 ? 'pr-3 pl-4 sm:pl-0' : 'px-3',
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="divide-y divide-gray-200 dark:divide-white/10">
        {children}
      </tbody>
    </table>
  )
}

export default function AdminInfo({
  links,
  types,
  indicators,
  categories,
  typeMappings,
  typeIndicators,
  resources,
  typeSubmit,
  indicatorSubmit,
  resourceSubmit,
}: AdminInfoProps) {
  const [newType, setNewType] = useState('')
  const [newIndicator, setNewIndicator] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [resourceModalOpen, setResourceModalOpen] = useState(false)
  const [resourceFormData, setResourceFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'General',
    state: '',
    country: 'USA',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newType.trim()) {
      typeSubmit(newType.trim())
      setNewType('')
    }
  }

  const handleIndicatorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newIndicator.trim() && selectedCategory) {
      indicatorSubmit(
        newIndicator.trim(),
        newDescription.trim(),
        selectedCategory,
      )
      setNewIndicator('')
      setNewDescription('')
      setSelectedCategory('')
    }
  }

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

  return (
    <div className="space-y-8">
      {/* Important Links */}
      <AdminSection
        title="Important Links"
        description="Important links for admin access and monitoring."
      >
        <DataTable headers={['Item', 'URL']}>
          {links.map((link) => (
            <tr key={link.label}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {link.label}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {link.href}
                </a>
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Types */}
      <AdminSection
        title="Types"
        description="Entity types available in the system. Add new types using the form."
        actionArea={
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Add a new type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
          </form>
        }
      >
        <DataTable>
          {types.map((type) => (
            <tr key={type.type}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {type.type}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Categories */}
      <AdminSection
        title="Categories"
        description="Categories used to organize and classify indicators."
      >
        <DataTable>
          {categories.map((category) => (
            <tr key={category.category}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {category.category ? category.category : 'None'}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Indicators */}
      <AdminSection
        title="Indicators"
        description="All indicators including their categories and descriptions. Add new indicators using the form."
        actionArea={
          <form
            onSubmit={handleIndicatorSubmit}
            className="flex flex-col gap-2"
          >
            <Input
              placeholder="Add a new indicator"
              value={newIndicator}
              onChange={(e) => setNewIndicator(e.target.value)}
            />
            <Textarea
              placeholder="Add description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  className="justify-between"
                >
                  {selectedCategory
                    ? categories.find(
                        (category) => category.category === selectedCategory,
                      )?.category
                    : 'Select category...'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.category}
                          value={category.category}
                          onSelect={(currentValue) => {
                            setSelectedCategory(
                              currentValue === selectedCategory
                                ? ''
                                : currentValue,
                            )
                            setCategoryOpen(false)
                          }}
                        >
                          {category.category}
                          <Check
                            className={cn(
                              'ml-auto',
                              selectedCategory === category.category
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </form>
        }
      >
        <DataTable headers={['Indicator', 'Category', 'Description']}>
          {indicators.map((indicator) => (
            <tr key={indicator.indicator}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {indicator.indicator}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                {indicator.category}
              </td>
              <td className="px-3 py-4 text-sm">
                {indicator.description || '-'}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Type Mappings */}
      <AdminSection
        title="Type Mappings"
        description="Pattern-based mappings that automatically assign types to entities."
      >
        <DataTable headers={['Type', 'Pattern']}>
          {typeMappings.map((mapping) => (
            <tr key={mapping.id}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {mapping.type}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                {mapping.pattern}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Type Indicators */}
      <AdminSection
        title="Type Indicators"
        description="Indicators linked to specific entity types."
      >
        <DataTable headers={['Type', 'Indicator']}>
          {typeIndicators.map((indicator) => (
            <tr key={indicator.id}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {indicator.type}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                {indicator.indicator}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Resources */}
      <AdminSection
        title="Resources"
        description="Helpful resources organized by category, state, and country."
        actionArea={
          <Button
            onClick={() => setResourceModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Add Resource
          </Button>
        }
      >
        <DataTable headers={['Title', 'Category', 'State', 'Country', 'URL']}>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                {resource.title}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                {resource.category}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                {resource.state}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
                {resource.country}
              </td>
              <td className="px-3 py-4 text-sm whitespace-nowrap">
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
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Add Resource
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
