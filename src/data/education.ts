import type { Qualification } from '@/types/resume';

/** Academic history, newest first, exactly as listed on the resume. */
export const QUALIFICATIONS: readonly Qualification[] = [
  {
    degree: 'B.E in Computer Engineering',
    institution: 'University of Mumbai',
    location: 'Mumbai, India',
    period: '08/2014 — 06/2017',
    startedOn: '2014-08',
    endedOn: '2017-06',
  },
  {
    degree: 'Diploma in Computer Technology',
    institution: 'MSBTE',
    location: 'Mumbai, India',
    period: '07/2010 — 05/2014',
    startedOn: '2010-07',
    endedOn: '2014-05',
  },
];
