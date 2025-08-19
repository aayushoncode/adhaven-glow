import React, { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdCard } from '@/components/AdCard';
import { Filters } from '@/components/Filters';
import { LoadingGrid } from '@/components/LoadingCard';
import { useApp } from '@/contexts/AppContext';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'featured';

export const Home = () => {
  const { filteredAds, loading } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const sortedAds = useMemo(() => {
    if (!filteredAds) return [];
    
    const sorted = [...filteredAds];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
      
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      
      case 'featured':
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        });
      
      default:
        return sorted;
    }
  }, [filteredAds, sortBy]);

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'newest': return 'Newest First';
      case 'oldest': return 'Oldest First';
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'featured': return 'Featured First';
      default: return 'Newest First';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="hidden lg:block w-80">
              <div className="glass-card p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <LoadingGrid />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <Filters />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="glass-card p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                  All Ads ({sortedAds.length})
                </h1>
                
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <div className="lg:hidden">
                    <Filters />
                  </div>

                  {/* Sort Options */}
                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-48 glass-button">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="featured">Featured First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="hidden md:flex border border-border rounded-lg p-1 glass-button">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            {sortedAds.length === 0 ? (
              <div className="glass-card p-12 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">No ads found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline">Clear All Filters</Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}

            {/* Load More (for future pagination) */}
            {sortedAds.length >= 20 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="glass-button">
                  Load More Ads
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};