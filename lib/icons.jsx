import {
  FaBolt, FaTags, FaPalette, FaPenNib, FaBullhorn, FaVideo, FaHashtag,
  FaUserCheck, FaImage, FaCalendarAlt, FaPaperPlane, FaChartLine,
  FaUsers, FaBrain, FaMagic, FaRocket, FaCheck, FaClock,
  FaMapMarkerAlt, FaEnvelope, FaPhone,
  FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube, FaFacebookF,
} from "react-icons/fa";

export const ICONS = {
  // services / features
  captions: FaPenNib,
  copy: FaBullhorn,
  video: FaVideo,
  hashtags: FaHashtag,
  brandkit: FaPalette,
  creator: FaUserCheck,
  image: FaImage,
  calendar: FaCalendarAlt,
  publish: FaPaperPlane,
  analytics: FaChartLine,
  team: FaUsers,
  memory: FaBrain,
  magic: FaMagic,
  rocket: FaRocket,
  clock: FaClock,
  // value pillars
  speed: FaBolt,
  price: FaTags,
  brand: FaPalette,
  check: FaCheck,
  // contact
  location: FaMapMarkerAlt,
  email: FaEnvelope,
  phone: FaPhone,
  // socials
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  facebook: FaFacebookF,
};

export function Icon({ name, ...props }) {
  const C = ICONS[name];
  return C ? <C {...props} /> : null;
}
