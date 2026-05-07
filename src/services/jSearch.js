import axios from "axios";
import { categorizeJobs, normalizeJobs } from "../utils/cleanJobs";

const apiKey = import.meta.env.VITE_JSEARCH_API_KEY;

const BASE_QUERY =
  "frontend developer OR backend developer OR full stack developer OR ui ux designer OR software engineer";

const CACHE_TTL_MS = 1000 * 60 * 10;

let cachedResult = null;
let cachedAt = 0;
let inFlightPromise = null;

function buildRequestOptions() {
  return {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search-v2",
    params: {
      query: BASE_QUERY,
      num_pages: "2",
      date_posted: "all",
    },
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };
}

function extractRawJobs(responseData) {
  if (!responseData) return [];

  if (Array.isArray(responseData.data)) {
    return responseData.data;
  }

  if (responseData.data && Array.isArray(responseData.data.jobs)) {
    return responseData.data.jobs;
  }

  return [];
}

export async function getJobsData(forceRefresh = false) {
  if (!apiKey) {
    console.error("Missing VITE_JSEARCH_API_KEY in environment");
    return {
      jobs: [],
      groupedJobs: categorizeJobs([]),
      source: "missing-key",
      fetchedAt: null,
    };
  }

  const cacheIsFresh = Date.now() - cachedAt < CACHE_TTL_MS;
  if (!forceRefresh && cachedResult && cacheIsFresh) {
    return cachedResult;
  }

  if (!forceRefresh && inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    try {
      const response = await axios.request(buildRequestOptions());
      const rawJobs = extractRawJobs(response.data);
      const jobs = normalizeJobs(rawJobs);
      const groupedJobs = categorizeJobs(jobs);

      cachedResult = {
        jobs,
        groupedJobs,
        source: "api",
        fetchedAt: new Date().toISOString(),
      };
      cachedAt = Date.now();

      return cachedResult;
    } catch (error) {
      console.error("JSearch request failed:", error);
      return {
        jobs: [],
        groupedJobs: categorizeJobs([]),
        source: "error",
        fetchedAt: null,
      };
    } finally {
      inFlightPromise = null;
    }
  })();

  return inFlightPromise;
}

export function clearJobsCache() {
  cachedResult = null;
  cachedAt = 0;
  inFlightPromise = null;
}