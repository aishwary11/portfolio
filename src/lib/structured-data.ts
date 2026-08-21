import { ACHIEVEMENTS } from '@/data/achievements';
import { QUALIFICATIONS } from '@/data/education';
import { ROLES } from '@/data/experience';
import { CAREER_START, PROFILE, SITE_URL } from '@/data/profile';
import { SKILL_CATEGORIES } from '@/data/skills';
import { computeTenure } from '@/lib/tenure';

/** A JSON-LD document, kept loose because schema.org shapes are open-ended. */
type JsonLd = Record<string, unknown>;

/** `YYYY-MM` is valid ISO 8601 and is what schema.org date fields accept. */
function organizationRef(name: string, location: string): JsonLd {
  return {
    '@type': 'Organization',
    name,
    address: { '@type': 'PostalAddress', addressLocality: location },
  };
}

/**
 * `Person` structured data, so search engines and AI crawlers can resolve the
 * resume into an entity rather than guessing from prose.
 */
export function buildPersonSchema(now: Date = new Date()): JsonLd {
  const tenure = computeTenure(CAREER_START, now);
  const skills = SKILL_CATEGORIES.flatMap((category) => category.items.map((item) => item.name));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    description: PROFILE.summary,
    disambiguatingDescription: PROFILE.headline,
    url: SITE_URL,
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PROFILE.location.city,
      addressRegion: PROFILE.location.region,
      postalCode: PROFILE.location.postalCode,
      addressCountry: 'IN',
    },
    sameAs: [PROFILE.links.linkedin, PROFILE.links.github],
    // De-duplicated: several skills legitimately appear in more than one category.
    knowsAbout: [...new Set(skills)],
    hasOccupation: ROLES.map((role) => ({
      '@type': 'Occupation',
      name: role.title,
      occupationLocation: { '@type': 'City', name: role.location },
      skills: role.stack.join(', '),
      description: role.highlights[0],
    })),
    worksFor: ROLES.map((role) => organizationRef(role.company, role.location)),
    alumniOf: QUALIFICATIONS.map((qualification) => ({
      '@type': 'EducationalOrganization',
      name: qualification.institution,
      address: {
        '@type': 'PostalAddress',
        addressLocality: qualification.location,
      },
    })),
    award: ACHIEVEMENTS.map((achievement) => achievement.description),
    seeks: {
      '@type': 'Demand',
      name: PROFILE.availability,
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Years of experience',
      value: tenure.years,
    },
  };
}

/** `WebSite` schema, giving the domain a stable identity linked to the person. */
export function buildWebSiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${PROFILE.name} — ${PROFILE.title}`,
    description: PROFILE.summary,
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}
