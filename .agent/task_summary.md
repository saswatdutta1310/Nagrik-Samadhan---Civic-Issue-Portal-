# Task Summary

## Features Implemented
1. **Global Wallet State**:
   - Created `WalletContext` for global balance/transaction management.
   - Synchronized Header and Wallet page.

2. **Issue Details - Real & Mock Data**:
   - Refactored `IssueDetail.tsx` to handle both **Real Supabase Data** and **Enriched Mock Data**.
   - **Mock Data Enriched**: Updated `mockData.ts` with explicit `latitude`, `longitude`, and `funding` object for each mock issue.
   - **Dynamic Funding & Maps**: The detail page now renders correct funding stats (Govt vs Community) and location maps for mock issues without errors.

3. **Map Behavior Optimization**:
   - Modified `MapPicker.tsx` to accept `enableGeolocation` prop.
   - **Issue Detail**: Disabled auto-location (`enableGeolocation={false}`) so the map correctly shows the *reported* location (e.g., Pothole on Main St) instead of jumping to the user's current GPS location.
   - **Report Issue**: Preserved auto-location (default `true`) so users can easily tag their current spot.

4. **Authentication**:
   - Added Google and Phone Auth UI (ready for backend config).

## Files Modified
- `src/lib/mockData.ts`: Added coordinates/funding to mocks.
- `src/components/MapPicker.tsx`: Added `enableGeolocation` prop logic.
- `src/pages/IssueDetail.tsx`: Updated to use enriched mocks and disable map auto-location.
- `src/pages/ReportIssue.tsx`: Uses default map behavior (auto-locate).
- `src/pages/Auth.tsx`: Auth UI updates.

## Next Steps
- Backend Payment integration.
- Real-time features (Supabase Subscriptions).
