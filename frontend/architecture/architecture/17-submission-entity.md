# POVOS ONE - Entity: Submission

Version: 1.0.0

Status: Draft

Owner: Platform Architecture

---

# Purpose

Represents a formal response from a Person or Organization to an Opportunity.

A Submission captures the complete lifecycle of participation, evaluation, and outcome.

---

# Business Meaning

A Submission may represent:

- Job Application
- Scholarship Application
- Tender Bid
- Grant Proposal
- Startup Program Application
- Fellowship Application
- Internship Application
- Vendor Registration
- Competition Entry
- Event Registration

The business label may vary by module, but the canonical entity remains Submission.

---

# Applicant

A Submission may be created by:

- Person
- Organization

Exactly one applicant must exist for every Submission.

---

# Related Opportunity

Every Submission belongs to one Opportunity.

An Opportunity may have many Submissions.

---

# Lifecycle

Draft

↓

Submitted

↓

Under Review

↓

Shortlisted

↓

Approved

↓

Rejected

↓

Withdrawn

↓

Completed

---

# Relationships

A Submission may contain:

- Applicant
- Opportunity
- Documents
- Reviews
- Workflow Instance
- Messages
- Notes
- Timeline
- Attachments

---

# Permissions

Applicants can view and manage their own Submissions according to workflow rules.

Organizations can review only the Submissions they are authorized to access.

---

# Search Metadata

Submission records should support search by:

- Applicant
- Opportunity
- Status
- Submission Date
- Organization
- Tags

---

# AI Metadata

AI services may use:

- Submission History
- Skills Match
- Eligibility Match
- Review Outcomes
- Completion Results

to improve recommendations, ranking, and decision support.

---

# Audit Rules

Every Submission change must be audited.

Track:

- Created By
- Updated By
- Status Changes
- Reviewer Actions
- Timestamp

Soft delete only.

---

# Version Strategy

Submission is a canonical platform entity.

Business modules may extend it but must not redefine its purpose.