# POVOS ONE - Database Standards

Version: 1.0.0

Status: Draft

---

# Philosophy

The database stores platform data.

Business meaning belongs to the Universal Entity Model.

Database design must always follow the canonical entities.

---

# Universal Primary Key

Every table uses:

UUID

No auto-increment integer IDs.

---

# Audit Columns

Every table must include:

- id
- createdAt
- updatedAt
- createdBy
- updatedBy
- deletedAt
- version

---

# Soft Delete

Records are never physically deleted unless explicitly authorized.

deletedAt represents logical deletion.

---

# Naming Standards

Tables:
snake_case plural

Examples:

users

workspaces

opportunities

applications

Columns:
camelCase

Examples:

createdAt

updatedAt

workspaceId

userId

---

# Relationships

Foreign Keys must always reference UUID primary keys.

---

# Enum Strategy

Business values that change frequently should not use database enums.

Prefer lookup tables.

---

# Index Strategy

Every table should index:

Primary Key

Status

Created Date

Updated Date

Owner

Search Fields

---

# Multi-Tenant Ready

Every business table should support workspace ownership where applicable.

---

# Rule

The Universal Entity Model is the source of truth.

The database must never redefine business meaning.