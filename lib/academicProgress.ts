/**
 * Dynamic academic progress calculator for B.Tech Computer Engineering.
 * Computes live completion percentage and semester based on the current date,
 * scaling automatically from July 2024 to 100% completion by April 2028 (2028-04).
 */

export interface AcademicProgress {
  pct: number;
  semester: string;
  isGraduated: boolean;
  completionDate: string;
}

export function getAcademicProgress(): AcademicProgress {
  // Start: July 1, 2024 (Semester 1 kickoff)
  const start = new Date(2024, 6, 1).getTime();
  // Target: April 30, 2028 (End of 8th Semester / Final Year)
  const end = new Date(2028, 3, 30).getTime();
  
  // Safe client/server timestamp
  const now = typeof window !== 'undefined' ? Date.now() : new Date().getTime();

  const rawPct = ((now - start) / (end - start)) * 100;
  const pct = Math.min(100, Math.max(0, Math.round(rawPct)));

  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 1-12

  let semester = '5th Semester';
  let isGraduated = false;

  if (year < 2024 || (year === 2024 && month < 7)) {
    semester = '1st Semester';
  } else if (year === 2024) {
    semester = '1st Semester';
  } else if (year === 2025 && month <= 6) {
    semester = '2nd Semester';
  } else if (year === 2025) {
    semester = '3rd Semester';
  } else if (year === 2026 && month <= 6) {
    semester = '4th Semester';
  } else if (year === 2026) {
    semester = '5th Semester';
  } else if (year === 2027 && month <= 6) {
    semester = '6th Semester';
  } else if (year === 2027) {
    semester = '7th Semester';
  } else if (year === 2028 && month <= 4) {
    semester = '8th Semester (Final)';
  } else {
    semester = 'Graduated (B.Tech CE)';
    isGraduated = true;
  }

  return {
    pct,
    semester,
    isGraduated,
    completionDate: 'April 2028',
  };
}

