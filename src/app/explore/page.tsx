"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoSearchOutline,
  IoFilterOutline,
  IoArrowDownOutline,
  IoArrowUpOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCampaigns } from "@/lib/api";
import toast from "react-hot-toast";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  raised: number;
  goal: number;
  createdAt: string;
  organizer: string;
  status: string;
  minContribution?: number;
  creatorEmail?: string;
}

export default function ExplorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"title" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    "all",
    "medical",
    "education",
    "disaster",
    "environment",
    "community",
    "technology",
    "arts",
  ];

  const statuses = ["all", "approved", "pending"];

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const queryParams: Record<string, string | number> = {
        page,
        limit: 10,
      };
      if (searchQuery) queryParams.search = searchQuery;
      if (selectedCategory !== "all") queryParams.category = selectedCategory;
      if (selectedStatus !== "all") queryParams.status = selectedStatus;
      if (sortBy) queryParams.sort = sortBy;
      if (sortOrder) queryParams.order = sortOrder;

      const queryString = new URLSearchParams(
        queryParams as Record<string, string>,
      ).toString();

      const data = await getCampaigns(queryString);
      setCampaigns(data.campaigns || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch {
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCampaigns();
    }, 500);
    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, sortOrder, page]);

  const handleSort = (field: "title" | "createdAt") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-base-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Campaigns
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              Discover meaningful campaigns and make a difference in causes you
              care about
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search, Filter, and Sort Section */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 flex flex-col">
                <label className="text-xs text-base-content/60 mb-1">
                  Search
                </label>
                <div className="relative">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 text-xl" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col">
                <label className="text-xs text-base-content/60 mb-1">
                  Category
                </label>
                <div className="relative">
                  <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 text-xl" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered pl-10 min-w-[180px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col">
                <label className="text-xs text-base-content/60 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="select select-bordered min-w-[140px]"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort Buttons */}
              <div className="flex flex-col">
                <label className="text-xs text-base-content/60 mb-1">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort("title")}
                    className={`btn btn-sm ${sortBy === "title" ? "btn-primary" : "btn-outline"}`}
                  >
                    Title
                    {sortBy === "title" &&
                      (sortOrder === "asc" ? (
                        <IoArrowUpOutline />
                      ) : (
                        <IoArrowDownOutline />
                      ))}
                  </button>
                  <button
                    onClick={() => handleSort("createdAt")}
                    className={`btn btn-sm ${sortBy === "createdAt" ? "btn-primary" : "btn-outline"}`}
                  >
                    Last Added
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? (
                        <IoArrowUpOutline />
                      ) : (
                        <IoArrowDownOutline />
                      ))}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg overflow-hidden"
                >
                  <div className="skeleton h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="skeleton h-6 w-20"></div>
                      <div className="skeleton h-5 w-24"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-3/4"></div>
                    </div>
                    <div className="skeleton h-2 w-full"></div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="skeleton h-4 w-24"></div>
                        <div className="skeleton h-4 w-16"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="skeleton h-4 w-16"></div>
                        <div className="skeleton h-4 w-20"></div>
                      </div>
                    </div>
                    <div className="skeleton h-10 w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-base-content/70">
                No campaigns found matching your criteria
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="card bg-base-100 shadow-lg hover:shadow-4xl hover:scale-102 transition-all duration-300 overflow-hidden group flex flex-col gap-4 justify-between"
                  >
                    <div className="relative h-48 overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg line-clamp-2">
                          {campaign.title}
                        </h3>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="badge badge-primary badge-sm">
                            {campaign.category?.charAt(0).toUpperCase() +
                              campaign.category?.slice(1) || "General"}
                          </span>
                          <span className="text-sm text-base-content/70">
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold">
                              ${(campaign.raised || 0).toLocaleString()}
                            </span>
                            <span className="text-base-content/70">
                              of ${(campaign.goal || 0).toLocaleString()}
                            </span>
                          </div>
                          <progress
                            className="progress progress-primary w-full"
                            value={
                              campaign.goal
                                ? (campaign.raised / campaign.goal) * 100
                                : 0
                            }
                            max="100"
                          />
                        </div>

                        <div className="bg-base-100 border-t border-base-200 flex flex-col gap-4 justify-between">
                          <p className="text-sm text-base-content/70 line-clamp-3 mb-3">
                            {campaign.description}
                          </p>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-base-content/60">
                                Min Contribution:
                              </span>
                              <span className="font-semibold text-primary">
                                $
                                {campaign.minContribution
                                  ? campaign.minContribution.toLocaleString()
                                  : "No minimum"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-base-content/60">
                                Creator:
                              </span>
                              <span className="font-medium text-base-content">
                                {campaign.organizer ||
                                  campaign.creatorEmail ||
                                  "Unknown"}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              router.push(`/campaigns/${campaign._id}`)
                            }
                            className="btn btn-primary btn-sm w-full"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <span className="btn btn-sm btn-disabled">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
