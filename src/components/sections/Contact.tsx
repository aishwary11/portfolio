import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { CopyField } from '@/components/sections/CopyField';
import { Section } from '@/components/ui/Section';
import { PROFILE } from '@/data/profile';

const PROFILES = [
  { label: 'LinkedIn', href: PROFILE.links.linkedin, icon: FaLinkedin },
  { label: 'GitHub', href: PROFILE.links.github, icon: FaGithub },
] as const;

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Open to Technical Lead and Architect roles"
      description="The fastest route is email. Everything below is the same detail that appears on the resume."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="stagger space-y-4">
          <div className="reveal">
            <CopyField
              label="Email"
              value={PROFILE.email}
              href={`mailto:${PROFILE.email}`}
              icon={<Mail size={17} />}
            />
          </div>
          <div className="reveal">
            <CopyField
              label="Phone"
              value={PROFILE.phone}
              href={`tel:${PROFILE.phoneHref}`}
              icon={<Phone size={17} />}
            />
          </div>
          <div className="reveal surface flex items-center gap-4 p-4">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
            >
              <MapPin size={17} />
            </span>
            <div className="min-w-0">
              <p className="eyebrow">Based in</p>
              <p className="mt-1 font-mono text-sm text-slate-800 dark:text-slate-200">
                {PROFILE.location.formatted}
              </p>
            </div>
          </div>
        </div>

        <div className="reveal surface flex flex-col p-6">
          <span className="eyebrow">Elsewhere</span>

          <ul className="mt-5 space-y-2">
            {PROFILES.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group hairline flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-400/50 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  <profile.icon aria-hidden="true" className="size-4 shrink-0 text-indigo-500" />
                  {profile.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto size-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={PROFILE.resumePath}
            download
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <Download aria-hidden="true" className="size-4" />
            Download resume
          </a>
        </div>
      </div>
    </Section>
  );
}
