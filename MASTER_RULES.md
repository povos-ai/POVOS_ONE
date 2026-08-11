# POVOS ONE – Master Development Rules

## 1. Version Control & Restore Points
- Every milestone (working feature, stable state) must be committed and tagged.
- Before any major change, create a commit with a clear message: "Before changing X".
- Always keep a stable branch (e.g., `phase-2a-stable`) and a development branch (`phase-2b-dev`).
- Tags like `v2A-stable` must be created to easily roll back.

## 2. No Arbitrary Rewrites
- Never rewrite an entire feature (like login, dashboard) without a restore point.
- Instead: "First create a restore point. Make only the requested change. Do not modify unrelated files. If the change breaks existing functionality, revert the change."

## 3. Experimental Development is Controlled
- All new features go to a dedicated branch (e.g., `phase-2b-dev`).
- No experimental changes on `main` or `stable` branches.
- If a feature proves unstable, delete the branch and start over without affecting stable code.

## 4. Phase Transition
- Phase 2A (stabilization) must be 100% complete before moving to Phase 2B.
- Phase 2B (Recommendation Engine) will begin only after:
  - [ ] Login works without `[object Object]`
  - [ ] One sidebar, one header, no duplicate layouts
  - [ ] Dashboard fits viewport
  - [ ] All encoding fixed
  - [ ] All existing functionality preserved

## 5. Commit & Tag Convention
- Commit messages: `"fix: login error handling"`, `"feat: add recommendation engine"`, `"refactor: remove duplicate sidebar"`
- Tags: `v2A-stable`, `v2B-alpha`, `v2B-beta`, `v2B-prod`

## 6. Git Commit After Each Successful Step
- After every successful fix or feature addition, commit the changes with a descriptive message.
- This ensures we can always revert to any working state.
