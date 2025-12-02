
export type PlatformType = 'Job Board' | 'Freelance Market' | 'Community' | 'Aggregator';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
export type SalaryTier = '$' | '$$' | '$$$'; // Entry/Low, Mid, High/Elite

export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  logoColor: string;
  platformType: PlatformType;
  industries: string[]; // e.g., 'Development', 'Design', 'Marketing'
  jobTypes: JobType[];
  salaryTier: SalaryTier;
  tags: string[]; // Specific keywords like 'Startup', 'Crypto', etc.
  popular?: boolean;
  language: 'EN' | 'CN' | 'BOTH';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Remote Work Tools
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., 'Network', 'Productivity', 'Finance'
  url: string;
  recommended?: boolean; // Highlight specifically (e.g. for the VPN)
}

// Interactive Poll
export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}
