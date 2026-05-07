const knownSkills = [
	"React",
	"TypeScript",
	"JavaScript",
	"Node.js",
	"Express",
	"Python",
	"Java",
	"Go",
	"C#",
	"SQL",
	"PostgreSQL",
	"MongoDB",
	"Docker",
	"Kubernetes",
	"AWS",
	"REST",
	"GraphQL",
	"HTML",
	"CSS",
	"Tailwind",
	"Figma",
];

const nonProgrammingKeywords = [
	"sales",
	"support",
	"bpo",
	"call center",
	"customer success",
	"account manager",
	"hr",
	"recruiter",
	"finance",
	"marketing",
	"content writer",
	"operations",
	"business analyst",
];

const frontendKeywords = [
	"frontend",
	"front-end",
	"react",
	"vue",
	"angular",
	"ui engineer",
	"web developer",
];

const backendKeywords = [
	"backend",
	"back-end",
	"api",
	"server",
	"microservice",
	"node.js",
	"java developer",
	"python developer",
];

const fullstackKeywords = [
	"full stack",
	"fullstack",
	"full-stack",
	"mern",
	"mean",
];

const uiUxKeywords = [
	"ui/ux",
	"ui ux",
	"ux",
	"product designer",
	"interaction designer",
	"visual designer",
];

function includesAny(text, keywords) {
	return keywords.some((keyword) => text.includes(keyword));
}

function extractSkills(description = "") {
	const normalizedDescription = description.toLowerCase();
	return knownSkills.filter((skill) =>
		normalizedDescription.includes(skill.toLowerCase())
	);
}

function getMatchScore(job) {
	const text = `${job.job_title || ""} ${job.job_description || ""}`.toLowerCase();
	let score = 68;

	if (includesAny(text, ["senior", "lead", "principal"])) {
		score += 8;
	}
	if (includesAny(text, ["react", "node", "typescript", "python", "java", "aws"])) {
		score += 10;
	}
	if (job.job_is_remote) {
		score += 6;
	}

	return Math.min(score, 98);
}

function isProgrammingTechJob(job) {
	const text = `${job.job_title || ""} ${job.job_description || ""}`.toLowerCase();

	if (includesAny(text, nonProgrammingKeywords)) {
		return false;
	}

	return includesAny(text, [
		"developer",
		"engineer",
		"software",
		"frontend",
		"backend",
		"full stack",
		"fullstack",
		"ui",
		"ux",
		"web",
		"react",
		"node",
		"python",
		"java",
	]);
}

function inferCategory(job) {
	const text = `${job.job_title || ""} ${job.job_description || ""}`.toLowerCase();

	if (includesAny(text, fullstackKeywords)) return "Fullstack";
	if (includesAny(text, frontendKeywords)) return "Frontend";
	if (includesAny(text, backendKeywords)) return "Backend";
	if (includesAny(text, uiUxKeywords)) return "UI/UX";
	return "Other Tech";
}

function formatSalary(job) {
	if (job.job_salary_string) return job.job_salary_string;

	const min = job.job_min_salary;
	const max = job.job_max_salary;
	const period = job.job_salary_period || "year";

	if (min || max) {
		return `${min || "NA"} - ${max || "NA"} / ${period}`;
	}
	return "Not disclosed";
}

export function normalizeJobs(jobs = []) {
	if (!Array.isArray(jobs)) {
		return [];
	}

	return jobs
		.filter(Boolean)
		.filter(isProgrammingTechJob)
		.map((job, index) => ({
			id: job.job_id || `${job.job_title || "job"}-${index}`,
			title: job.job_title || "Software Engineer",
			company: job.employer_name || "Unknown Company",
			location: job.job_location || "Remote",
			salary: formatSalary(job),
			type: job.job_employment_type || "Full-time",
			remote: Boolean(job.job_is_remote),
			posted: job.job_posted_at_datetime_utc || job.job_posted_at || "",
			skills: extractSkills(job.job_description || ""),
			description: job.job_description || "No description provided",
			applyLink: job.job_apply_link || "#",
			logo: job.employer_logo || "",
			growth: "+10%",
			match: getMatchScore(job),
			category: inferCategory(job),
		}));
}

export function categorizeJobs(normalizedJobs = []) {
	const grouped = {
		All: normalizedJobs,
		Frontend: [],
		Backend: [],
		Fullstack: [],
		"UI/UX": [],
		"Other Tech": [],
	};

	normalizedJobs.forEach((job) => {
		const category = grouped[job.category] ? job.category : "Other Tech";
		grouped[category].push(job);
	});

	return grouped;
}

export default normalizeJobs;