'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
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
  typeSubmit: (value: string) => void
  indicatorSubmit: (
    indicator: string,
    description: string,
    category: string,
  ) => void
}

export default function AdminInfo({
  links,
  types,
  indicators,
  categories,
  typeMappings,
  typeIndicators,
  typeSubmit,
  indicatorSubmit,
}: AdminInfoProps) {
  const [newType, setNewType] = useState('')
  const [newIndicator, setNewIndicator] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)

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

  return (
    <div className="space-y-8">
      {/* Important Links */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Important Links</h1>
            <p className="mt-2 text-sm">
              Important links for admin access and monitoring.
            </p>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Types */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Types</h1>
            <p className="mt-2 text-sm">
              Entity types available in the system. Add new types using the
              form.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Add a new type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {types.map((type) => (
                    <tr key={type.type}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                        {type.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Categories</h1>
            <p className="mt-2 text-sm">
              Categories used to organize and classify indicators.
            </p>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {categories.map((category) => (
                    <tr key={category.category}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                        {category.category ? category.category : 'None'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Indicators</h1>
            <p className="mt-2 text-sm">
              All indicators including their categories and descriptions. Add
              new indicators using the form.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
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
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0"
                    >
                      Indicator
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Type Mappings */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Type Mappings</h1>
            <p className="mt-2 text-sm">
              Pattern-based mappings that automatically assign types to
              entities.
            </p>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Pattern
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Type Indicators */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold">Type Indicators</h1>
            <p className="mt-2 text-sm">
              Indicators linked to specific entity types.
            </p>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Indicator
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
