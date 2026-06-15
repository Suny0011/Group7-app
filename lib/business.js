// Central place for business details + service catalogue so everything stays
// consistent. Icon fields are keys into lib/icons.jsx (react-icons).
export const BUSINESS = {
  name: "VividForge Pty Ltd",
  abn: "12 345 678 901",
  acn: "345 678 901",
  email: "hello@vividforge.com.au",
  phone: "(02) 5550 1234",
  address: "160 Sussex St, Sydney NSW 2000",
  mapQuery: "160 Sussex St, Sydney NSW 2000",
};

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
];

// Live, working services (available in the demo today).
export const SERVICES = [
  { icon: "captions", title: "AI social captions", desc: "On-brand captions for Instagram, TikTok, LinkedIn and more — drafted in seconds." },
  { icon: "copy", title: "Ad headlines & copy", desc: "Punchy headlines and promo copy tuned to your campaign goal and tone." },
  { icon: "video", title: "Short video scripts", desc: "15-second reel and TikTok scripts with scene directions, ready to film." },
  { icon: "hashtags", title: "Hashtag sets", desc: "Relevant, reach-boosting hashtag groups generated for each post." },
  { icon: "brandkit", title: "Reusable brand kit", desc: "Save your name, tone and colours once — every draft stays consistent." },
  { icon: "calendar", title: "Content calendar", desc: "Schedule generated posts on a calendar and plan a whole month at a glance." },
];

// Bigger platform vision — shown with status tags so the roadmap is clear.
export const ROADMAP = [
  { icon: "publish", title: "Auto-publish to socials", desc: "Connect your accounts and VividForge posts each piece at the best time for you — no copy-paste.", tag: "Roadmap" },
  { icon: "image", title: "AI image generation", desc: "Generate a matching on-brand image for every post, not just the words.", tag: "Roadmap" },
  { icon: "analytics", title: "Performance analytics", desc: "See reach and engagement per post, so you learn what actually works.", tag: "Roadmap" },
  { icon: "memory", title: "Brand voice memory", desc: "The more you use it, the more every draft sounds unmistakably like you.", tag: "Roadmap" },
  { icon: "creator", title: "Human creator polish", desc: "Hand any AI draft to a vetted human creator for a final professional finish.", tag: "Growth plan" },
  { icon: "team", title: "Team & multi-brand", desc: "Invite teammates and manage several brands from one studio.", tag: "Roadmap" },
];
