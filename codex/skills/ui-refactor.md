# ThreatScope UI Refactor Skill

Use these rules when improving the UI.

## Product direction

ThreatScope should look like a professional SOC / threat intelligence dashboard.

Avoid:
- neon hacker cringe
- Matrix green overload
- gaming UI
- random gradients
- excessive animations
- landing-page look

Prefer:
- clean dark interface
- strong typography hierarchy
- compact dashboard density
- subtle borders
- consistent spacing
- readable cards
- responsive layouts
- clear navigation
- enterprise cybersecurity product feel

## Refactor rules

Before changing code:
1. inspect the current app
2. identify weak UI areas
3. propose a short plan
4. change incrementally

Do not:
- rewrite the whole app
- add backend
- add auth
- add database
- add external APIs
- add new routes unless asked
- install new packages unless necessary

Improve:
- spacing
- card composition
- typography
- hover states
- focus states
- mobile responsiveness
- dashboard density
- table overflow behavior
- sidebar/topbar behavior
- section hierarchy

## Final checks

After changes:
- run lint
- run build
- check mobile
- check tablet
- check desktop
- verify no horizontal scroll