# TODO: Fix /api/category 500 Error

## Plan Progress

- [x] Analyze files (schema.sql, db.ts, tables.ts, seed.sql, api route)
- [x] Identify root cause: Broken FK REFERENCES in schema.sql
- [x] Fix schema.sql (3 FK changes)
- [ ] User re-applies schema to DB
- [ ] Test /api/category endpoint
- [ ] Seed data if needed
- [ ] Close issue

Current step: [x] Schema fixed. Re-apply to DB and test /api/category.

## Remaining

- User: Re-run `psql -h localhost -U postgres -d store_db -f src/lib/schema.sql`
- Test: GET /api/category should return categories JSON
- Optional: Run seed.sql if no data
