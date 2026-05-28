// ─────────────────────────────────────────────────────────────────────────────
// useKycData.js
// Fetches real KYC data from GET /api/admin/kyc/all-submissions
// Maps backend Kyc model fields → portal display format
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { getAllSubmissions, getDashboardStats } from "./adminApi";

// Backend status → Portal display label
const STATUS_MAP = {
  under_review:       "In Review",
  approved:           "Approved",
  rejected:           "Failed",
  documents_uploaded: "Pending",
  not_started:        "Pending",
};

// Backend documentType → portal documents object
function buildDocuments(kyc) {
  const base = "http://localhost:3001";
  return {
    aadhaar: {
      submitted: !!kyc.aadharFrontUrl,
      url:       kyc.aadharFrontUrl ? `${base}/${kyc.aadharFrontUrl}` : null,
      number:    "XXXX XXXX XXXX",
      name:      kyc.userId?.name || "—",
      dob:       "—",
      address:   "—",
    },
    pan: {
      submitted: !!kyc.panCardUrl,
      url:       kyc.panCardUrl ? `${base}/${kyc.panCardUrl}` : null,
      number:    "—",
      name:      kyc.userId?.name || "—",
      dob:       "—",
    },
    passport: {
      submitted: !!kyc.passportUrl,
      url:       kyc.passportUrl ? `${base}/${kyc.passportUrl}` : null,
      number:    "—",
      name:      kyc.userId?.name || "—",
      expiry:    "—",
      country:   "India",
    },
    selfie: {
      submitted: !!kyc.selfieUrl,
      url:       kyc.selfieUrl ? `${base}/${kyc.selfieUrl}` : null,
    },
  };
}

// Pick a consistent avatar color based on name
const COLORS = ["#6C63FF","#FF6584","#43E97B","#FA8231","#E74C3C","#3498DB","#9B59B6","#1ABC9C","#F39C12","#E67E22","#8E44AD","#16A085"];
function colorFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

// Map one backend KYC record → portal format
export function mapKycRecord(kyc) {
  const user   = kyc.userId || {};
  const name   = user.name  || "Unknown User";
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return {
    // Portal fields
    _id:             kyc._id,
    id:              kyc._id,          // used as kycId for API calls
    name,
    initials,
    color:           colorFor(name),
    email:           user.email  || "—",
    phone:           user.mobile || "—",
    dob:             "—",
    address:         "—",
    submitted:       kyc.createdAt
                       ? new Date(kyc.createdAt).toLocaleString("en-IN", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })
                       : "—",
    status:          STATUS_MAP[kyc.status] || "Pending",
    backendStatus:   kyc.status,       // keep raw status for API calls
    rejectionReason: kyc.rejectionReason || "",
    documentType:    kyc.documentType  || "—",
    reviewedBy:      kyc.reviewedBy?.name || "—",
    reviewedAt:      kyc.reviewedAt
                       ? new Date(kyc.reviewedAt).toLocaleString("en-IN")
                       : "—",
    submissionCount: kyc.submissionCount || 1,
    documents:       buildDocuments(kyc),

    // Raw URLs for document viewer
    aadharFrontUrl:  kyc.aadharFrontUrl || null,
    panCardUrl:      kyc.panCardUrl     || null,
    passportUrl:     kyc.passportUrl    || null,
    selfieUrl:       kyc.selfieUrl      || null,
  };
}

export function useKycData() {
  const [data,      setData]      = useState([]);
  const [stats,     setStats]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchAll = useCallback(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getAllSubmissions({ page: 1, limit: 100 }),
      getDashboardStats(),
    ])
      .then(([subRes, statsRes]) => {
        // kycs array from getAllSubmissions response
        const raw = subRes.data?.kycs || subRes.data?.data || [];
        setData(Array.isArray(raw) ? raw.map(mapKycRecord) : []);

        // stats from getDashboardStats response: { stats: { totalSubmissions, underReview, approved, rejected, ... } }
        setStats(statsRes.data?.stats || statsRes.data || null);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message || "Failed to load KYC data";
        setError(msg);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { data, setData, stats, loading, error, refetch: fetchAll };
}
