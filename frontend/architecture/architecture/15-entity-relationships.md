# <PovosText className="text-2xl" /> - Entity Relationships

Version: 1.0.0

Status: Draft

---

# Core Canonical Relationships

user
│
├── user Account(s)
├── Application(s)
├── Document(s)
├── Skill(s)
├── Notification(s)
└── workspace Membership(s)

workspace
│
├── user(s)
├── Opportunity(s)
├── Department(s)
├── Project(s)
└── Workflow(s)

Opportunity
│
├── Application(s)
├── Required Document(s)
├── Required Skill(s)
├── Eligibility Rule(s)
└── Notification(s)

Application
│
├── user
├── Opportunity
├── Submitted Document(s)
├── Review(s)
└── Workflow Instance(s)

---

# Cardinality

workspace 1 ---- * Opportunity

user 1 ---- * Application

Opportunity 1 ---- * Application

workspace * ---- * user

user 1 ---- * Document

workspace 1 ---- * Workflow

Opportunity 1 ---- * Workflow

Application 1 ---- * Review

---

# Design Rule

No business module may bypass these canonical relationships.

Additional module relationships may extend but never replace them.