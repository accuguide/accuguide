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
    <div>
      <h2>Important Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <h2>Types</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Add a new type"
          className="my-1 md:max-w-xs"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
      </form>
      <ul>
        {types.map((type) => (
          <li key={type.type}>
            <p>{type.type}</p>
          </li>
        ))}
      </ul>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.category}>
            <p>{category.category}</p>
          </li>
        ))}
      </ul>
      <h2>Indicators</h2>
      <form onSubmit={handleIndicatorSubmit}>
        <Input
          placeholder="Add a new indicator"
          className="my-1 md:max-w-xs"
          value={newIndicator}
          onChange={(e) => setNewIndicator(e.target.value)}
        />
        <Textarea
          placeholder="Add description (optional)"
          className="my-1 md:max-w-xs"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <div className="my-1">
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={categoryOpen}
                className="w-full justify-between md:max-w-xs"
              >
                {selectedCategory
                  ? categories.find(
                      (category) => category.category === selectedCategory,
                    )?.category
                  : 'Select category...'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 md:max-w-xs">
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
      </form>
      <ul>
        {indicators.map((indicator) => (
          <li key={indicator.indicator}>
            <p>
              {indicator.indicator} - {indicator.category}
            </p>
            {indicator.description && (
              <p className="mb-2 text-sm">{indicator.description}</p>
            )}
          </li>
        ))}
      </ul>
      <h2>Type Mappings</h2>
      <ul>
        {typeMappings.map((mapping) => (
          <li key={mapping.id}>
            <p>
              {mapping.type} - {mapping.pattern}
            </p>
          </li>
        ))}
      </ul>
      <h2>Type Indicators</h2>
      <ul>
        {typeIndicators.map((indicator) => (
          <li key={indicator.id}>
            <p>
              {indicator.type} - {indicator.indicator}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
