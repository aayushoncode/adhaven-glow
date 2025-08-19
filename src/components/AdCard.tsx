import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ad } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface AdCardProps {
  ad: Ad;
  className?: string;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, className }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={cn(
      "glass-card rounded-lg overflow-hidden hover-lift group transition-all duration-300",
      ad.featured && "ring-2 ring-primary/50",
      className
    )}>
      <Link to={`/ad/${ad.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Featured Badge */}
          {ad.featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          
          {/* Condition Badge */}
          {ad.condition && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 right-2 bg-white/90 text-foreground"
            >
              {ad.condition === 'like-new' ? 'Like New' : ad.condition.charAt(0).toUpperCase() + ad.condition.slice(1)}
            </Badge>
          )}

          {/* Favorite Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute bottom-2 right-2 glass-button hover-glow"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle favorite toggle
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {ad.title}
          </h3>

          {/* Price */}
          <div className="text-2xl font-bold text-primary mb-3">
            {formatPrice(ad.price)}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {ad.description}
          </p>

          {/* Location and Date */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{ad.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(ad.postedDate)}</span>
            </div>
          </div>

          {/* Category */}
          <Badge variant="outline" className="mb-3">
            {ad.category}
          </Badge>

          {/* User Info and Views */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ad.userAvatar} alt={ad.userName} />
                <AvatarFallback className="text-xs">
                  {ad.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{ad.userName}</span>
            </div>
            
            {ad.views && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{ad.views}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};