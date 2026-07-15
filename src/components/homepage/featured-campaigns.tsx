"use client";

import { useEffect, useState } from "react";
import { getFeaturedCampaigns } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  raised: number;
  goal: number;
  organizer: string;
}

export default function FeaturedCampaigns() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedCampaigns();
        setCampaigns(data.campaigns || []);
      } catch (error) {
        console.error("Failed to fetch featured campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Campaigns
        </h2>
        <p className="text-center text-base-content/70 mb-12">
          Discover impactful campaigns making a difference
        </p>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-base-content/70">
            No featured campaigns at the moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => router.push(`/campaigns/${campaign._id}`)}
              >
                <figure className="relative h-48">
                  {campaign.image ? (
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-base-300 flex items-center justify-center">
                      <span className="text-base-content/50">No Image</span>
                    </div>
                  )}
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{campaign.title}</h3>
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {campaign.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="badge badge-primary badge-sm">
                      {campaign.category?.charAt(0).toUpperCase() +
                        campaign.category?.slice(1) || "General"}
                    </span>
                    <span className="text-sm font-semibold">
                      ${campaign.raised?.toLocaleString() || 0} / $
                      {campaign.goal?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
