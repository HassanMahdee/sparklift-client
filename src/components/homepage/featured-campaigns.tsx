export default function FeaturedCampaigns() {
  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Campaigns</h2>
        <p className="text-center text-base-content/70 mb-12">
          Discover impactful campaigns making a difference
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="card-body">
                <h3 className="card-title">Campaign {i}</h3>
                <p className="text-sm text-base-content/70">
                  Description for featured campaign {i}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
