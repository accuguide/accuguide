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
import { AdminSection, DataTable } from './index'

interface TypesCategoriesIndicatorsProps {
  types: { type: string }[]
  indicators: { indicator: string; description: string; category: string }[]
  categories: { category: string }[]
  typeMappings: { id: string; type: string; pattern: string }[]
  typeIndicators: { id: string; type: string; indicator: string }[]
  typeSubmit: (value: string) => void
  categorySubmit: (category: string) => void
  indicatorSubmit: (
    indicator: string,
    description: string,
    category: string,
  ) => void
  typeMappingSubmit: (type: string, pattern: string) => void
  typeIndicatorSubmit: (type: string, indicator: string) => void
}

export default function TypesCategoriesIndicators({
  types,
  indicators,
  categories,
  typeMappings,
  typeIndicators,
  typeSubmit,
  categorySubmit,
  indicatorSubmit,
  typeMappingSubmit,
  typeIndicatorSubmit,
}: TypesCategoriesIndicatorsProps) {
  const [typeModalOpen, setTypeModalOpen] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [indicatorModalOpen, setIndicatorModalOpen] = useState(false)
  const [typeMappingModalOpen, setTypeMappingModalOpen] = useState(false)
  const [typeIndicatorModalOpen, setTypeIndicatorModalOpen] = useState(false)

  const [newType, setNewType] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newIndicator, setNewIndicator] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)

  // Type Mapping state
  const [typeMappingFormData, setTypeMappingFormData] = useState({
    type: '',
    pattern: '',
  })
  const [typeOpen, setTypeOpen] = useState(false)

  // Type Indicator state
  const [typeIndicatorFormData, setTypeIndicatorFormData] = useState({
    type: '',
    indicator: '',
  })
  const [typeIndicatorTypeOpen, setTypeIndicatorTypeOpen] = useState(false)
  const [typeIndicatorIndicatorOpen, setTypeIndicatorIndicatorOpen] =
    useState(false)

  const handleTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newType.trim()) {
      typeSubmit(newType.trim())
      setNewType('')
      setTypeModalOpen(false)
    }
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim()) {
      categorySubmit(newCategory.trim())
      setNewCategory('')
      setCategoryModalOpen(false)
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
      setIndicatorModalOpen(false)
    }
  }

  const handleTypeMappingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeMappingFormData.type && typeMappingFormData.pattern) {
      typeMappingSubmit(typeMappingFormData.type, typeMappingFormData.pattern)
      setTypeMappingFormData({ type: '', pattern: '' })
      setTypeMappingModalOpen(false)
    }
  }

  const handleTypeIndicatorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeIndicatorFormData.type && typeIndicatorFormData.indicator) {
      typeIndicatorSubmit(
        typeIndicatorFormData.type,
        typeIndicatorFormData.indicator,
      )
      setTypeIndicatorFormData({ type: '', indicator: '' })
      setTypeIndicatorModalOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Types */}
      <AdminSection
        title="Types"
        description="Entity types available in the system. Add new types using the dialog."
        actionArea={
          <Button
            onClick={() => setTypeModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Type
          </Button>
        }
      >
        <DataTable>
          {types.map((type) => (
            <tr key={type.type}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
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
        actionArea={
          <Button
            onClick={() => setCategoryModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Category
          </Button>
        }
      >
        <DataTable>
          {categories.map((category) => (
            <tr key={category.category}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {category.category ? category.category : 'None'}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Indicators */}
      <AdminSection
        title="Indicators"
        description="All indicators including their categories and descriptions. Add new indicators using the dialog."
        actionArea={
          <Button
            onClick={() => setIndicatorModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Indicator
          </Button>
        }
      >
        <DataTable headers={['Indicator', 'Category', 'Description']}>
          {indicators.map((indicator) => (
            <tr key={indicator.indicator}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {indicator.indicator}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
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
        actionArea={
          <Button
            onClick={() => setTypeMappingModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Type Mapping
          </Button>
        }
      >
        <DataTable headers={['Type', 'Pattern']}>
          {typeMappings.map((mapping) => (
            <tr key={mapping.id}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {mapping.type}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
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
        actionArea={
          <Button
            onClick={() => setTypeIndicatorModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Add Type Indicator
          </Button>
        }
      >
        <DataTable headers={['Type', 'Indicator']}>
          {typeIndicators.map((indicator) => (
            <tr key={indicator.id}>
              <td className="whitespace-nowrap py-4 pr-3 pl-4 font-medium text-sm sm:pl-0">
                {indicator.type}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {indicator.indicator}
              </td>
            </tr>
          ))}
        </DataTable>
      </AdminSection>

      {/* Type Modal */}
      <Dialog open={typeModalOpen} onOpenChange={setTypeModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Type</DialogTitle>
            <DialogDescription>
              Add a new entity type to the system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTypeSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  placeholder="Enter type name"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setTypeModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Type
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Modal */}
      <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Add a new category to organize and classify indicators.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCategoryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Indicator Modal */}
      <Dialog open={indicatorModalOpen} onOpenChange={setIndicatorModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Indicator</DialogTitle>
            <DialogDescription>
              Add a new indicator with its category and description.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleIndicatorSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="indicator">Indicator</Label>
                <Input
                  id="indicator"
                  placeholder="Enter indicator name"
                  value={newIndicator}
                  onChange={(e) => setNewIndicator(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description (optional)"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
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
                            (category) =>
                              category.category === selectedCategory,
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
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIndicatorModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Indicator
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Type Mapping Modal */}
      <Dialog
        open={typeMappingModalOpen}
        onOpenChange={setTypeMappingModalOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Type Mapping</DialogTitle>
            <DialogDescription>
              Add a pattern-based mapping to automatically assign types to
              entities.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTypeMappingSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="mapping-type">Type</Label>
                <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={typeOpen}
                      className="justify-between"
                    >
                      {typeMappingFormData.type
                        ? types.find((t) => t.type === typeMappingFormData.type)
                            ?.type
                        : 'Select type...'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No type found.</CommandEmpty>
                        <CommandGroup>
                          {types.map((type) => (
                            <CommandItem
                              key={type.type}
                              value={type.type}
                              onSelect={(currentValue) => {
                                setTypeMappingFormData({
                                  ...typeMappingFormData,
                                  type: currentValue,
                                })
                                setTypeOpen(false)
                              }}
                            >
                              {type.type}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  typeMappingFormData.type === type.type
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pattern">Pattern</Label>
                <Input
                  id="pattern"
                  placeholder="Enter pattern to match"
                  value={typeMappingFormData.pattern}
                  onChange={(e) =>
                    setTypeMappingFormData({
                      ...typeMappingFormData,
                      pattern: e.target.value,
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
                onClick={() => setTypeMappingModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Type Mapping
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Type Indicator Modal */}
      <Dialog
        open={typeIndicatorModalOpen}
        onOpenChange={setTypeIndicatorModalOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Type Indicator</DialogTitle>
            <DialogDescription>
              Link an indicator to a specific entity type.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTypeIndicatorSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type-indicator-type">Type</Label>
                <Popover
                  open={typeIndicatorTypeOpen}
                  onOpenChange={setTypeIndicatorTypeOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={typeIndicatorTypeOpen}
                      className="justify-between"
                    >
                      {typeIndicatorFormData.type
                        ? types.find(
                            (t) => t.type === typeIndicatorFormData.type,
                          )?.type
                        : 'Select type...'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No type found.</CommandEmpty>
                        <CommandGroup>
                          {types.map((type) => (
                            <CommandItem
                              key={type.type}
                              value={type.type}
                              onSelect={(currentValue) => {
                                setTypeIndicatorFormData({
                                  ...typeIndicatorFormData,
                                  type: currentValue,
                                })
                                setTypeIndicatorTypeOpen(false)
                              }}
                            >
                              {type.type}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  typeIndicatorFormData.type === type.type
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type-indicator-indicator">Indicator</Label>
                <Popover
                  open={typeIndicatorIndicatorOpen}
                  onOpenChange={setTypeIndicatorIndicatorOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={typeIndicatorIndicatorOpen}
                      className="justify-between"
                    >
                      {typeIndicatorFormData.indicator
                        ? indicators.find(
                            (i) =>
                              i.indicator === typeIndicatorFormData.indicator,
                          )?.indicator
                        : 'Select indicator...'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No indicator found.</CommandEmpty>
                        <CommandGroup>
                          {indicators.map((indicator) => (
                            <CommandItem
                              key={indicator.indicator}
                              value={indicator.indicator}
                              onSelect={(currentValue) => {
                                setTypeIndicatorFormData({
                                  ...typeIndicatorFormData,
                                  indicator: currentValue,
                                })
                                setTypeIndicatorIndicatorOpen(false)
                              }}
                            >
                              {indicator.indicator}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  typeIndicatorFormData.indicator ===
                                    indicator.indicator
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
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setTypeIndicatorModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Type Indicator
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
