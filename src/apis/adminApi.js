// ─────────────────────────────────────────────────────────────────────────────
// adminApi.js  —  All admin API calls mapped 1-to-1 from backend routes
// Base URL: http://localhost:3001
// All endpoints require:  Authorization: Bearer <admin_token>
// ─────────────────────────────────────────────────────────────────────────────
import api from "./Axios";

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN AUTH  →  /api/admin/auth/...
// ══════════════════════════════════════════════════════════════════════════════

/**
 * POST /api/admin/auth/login
 * Body: { email, password }  OR  { mobile, password }
 * Response: { success, token, admin: { name, email, mobile, role, superAdmin? } }
 */
export const adminLogin = (email, password) =>
  api.post("/api/admin/auth/login", { email, password });

/**
 * POST /api/admin/auth/create-admin
 * Body: { name, mobile, email, password }
 * Response: { success, admin: { id, name, email, mobile, role } }
 */
export const createSubAdmin = (data) =>
  api.post("/api/admin/auth/create-admin", data);

/**
 * GET /api/admin/auth/all-admins
 * Response: { success, count, admins: [{ _id, name, email, mobile, createdAt }] }
 */
export const getAllAdmins = () =>
  api.get("/api/admin/auth/all-admins");

/**
 * PATCH /api/admin/auth/revoke-admin/:adminId
 * Response: { success, message, userId }
 */
export const revokeAdminAccess = (adminId) =>
  api.patch(`/api/admin/auth/revoke-admin/${adminId}`);

/**
 * PATCH /api/admin/auth/change-password
 * Body: { currentPassword, newPassword }
 * Response: { success, message }
 */
export const changeAdminPassword = (currentPassword, newPassword) =>
  api.patch("/api/admin/auth/change-password", { currentPassword, newPassword });


// ══════════════════════════════════════════════════════════════════════════════
// ADMIN KYC  →  /api/admin/kyc/...
// ══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/admin/kyc/dashboard-stats
 * Response: { success, stats: { totalSubmissions, notStarted, docsUploaded,
 *             underReview, approved, rejected } }
 */
export const getDashboardStats = () =>
  api.get("/api/admin/kyc/dashboard-stats");

/**
 * GET /api/admin/kyc/all-submissions?status=&page=1&limit=50
 * Response: { success, total, page, totalPages,
 *             kycs: [{ _id, userId:{name,mobile,email}, documentType,
 *                      aadharFrontUrl, panCardUrl, passportUrl, selfieUrl,
 *                      status, rejectionReason, reviewedBy, reviewedAt,
 *                      submissionCount, createdAt }] }
 */
export const getAllSubmissions = (params = {}) =>
  api.get("/api/admin/kyc/all-submissions", { params: { limit: 100, ...params } });

/**
 * GET /api/admin/kyc/pending-reviews
 * Response: { success, count, kycs: [...] }   (status === "under_review", FIFO)
 */
export const getPendingReviews = () =>
  api.get("/api/admin/kyc/pending-reviews");

/**
 * GET /api/admin/kyc/search-user?query=<name|mobile|email>
 * Response: { success, count, kycs: [...] }
 */
export const searchUserKyc = (query) =>
  api.get("/api/admin/kyc/search-user", { params: { query } });

/**
 * GET /api/admin/kyc/submission-details/:kycId
 * Response: { success, kyc: { ...full record with populated userId & reviewedBy } }
 */
export const getSubmissionDetails = (kycId) =>
  api.get(`/api/admin/kyc/submission-details/${kycId}`);

/**
 * PATCH /api/admin/kyc/approve-verification/:kycId
 * No body required.
 * Response: { success, message, kycId, userId, approvedBy, approvedAt }
 * NOTE: Only works if status === "under_review"
 */
export const approveKyc = (kycId) =>
  api.patch(`/api/admin/kyc/approve-verification/${kycId}`);

/**
 * PATCH /api/admin/kyc/reject-verification/:kycId
 * Body: { reason: "string" }   (required)
 * Response: { success, message, kycId, userId, reason, rejectedBy, rejectedAt }
 * NOTE: Only works if status === "under_review"
 */
export const rejectKyc = (kycId, reason) =>
  api.patch(`/api/admin/kyc/reject-verification/${kycId}`, { reason });

/**
 * PATCH /api/admin/kyc/bulk-approve
 * Body: { kycIds: ["id1", "id2"] }
 * Response: { success, message, approvedCount, approvedKycIds }
 */
export const bulkApproveKyc = (kycIds) =>
  api.patch("/api/admin/kyc/bulk-approve", { kycIds });

/**
 * PATCH /api/admin/kyc/bulk-reject
 * Body: { kycIds: ["id1", "id2"], reason: "string" }
 * Response: { success, message, rejectedCount, reason }
 */
export const bulkRejectKyc = (kycIds, reason) =>
  api.patch("/api/admin/kyc/bulk-reject", { kycIds, reason });

/**
 * DELETE /api/admin/kyc/delete-record/:kycId
 * Only allowed for rejected records.
 * Response: { success, message, deletedKycId }
 */
export const deleteKycRecord = (kycId) =>
  api.delete(`/api/admin/kyc/delete-record/${kycId}`);

/**
 * GET /api/admin/kyc/audit-log?page=1&limit=50
 * Response: { success, total, page, totalPages,
 *             logs: [{ _id, status, rejectionReason, documentType,
 *                      reviewedBy:{name,email}, reviewedAt,
 *                      userId:{name,mobile,email}, submissionCount }] }
 */
export const getAuditLog = (params = {}) =>
  api.get("/api/admin/kyc/audit-log", { params: { limit: 50, ...params } });
