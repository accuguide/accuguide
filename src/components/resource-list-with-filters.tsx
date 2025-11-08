'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import ResourceCard from '@/components/resource-card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Resource } from '@/lib/db/schema'

interface ResourceListWithFiltersProps {
  resources: Resource[]
  states: string[]
  countries: string[]
  categories: string[]
}

export default function ResourceListWithFilters({
  resources,
  states,
  countries,
  categories,
}: ResourceListWithFiltersProps) {
  const [filteredResources, setFilteredResources] =
    useState<Resource[]>(resources)
  const [selectedState, setSelectedState] = useState<string>('All')
  const [selectedCountry, setSelectedCountry] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    let filtered = resources

    if (selectedState !== 'All') {
      filtered = filtered.filter((r) => r.state === selectedState)
    }

    if (selectedCountry !== 'All') {
      filtered = filtered.filter((r) => r.country === selectedCountry)
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((r) => r.category === selectedCategory)
    }

    setFilteredResources(filtered)
  }, [selectedState, selectedCountry, selectedCategory, resources])

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        {/* State Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] justify-between">
              State: {selectedState}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedState('All')}>
              All
            </DropdownMenuItem>
            {states.map((state) => (
              <DropdownMenuItem
                key={state}
                onClick={() => setSelectedState(state)}
              >
                {state}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Country Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] justify-between">
              Country: {selectedCountry}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCountry('All')}>
              All
            </DropdownMenuItem>
            {countries.map((country) => (
              <DropdownMenuItem
                key={country}
                onClick={() => setSelectedCountry(country)}
              >
                {country}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] justify-between">
              Category: {selectedCategory}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory('All')}>
              All
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredResources.map((resource) => (
        <ResourceCard
          key={resource.id}
          title={resource.title}
          description={resource.description}
          link={resource.url}
          state={resource.state}
          country={resource.country}
          category={resource.category}
          updatedAt={resource.updatedAt.toDateString()}
        />
      ))}
    </div>
  )
}
