import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, TrendingDown, Users, MessageSquare } from "lucide-react";

const ReviewsAndSocial: React.FC = () => {
  // Mock data for reviews
  const reviewsData = [
    {
      platform: "TripAdvisor",
      rating: 4.3,
      totalReviews: 284,
      recentChange: "+12",
      trend: "up",
      color: "bg-green-500"
    },
    {
      platform: "Google Maps",
      rating: 4.1,
      totalReviews: 562,
      recentChange: "+8",
      trend: "up", 
      color: "bg-blue-500"
    },
    {
      platform: "Yelp",
      rating: 3.9,
      totalReviews: 156,
      recentChange: "-3",
      trend: "down",
      color: "bg-red-500"
    }
  ];

  // Mock data for social media
  const socialData = [
    {
      platform: "Instagram",
      followers: "12.3K",
      engagement: "4.2%",
      posts: 42,
      trend: "up",
      change: "+2.1%"
    },
    {
      platform: "Facebook", 
      followers: "8.7K",
      engagement: "3.8%",
      posts: 18,
      trend: "up",
      change: "+1.4%"
    },
    {
      platform: "Twitter",
      followers: "3.2K", 
      engagement: "2.1%",
      posts: 24,
      trend: "down",
      change: "-0.3%"
    }
  ];

  return (
    <section aria-label="Reviews and Social Media Overview" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviewsData.map((review) => (
            <Card key={review.platform}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  {review.platform}
                  <Badge variant={review.trend === "up" ? "default" : "destructive"}>
                    {review.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {review.recentChange}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.totalReviews} total reviews
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Social Media Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialData.map((social) => (
            <Card key={social.platform}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  {social.platform}
                  <Badge variant={social.trend === "up" ? "default" : "destructive"}>
                    {social.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {social.change}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{social.followers}</span>
                    <span className="text-sm text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{social.engagement}</span>
                    <span className="text-sm text-muted-foreground">engagement</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {social.posts} posts this month
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsAndSocial;