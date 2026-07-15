"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoArrowBack,
  IoHeartOutline,
  IoHeart,
  IoShareSocialOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { getCampaignById } from "@/lib/api";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

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
  deadline?: string;
  rewards?: string;
  story?: string;
  featured?: boolean;
}

export default function CampaignDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        if (typeof id !== "string") {
          toast.error("Invalid campaign ID");
          return;
        }
        console.log("Fetching campaign with ID:", id);
        const data = await getCampaignById(id);
        console.log("Campaign data:", data);
        setCampaign(data.campaign || data);
      } catch (error) {
        toast.error("Failed to load campaign details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleContribution = async () => {
    if (
      !contributionAmount ||
      Number(contributionAmount) < (campaign?.minContribution || 0)
    ) {
      toast.error(`Minimum contribution is $${campaign?.minContribution || 0}`);
      return;
    }

    setIsSubmitting(true);
    // TODO: Implement actual contribution logic
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your contribution!");
      setContributionAmount("");
    }, 1500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign?.title,
          text: campaign?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const calculateProgress = () => {
    if (!campaign?.goal) return 0;
    return Math.min((campaign.raised / campaign.goal) * 100, 100);
  };

  const calculateDaysLeft = () => {
    if (!campaign?.deadline) return null;
    const deadline = new Date(campaign.deadline);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-base-300 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-base-300 rounded-xl mb-6"></div>
                <div className="h-8 w-3/4 bg-base-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-base-300 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-base-300 rounded mb-2"></div>
                <div className="h-4 w-4/6 bg-base-300 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-base-300 rounded-xl"></div>
                <div className="h-32 bg-base-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
          <button
            onClick={() => router.push("/explore")}
            className="btn btn-primary"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const daysLeft = calculateDaysLeft();

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 border-b border-base-200 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm gap-2"
          >
            <IoArrowBack className="text-xl" />
            Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className="btn btn-ghost btn-sm btn-circle"
            >
              {liked ? (
                <IoHeart className="text-xl text-error" />
              ) : (
                <IoHeartOutline className="text-xl" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <IoShareSocialOutline className="text-xl" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              {campaign.image ? (
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-4xl text-base-content/30 font-bold">
                    {campaign.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="badge badge-primary mb-3">
                    {campaign.category?.charAt(0).toUpperCase() +
                      campaign.category?.slice(1) || "General"}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {campaign.title}
                  </h1>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <span className="flex items-center gap-1">
                      <IoPersonOutline />
                      {campaign.organizer || campaign.creatorEmail || "Unknown"}
                    </span>
                    <span className="flex items-center gap-1">
                      <IoCalendarOutline />
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Campaign Story */}
            <div className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">About This Campaign</h2>
                <div className="prose prose-lg max-w-none text-base-content/80">
                  <p className="whitespace-pre-wrap">{campaign.description}</p>
                  {campaign.story && (
                    <>
                      <h3 className="text-xl font-semibold mt-6 mb-3">
                        The Story
                      </h3>
                      <p className="whitespace-pre-wrap">{campaign.story}</p>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Campaign Details */}
            <div className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6">Campaign Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IoPersonOutline className="text-xl text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Organizer</p>
                      <p className="font-semibold">
                        {campaign.organizer ||
                          campaign.creatorEmail ||
                          "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <IoCalendarOutline className="text-xl text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Created</p>
                      <p className="font-semibold">
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {campaign.deadline && (
                    <div className="flex items-start gap-3 p-4 bg-base-200 rounded-xl">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <IoTimeOutline className="text-xl text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">
                          {daysLeft !== null && daysLeft > 0
                            ? `${daysLeft} days left`
                            : "Deadline passed"}
                        </p>
                        <p className="font-semibold">
                          {new Date(campaign.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <IoCheckmarkCircleOutline className="text-xl text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Status</p>
                      <p className="font-semibold capitalize">
                        {campaign.status}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Rewards */}
            {campaign.rewards && (
              <div className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Rewards</h2>
                  <p className="whitespace-pre-wrap text-base-content/80">
                    {campaign.rewards}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Progress Card */}
            <div className="bg-base-100 rounded-2xl shadow-lg p-6 sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm text-base-content/60 mb-1">
                        Raised
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        ${(campaign.raised || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-base-content/60 mb-1">Goal</p>
                      <p className="text-xl font-semibold">
                        ${(campaign.goal || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <progress
                    className="progress progress-primary w-full h-3"
                    value={progress}
                    max="100"
                  />
                  <p className="text-sm text-base-content/60 mt-2 text-center">
                    {progress.toFixed(1)}% funded
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-base-200 rounded-xl">
                    <p className="text-2xl font-bold text-secondary">
                      {daysLeft !== null ? daysLeft : "∞"}
                    </p>
                    <p className="text-xs text-base-content/60">Days Left</p>
                  </div>
                  <div className="text-center p-3 bg-base-200 rounded-xl">
                    <p className="text-2xl font-bold text-accent">
                      {campaign.minContribution
                        ? `$${campaign.minContribution}`
                        : "$0"}
                    </p>
                    <p className="text-xs text-base-content/60">
                      Min. Contribution
                    </p>
                  </div>
                </div>

                {/* Contribution Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-base-content/60 mb-2 block">
                      Enter amount to contribute
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/60 font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="input input-bordered w-full pl-8"
                        min={campaign.minContribution || 0}
                        step="1"
                      />
                    </div>
                    {campaign.minContribution && (
                      <p className="text-xs text-base-content/60 mt-2">
                        Minimum contribution: ${campaign.minContribution}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleContribution}
                    disabled={isSubmitting || !contributionAmount}
                    className="btn btn-primary w-full btn-lg"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Contribute Now"
                    )}
                  </button>

                  <p className="text-xs text-center text-base-content/50">
                    Your contribution helps make a difference
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-base-200">
                  <div className="flex items-center justify-center gap-4 text-xs text-base-content/60">
                    <span className="flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-success" />
                      Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-success" />
                      Transparent
                    </span>
                    <span className="flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-success" />
                      Verified
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
