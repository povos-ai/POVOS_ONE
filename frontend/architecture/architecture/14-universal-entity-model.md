# <PovosText className="text-2xl" /> - Universal Entity Model

Version: 1.0.0

Status: Draft

Owner: Platform Architecture

---

# Purpose

The Universal Entity Model (UEM) defines the canonical business objects of <PovosText className="text-2xl" />.

Every module, framework, API, database schema, AI service, workflow and integration must use these entities.

Business modules may extend entities but must never redefine their core meaning.

---

# Vision

Design a single entity model that can support:

- Government Platforms
- Opportunity Portals
- Enterprise Applications
- Universities
- NGOs
- Political workspaces
- Healthcare
- Startup Ecosystems
- Future Solutions

without changing the Platform Kernel.

---

# Universal Entity Principles

## 1. Canonical

Each entity has one official definition.

---

## 2. Reusable

Entities must be reusable across every module.

---

## 3. Extendable

Modules may extend entities without modifying the core.

---

## 4. Versioned

Every entity supports versioning.

---

## 5. Auditable

Every entity supports complete audit history.

---

## 6. Searchable

Every entity is searchable.

---

## 7. AI Ready

Every entity provides structured metadata for AI services.

---

## 8. Event Driven

Entity changes publish domain events.

---

## Canonical Entity Structure

Every Universal Entity must define:

- Purpose
- Business Meaning
- Owner
- Lifecycle
- Relationships
- Events
- Permissions
- Search Metadata
- AI Metadata
- Audit Rules
- Version Strategy

This structure applies to every entity within <PovosText className="text-2xl" />.

---

# Entity: user

## Purpose

Represents any human individual interacting with the platform.

A user is the canonical representation of an individual, regardless of their role in any module.

---

## Business Meaning

A user may become:

- Citizen
- Student
- Job Seeker
- Employee
- Entrepreneur
- Farmer
- Freelancer
- Investor
- Political Worker
- Volunteer
- Applicant
- Mentor
- Trainer

Roles may change over time.

The user entity remains the same.

---

## Owner

Platform Kernel

---

## Lifecycle

Created

↓

Verified

↓

Active

↓

Inactive

↓

Archived

---

## Relationships

A user may have:

- One or more user Accounts
- Membership in one or more workspaces
- Multiple Opportunities Applied
- Multiple Documents
- Multiple Skills
- Multiple Certifications
- Multiple Notifications
- Multiple Conversations
- Multiple Tasks

---

## Core Identity

Every user must have a globally unique Platform ID.

Business identifiers (Employee ID, Student ID, Voter ID, etc.) belong to extensions or linked records, not the canonical identity.

---

## Permissions

Access to user data is controlled through Role-Based Access Control (RBAC).

Modules must never bypass platform authorization.

---

## Search Metadata

user records should support search by:

- Name
- Email
- Mobile Number
- Skills
- City
- State
- workspace
- Profession
- Tags

---

## AI Metadata

AI services may use:

- Skills
- Interests
- Languages
- Experience
- Education
- Opportunity History

to improve recommendations and useralization.

Sensitive information must only be accessed according to authorization rules.

---

## Audit Rules

Every change to a user record must be logged.

Audit history includes:

- Created By
- Updated By
- Timestamp
- Previous Values
- Current Values

Deletion must be logical (soft delete) unless explicitly authorized.

---

## Version Strategy

The canonical definition of user is maintained by the Platform.

Business modules may extend the entity but must not redefine its purpose or identity.

---

# Entity: workspace

## Purpose

Represents any legal, public, private, or community-based entity that creates, manages, owns, or participates in opportunities and platform activities.

An workspace is the canonical representation of an institution, regardless of its industry or sector.

---

## Business Meaning

An workspace may represent:

- Government Department
- Ministry
- Company
- Startup
- MSME
- NGO
- University
- School
- Hospital
- Political workspace
- Incubator
- Investor
- Association
- Trust
- Cooperative

workspace types may evolve over time.

The workspace entity remains the same.

---

## Owner

Platform Kernel

---

## Lifecycle

Registered

↓

Verified

↓

Active

↓

Suspended

↓

Archived

---

## Relationships

An workspace may have:

- Multiple users
- Multiple Members (users)
- Multiple Opportunities
- Multiple Departments
- Multiple Documents
- Multiple Projects
- Multiple Workflows
- Multiple Notifications

A user may belong to multiple workspaces, and an workspace may have many users.

---

## Core Identity

Every workspace must have a globally unique Platform ID.

Business identifiers (Registration Number, GST, CIN, UDISE, etc.) should be stored as linked attributes or extensions, not as the canonical identity.

---

## Permissions

workspaces do not bypass platform security.

Access is controlled through platform roles, permissions, and delegated administration.

---

## Search Metadata

workspace records should support search by:

- Name
- Type
- Industry
- Location
- Registration Number
- Website
- Tags

---

## AI Metadata

AI services may use:

- workspace Type
- Sector
- Opportunity History
- Skills Required
- Hiring Trends
- Collaboration History

to provide recommendations, insights, and analytics.

---

## Audit Rules

Every change to an workspace record must be audited.

Audit history includes:

- Created By
- Updated By
- Timestamp
- Previous Values
- Current Values

Deletion must be logical (soft delete) unless explicitly authorized.

---

## Version Strategy

The canonical definition of workspace is maintained by the Platform.

Business modules may extend the entity but must not redefine its purpose or identity.


---

# Entity: Opportunity

## Purpose

Represents any discoverable opportunity that enables a user or workspace to grow, earn, learn, build, collaborate, participate, or receive benefits.

Opportunity is the central business entity of the POVOS Opportunities solution.

---

## Business Meaning

An Opportunity may represent:

- Job
- Government Scheme
- Scholarship
- Grant
- Tender
- Internship
- Fellowship
- Investment
- Business Lead
- Event
- Competition
- Training Program
- Volunteer Program
- Accelerator Program

New opportunity types may be introduced without changing the canonical definition.

---

## Owner

workspace

Every Opportunity is created, owned, or managed by an workspace.

---

## Lifecycle

Draft

↓

Submitted

↓

Verified

↓

Published

↓

Active

↓

Closed

↓

Archived

---

## Relationships

An Opportunity may have:

- One Owner workspace
- Multiple Applications
- Multiple Required Documents
- Multiple Skills
- Multiple Eligibility Rules
- Multiple Categories
- Multiple Deadlines
- Multiple Notifications

A user may apply to multiple Opportunities.

An Opportunity may receive applications from multiple users.

---

## Core Identity

Every Opportunity must have a globally unique Platform ID.

Module-specific identifiers may exist but must not replace the canonical identity.

---

## Permissions

Only authorized workspaces may create or manage Opportunities.

Visibility, editing, publishing, and archival actions are governed by platform permissions and workflow policies.

---

## Search Metadata

Opportunity records should support search by:

- Title
- Type
- Category
- workspace
- Location
- Skills
- Eligibility
- Deadline
- Tags
- Status

---

## AI Metadata

AI services may use:

- Opportunity Type
- Eligibility Criteria
- Required Skills
- Location
- Historical Applications
- Completion Outcomes

to provide recommendations, ranking, summaries, and useralized matching.

---

## Audit Rules

Every change to an Opportunity must be audited.

Audit history includes:

- Created By
- Updated By
- Timestamp
- Previous Values
- Current Values
- Status Changes

Deletion must be logical (soft delete) unless explicitly authorized.

---

## Version Strategy

The canonical definition of Opportunity is maintained by the Platform.

Business modules may extend the entity with additional fields, workflows, or metadata but must not redefine its purpose or identity.