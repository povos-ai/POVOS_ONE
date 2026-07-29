# POVOS ONE - Entity Relationships

Version: 1.0.0

Status: Draft

---

# Core Canonical Relationships

Person
│
├── User Account(s)
├── Application(s)
├── Document(s)
├── Skill(s)
├── Notification(s)
└── Organization Membership(s)

Organization
│
├── User(s)
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
├── Person
├── Opportunity
├── Submitted Document(s)
├── Review(s)
└── Workflow Instance(s)

---

# Cardinality

Organization 1 ---- * Opportunity

Person 1 ---- * Application

Opportunity 1 ---- * Application

Organization * ---- * Person

Person 1 ---- * Document

Organization 1 ---- * Workflow

Opportunity 1 ---- * Workflow

Application 1 ---- * Review

---

# Design Rule

No business module may bypass these canonical relationships.

Additional module relationships may extend but never replace them.