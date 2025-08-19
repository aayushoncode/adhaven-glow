import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Eye, 
  Phone, 
  MessageCircle,
  Flag,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ImageCarousel } from '@/components/ImageCarousel';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const AdDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getAdById } = useApp();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const ad = id ? getAdById(id) : null;

  useEffect(() => {
    if (!ad) {
      // In real app, you might want to fetch from API here
      return;
    }
  }, [ad]);

  if (!ad) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ad Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The ad you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Browse All Ads</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: ad.title,
          text: ad.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Ad link has been copied to clipboard",
    });
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Login required",
        description: "Please login to contact the seller",
      });
      navigate('/login');
      return;
    }
    
    // In real app, this would open chat or show contact details
    toast({
      title: "Contact feature",
      description: "This would open a chat with the seller",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-navbar border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="glass-button">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="glass-button">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare} className="glass-button">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-button">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <ImageCarousel 
              images={ad.images} 
              alt={ad.title}
              className="w-full"
            />

            {/* Ad Details */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Title and Price */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-3xl font-bold">{ad.title}</h1>
                      {ad.featured && (
                        <Badge className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="text-4xl font-bold text-primary mb-4">
                      {formatPrice(ad.price)}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{ad.category}</Badge>
                    {ad.condition && (
                      <Badge variant="secondary">
                        {ad.condition === 'like-new' ? 'Like New' : 
                         ad.condition.charAt(0).toUpperCase() + ad.condition.slice(1)}
                      </Badge>
                    )}
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {ad.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{ad.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Posted on {formatDate(ad.postedDate)}</span>
                      </div>
                      {ad.views && (
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{ad.views} views</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ad.userAvatar} alt={ad.userName} />
                    <AvatarFallback>{ad.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{ad.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since 2023
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={handleContact}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Seller
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full glass-button"
                    onClick={handleContact}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Seller
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Always meet in a safe, public place
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Save to Favorites
                  </Button>
                  
                  <Button variant="outline" className="w-full glass-button justify-start" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share this Ad
                  </Button>
                  
                  <Button variant="outline" className="w-full glass-button justify-start">
                    <Flag className="h-4 w-4 mr-2" />
                    Report this Ad
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="glass-card border-warning/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-warning">Safety Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Meet in a safe, public place</li>
                  <li>• Check the item before payment</li>
                  <li>• Don't share personal information</li>
                  <li>• Trust your instincts</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};