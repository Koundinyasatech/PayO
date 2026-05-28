import api from "./Axios";

// ─────────────────────────────────────────────────────────────────
// ALL REAL ENDPOINTS mapped from backend routes
// Base: http://localhost:3001
// ─────────────────────────────────────────────────────────────────

// ── USER AUTH  (/api/auth/...) ────────────────────────────────────
export const sendOtp          = (mobile)           => api.post("/api/auth/send-otp", { mobile });
export const verifyOtp        = (mobile, otp)      => api.post("/api/auth/verify-otp", { mobile, otp });
export const resendOtp        = (mobile)           => api.post("/api/auth/resend-otp", { mobile });
export const registerUser     = (data)             => api.post("/api/auth/register", data);
export const loginUser        = (mobile, password) => api.post("/api/auth/login", { mobile, password });
export const resetPassword    = (data)             => api.post("/api/auth/reset-password", data);

// ── ADMIN AUTH  (/api/admin/auth/...) ────────────────────────────
// Login → POST /api/admin/auth/login
export const adminLogin           = (email, password) => api.post("/api/admin/auth/login", { email, password });
export const adminChangePassword  = (data)            => api.patch("/api/admin/auth/change-password", data);
export const getAllAdmins          = ()                => api.get("/api/admin/auth/all-admins");
export const createSubAdmin       = (data)            => api.post("/api/admin/auth/create-admin", data);
export const revokeAdminAccess    = (userId)          => api.patch(`/api/admin/auth/revoke-admin/${userId}`);

// ── ADMIN KYC  (/api/admin/kyc/...) ──────────────────────────────

// Dashboard stats → GET /api/admin/kyc/dashboard-stats
export const getDashboardStats    = ()          => api.get("/api/admin/kyc/dashboard-stats");

// All KYC submissions → GET /api/admin/kyc/all-submissions?status=&page=&limit=
export const getAllSubmissions     = (params)   => api.get("/api/admin/kyc/all-submissions", { params });

// Pending reviews queue → GET /api/admin/kyc/pending-reviews
export const getPendingReviews    = ()          => api.get("/api/admin/kyc/pending-reviews");

// Search user KYC → GET /api/admin/kyc/search-user?query=
export const searchUserKyc        = (query)     => api.get("/api/admin/kyc/search-user", { params: { query } });

// Single KYC details → GET /api/admin/kyc/submission-details/:kycId
export const getSubmissionDetails = (kycId)    => api.get(`/api/admin/kyc/submission-details/${kycId}`);

// Approve → PATCH /api/admin/kyc/approve-verification/:kycId
export const adminApproveKyc      = (kycId)    => api.patch(`/api/admin/kyc/approve-verification/${kycId}`);

// Reject → PATCH /api/admin/kyc/reject-verification/:kycId
export const adminRejectKyc       = (kycId, reason) => api.patch(`/api/admin/kyc/reject-verification/${kycId}`, { reason });

// Bulk approve → PATCH /api/admin/kyc/bulk-approve
export const bulkApprove          = (kycIds)   => api.patch("/api/admin/kyc/bulk-approve", { kycIds });

// Bulk reject → PATCH /api/admin/kyc/bulk-reject
export const bulkReject           = (kycIds, reason) => api.patch("/api/admin/kyc/bulk-reject", { kycIds, reason });

// Delete record → DELETE /api/admin/kyc/delete-record/:kycId
export const deleteKycRecord      = (kycId)    => api.delete(`/api/admin/kyc/delete-record/${kycId}`);

// Audit log → GET /api/admin/kyc/audit-log?page=&limit=
export const getAuditLog          = (params)   => api.get("/api/admin/kyc/audit-log", { params });

// ── USER KYC  (/api/kyc/...) ─────────────────────────────────────
export const getVerificationStatus   = () => api.get("/api/kyc/verification-status");
export const getReviewPipelineStatus = () => api.get("/api/kyc/review-pipeline-status");
export const getApprovalConfirmation = () => api.get("/api/kyc/approval-confirmation");
export const getRejectionDetails     = () => api.get("/api/kyc/rejection-details");
export const submitForReview         = () => api.post("/api/kyc/submit-for-review", {});
export const resetAndRetry           = () => api.delete("/api/kyc/reset-and-retry");

export const uploadPan = (file) => {
  const form = new FormData();
  form.append("panCard", file);
  return api.post("/api/kyc/upload-pan-documents", form, { headers: { "Content-Type": "multipart/form-data" } });
};

export const uploadAadhar = (aadharFront, selfie) => {
  const form = new FormData();
  form.append("aadharFront", aadharFront);
  form.append("selfie", selfie);
  return api.post("/api/kyc/upload-aadhar-documents", form, { headers: { "Content-Type": "multipart/form-data" } });
};

export const uploadPassport = (file) => {
  const form = new FormData();
  form.append("passport", file);
  return api.post("/api/kyc/upload-passport-documents", form, { headers: { "Content-Type": "multipart/form-data" } });
};

// ── WALLET  (/api/wallet/...) ─────────────────────────────────────
export const getWalletBalance      = ()              => api.get("/api/wallet/balance");
export const getWallet             = ()              => api.get("/api/wallet/getwallet");
export const getTransactions       = ()              => api.get("/api/wallet/transaction-list");
export const getTransactionById    = (id)            => api.get(`/api/wallet/transactionById/${id}`);
export const getWalletDashboard    = ()              => api.get("/api/wallet/getwalletdashboard");
export const getIncomeOutcome      = ()              => api.get("/api/wallet/income-outcome");
export const getTransactionCount   = ()              => api.get("/api/wallet/get-transaction-count");
export const previewTransfer       = (data)          => api.post("/api/wallet/transfer/preview", data);
export const confirmTransfer       = (data)          => api.post("/api/wallet/transfer/confirm", data);
export const getUserByAddress      = (address)       => api.get(`/api/wallet/user/${address}`);
export const getTransactionsWithUser=(address)       => api.get(`/api/wallet/transactions/user/${address}`);
