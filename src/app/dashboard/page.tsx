"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getCampaignsByCreator,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "@/lib/api";
import toast from "react-hot-toast";

interface UserWithCustomFields {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: string;
  credits?: number;
}

interface Campaign {
  _id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  category: string;
  status: string;
  createdAt: string;
  image?: string;
  organizer?: string;
  deadline?: string;
  minContribution?: number;
  rewards?: string;
  story?: string;
  featured?: boolean;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "add-campaign" | "manage-campaigns"
  >("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    image: "",
    organizer: "",
    deadline: "",
    minContribution: "",
    rewards: "",
    story: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  const fetchCampaigns = async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true);
      const data = await getCampaignsByCreator(session.user.email);
      setCampaigns(data.campaigns || []);
    } catch {
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "manage-campaigns") {
      fetchCampaigns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;
    try {
      await createCampaign({
        title: formData.title,
        description: formData.description,
        goal: Number(formData.goal),
        category: formData.category,
        image: formData.image || undefined,
        organizer: formData.organizer || undefined,
        deadline: formData.deadline || undefined,
        minContribution: formData.minContribution
          ? Number(formData.minContribution)
          : undefined,
        rewards: formData.rewards || undefined,
        story: formData.story || undefined,
        status: "pending",
        creatorEmail: session.user.email,
      });
      toast.success("Campaign created successfully");
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        goal: "",
        category: "",
        image: "",
        organizer: "",
        deadline: "",
        minContribution: "",
        rewards: "",
        story: "",
      });
      if (activeTab === "manage-campaigns") {
        fetchCampaigns();
      }
    } catch {
      toast.error("Failed to create campaign");
    }
  };

  const handleUpdateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    try {
      await updateCampaign(editingCampaign._id, {
        title: formData.title,
        description: formData.description,
        goal: Number(formData.goal),
        category: formData.category,
        image: formData.image || undefined,
        organizer: formData.organizer || undefined,
        deadline: formData.deadline || undefined,
        minContribution: formData.minContribution
          ? Number(formData.minContribution)
          : undefined,
        rewards: formData.rewards || undefined,
        story: formData.story || undefined,
      });
      toast.success("Campaign updated successfully");
      setIsModalOpen(false);
      setEditingCampaign(null);
      setFormData({
        title: "",
        description: "",
        goal: "",
        category: "",
        image: "",
        organizer: "",
        deadline: "",
        minContribution: "",
        rewards: "",
        story: "",
      });
      fetchCampaigns();
    } catch {
      toast.error("Failed to update campaign");
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    try {
      await deleteCampaign(id);
      toast.success("Campaign deleted successfully");
      fetchCampaigns();
    } catch {
      toast.error("Failed to delete campaign");
    }
  };

  const openEditModal = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      goal: campaign.goal.toString(),
      category: campaign.category,
      image: campaign.image || "",
      organizer: campaign.organizer || "",
      deadline: campaign.deadline
        ? new Date(campaign.deadline).toISOString().split("T")[0]
        : "",
      minContribution: campaign.minContribution?.toString() || "",
      rewards: campaign.rewards || "",
      story: campaign.story || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCampaign(null);
    setFormData({
      title: "",
      description: "",
      goal: "",
      category: "",
      image: "",
      organizer: "",
      deadline: "",
      minContribution: "",
      rewards: "",
      story: "",
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1
              className="card-title text-3xl mb-6"
              style={{ color: "var(--color-primary)" }}
            >
              Creator Dashboard
            </h1>

            <div className="flex items-center gap-4 mb-6">
              {session.user?.image && (
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{session.user?.name}</h2>
                <p className="text-sm opacity-70">{session.user?.email}</p>
              </div>
            </div>

            <div className="tabs tabs-boxed mb-6">
              <button
                className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`tab ${activeTab === "add-campaign" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("add-campaign")}
              >
                Add New Campaign
              </button>
              <button
                className={`tab ${activeTab === "manage-campaigns" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("manage-campaigns")}
              >
                Manage Campaigns
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="stat bg-base-200 rounded-box">
                  <div className="stat-title">Role</div>
                  <div
                    className="stat-value text-2xl capitalize"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {(session.user as UserWithCustomFields)?.role || "N/A"}
                  </div>
                </div>

                <div className="stat bg-base-200 rounded-box">
                  <div className="stat-title">Credits</div>
                  <div
                    className="stat-value text-2xl"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {(session.user as UserWithCustomFields)?.credits || 0}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "add-campaign" && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">
                    Create New Campaign
                  </h2>
                  <form onSubmit={handleCreateCampaign} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Campaign Title</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter campaign title"
                        className="input input-bordered w-full"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        placeholder="Describe your campaign"
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Goal Amount ($)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter goal amount"
                        className="input input-bordered w-full"
                        value={formData.goal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            goal: e.target.value,
                          })
                        }
                        required
                        min="1"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Category</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="environment">Environment</option>
                        <option value="arts">Arts</option>
                        <option value="community">Community</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Image URL</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered w-full"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Organizer Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Organization or individual name"
                        className="input input-bordered w-full"
                        value={formData.organizer}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organizer: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Deadline</span>
                      </label>
                      <input
                        type="date"
                        className="input input-bordered w-full"
                        value={formData.deadline}
                        onChange={(e) =>
                          setFormData({ ...formData, deadline: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Minimum Contribution ($)
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="Minimum contribution amount"
                        className="input input-bordered w-full"
                        value={formData.minContribution}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            minContribution: e.target.value,
                          })
                        }
                        min="1"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Rewards</span>
                      </label>
                      <textarea
                        placeholder="Describe rewards for contributors"
                        className="textarea textarea-bordered w-full"
                        rows={2}
                        value={formData.rewards}
                        onChange={(e) =>
                          setFormData({ ...formData, rewards: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Story</span>
                      </label>
                      <textarea
                        placeholder="Tell the story behind your campaign"
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        value={formData.story}
                        onChange={(e) =>
                          setFormData({ ...formData, story: e.target.value })
                        }
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      Create Campaign
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "manage-campaigns" && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">My Campaigns</h2>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  ) : campaigns.length === 0 ? (
                    <div className="text-center py-8 text-base-content/70">
                      No campaigns found. Create your first campaign!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Goal</th>
                            <th>Raised</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaigns.map((campaign) => (
                            <tr key={campaign._id}>
                              <td>{campaign.title}</td>
                              <td className="capitalize">
                                {campaign.category}
                              </td>
                              <td>${campaign.goal}</td>
                              <td>${campaign.raised}</td>
                              <td>
                                <span
                                  className={`badge ${campaign.status === "active" ? "badge-success" : "badge-neutral"}`}
                                >
                                  {campaign.status}
                                </span>
                              </td>
                              <td>
                                <div className="flex gap-2">
                                  <button
                                    className="btn btn-sm btn-info"
                                    onClick={() => openEditModal(campaign)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-error"
                                    onClick={() =>
                                      handleDeleteCampaign(campaign._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {editingCampaign ? "Edit Campaign" : "Create Campaign"}
          </h3>
          <form
            onSubmit={
              editingCampaign ? handleUpdateCampaign : handleCreateCampaign
            }
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Campaign Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter campaign title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Describe your campaign"
                className="textarea textarea-bordered w-full"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Goal Amount ($)</span>
              </label>
              <input
                type="number"
                placeholder="Enter goal amount"
                className="input input-bordered w-full"
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                required
                min="1"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="environment">Environment</option>
                <option value="arts">Arts</option>
                <option value="community">Community</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Organizer Name</span>
              </label>
              <input
                type="text"
                placeholder="Organization or individual name"
                className="input input-bordered w-full"
                value={formData.organizer}
                onChange={(e) =>
                  setFormData({ ...formData, organizer: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Minimum Contribution ($)</span>
              </label>
              <input
                type="number"
                placeholder="Minimum contribution amount"
                className="input input-bordered w-full"
                value={formData.minContribution}
                onChange={(e) =>
                  setFormData({ ...formData, minContribution: e.target.value })
                }
                min="1"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Rewards</span>
              </label>
              <textarea
                placeholder="Describe rewards for contributors"
                className="textarea textarea-bordered w-full"
                rows={2}
                value={formData.rewards}
                onChange={(e) =>
                  setFormData({ ...formData, rewards: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Story</span>
              </label>
              <textarea
                placeholder="Tell the story behind your campaign"
                className="textarea textarea-bordered w-full"
                rows={4}
                value={formData.story}
                onChange={(e) =>
                  setFormData({ ...formData, story: e.target.value })
                }
              />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingCampaign ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}
