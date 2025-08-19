import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Edit, Mail, Calendar, MapPin, Star } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground">
            Please login to view your profile.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">Verified</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8 (24 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="glass-button">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Active Ads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Sold Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Years Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-card hover-lift cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">+</div>
                <div className="text-sm font-medium">Post New Ad</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover-lift cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">12</div>
                <div className="text-sm font-medium">My Ads</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover-lift cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">5</div>
                <div className="text-sm font-medium">Favorites</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover-lift cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <div className="text-sm font-medium">Messages</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="font-medium">iPhone 13 Pro Max</p>
                    <p className="text-sm text-muted-foreground">Ad viewed 15 times today</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div className="flex-1">
                    <p className="font-medium">MacBook Air M2</p>
                    <p className="text-sm text-muted-foreground">Successfully sold</p>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <div className="flex-1">
                    <p className="font-medium">Gaming Chair</p>
                    <p className="text-sm text-muted-foreground">Price updated</p>
                  </div>
                  <span className="text-sm text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};