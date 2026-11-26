/**
 * Company proof points that must be REAL before they are published.
 *
 * Every section that reads from this file renders only when it has entries, so the
 * site never shows placeholder clients, invented testimonials, or made-up people.
 * Fill these in with verified information (and get permission from any client or
 * person you name), then the matching section appears automatically.
 *
 * Headline numbers (engineers, projects, partner companies, years) are NOT kept here:
 * they come from Admin → Settings → Homepage statistics, so they can change without a deploy.
 */

/** Official company profiles. Leave a value empty to hide that icon. */
export const SOCIAL_LINKS: { linkedin: string; x: string; github: string } = {
  linkedin: "", // e.g. "https://www.linkedin.com/company/twinlink"
  x: "",
  github: "",
};

/**
 * One measurable, verifiable outcome shown under the homepage headline.
 * Example shape: "Engagements have cut time-to-hire by 40% for growth-stage clients."
 */
export const HERO_OUTCOME = "";

/**
 * Client logos for the "Trusted by" strip under the homepage hero.
 * Only list clients who have agreed to be named. `logo` is a file in /public (SVG or PNG).
 */
export const CLIENT_LOGOS: { name: string; logo: string; width?: number; height?: number }[] = [];

/** Client testimonials. Use real, attributable quotes with the person's permission. */
export const TESTIMONIALS: { quote: string; name: string; title: string; company: string }[] = [];

/**
 * Leadership / team members for "Meet the team".
 * `photo` is optional (a file in /public); without it an initials avatar is shown.
 */
export const TEAM: { name: string; title: string; linkedin?: string; photo?: string }[] = [];
