import React from "react";
const pricingPlans = [
  {
    id: "chef_free", // Matches your logic
    name: "Free",
    description: "Perfect for getting started.",
    price: "$0",
    frequency: "/forever",
    features: [
      { text: "3 Credits", detail: "(Upload up to 3 recipes)", bold: true },
      { text: "Standard community support", bold: false },
      { text: "Public recipe viewing", bold: false },
    ],
    ctaText: "Current Plan",
    ctaLink: "/dashboard",
    isPopular: false,
  },
  {
    id: "chef_Pro", // 🟢 FIXED: Changed from "pro" to "chef_Pro"
    name: "chef_Pro",
    description: "For active home chefs and foodies.",
    price: "$19.00",
    frequency: "/month",
    features: [
      { text: "10 Credits", detail: "(Upload up to 10 recipes)", bold: true },
      { text: "Priority queue processing", bold: false },
      { text: "Ad-free browsing experience", bold: false },
      { text: "Advanced recipe search filters", bold: false },
    ],
    ctaText: "Upgrade to Pro",
    ctaLink: "/checkout/pro",
    isPopular: true,
  },
  {
    id: "chef_Premium", // 🟢 FIXED: Changed from "premium" to "chef_Premium"
    name: "chef_Premium",
    description: "Ultimate access for culinary experts.",
    price: "$49",
    frequency: "/month",
    features: [
      { text: "Unlimited Credits", detail: "(Post any recipe)", bold: true },
      { text: "Verified Chef Badge on profile", bold: false },
      { text: "Premium analytics & analytics insights", bold: false },
      { text: "24/7 VIP Dedicated Support", bold: false },
    ],
    ctaText: "Go Premium",
    ctaLink: "/checkout/premium",
    isPopular: false,
  },
];

const PricingCards = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 transition-colors duration-300">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Choose Your Cooking Plan
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Unlock more recipe slots and share your culinary masterpieces with the
          world.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {pricingPlans.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col h-full relative ${
                plan.isPopular
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white md:scale-105 border-2 border-emerald-400 dark:border-emerald-500 shadow-xl shadow-emerald-500/10 dark:shadow-emerald-950/30"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-yellow-400 text-zinc-900 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}

              {/* Title & Price */}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p
                  className={`mt-2 text-sm ${plan.isPopular ? "text-emerald-100" : "text-zinc-500 dark:text-zinc-400"}`}
                >
                  {plan.description}
                </p>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`ml-1 text-sm font-semibold ${plan.isPopular ? "text-emerald-100" : "text-zinc-500 dark:text-zinc-400"}`}
                  >
                    {plan.frequency}
                  </span>
                </p>
              </div>

              {/* Features List */}
              <div
                className={`border-t pt-6 mb-8 flex-grow ${plan.isPopular ? "border-emerald-400/40" : "border-zinc-100 dark:border-zinc-800"}`}
              >
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span
                        className={
                          plan.isPopular
                            ? "font-bold text-yellow-300"
                            : "text-emerald-500 font-bold"
                        }
                      >
                        ✓
                      </span>
                      <span
                        className={
                          plan.isPopular
                            ? "text-white"
                            : "text-zinc-600 dark:text-zinc-300"
                        }
                      >
                        {feature.bold ? (
                          <strong>{feature.text}</strong>
                        ) : (
                          feature.text
                        )}{" "}
                        {feature.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name='plan_id' value={plan.id} />
                <section>
                  <button
                    type="submit"
                    className={`w-full text-center rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                      plan.isPopular
                        ? "bg-white text-emerald-600 shadow-md hover:bg-zinc-50 transform active:scale-[0.99]"
                        : plan.id === "free"
                          ? "border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                          : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                    }`}
                    role="link"
                  >
                    {plan.ctaText}
                  </button>
                </section>
              </form>
              {/* <a
                href={plan.ctaLink}
           
              >
                
              </a> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCards;
