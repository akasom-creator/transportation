# Mapbox Setup Instructions

## Get Your Mapbox API Token

1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Sign up for a free account (if you don't have one)
3. Navigate to **Access tokens** page
4. Copy your **Default public token** or create a new one
5. Add to your `.env.local`:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_actual_token_here
```

6. Restart the dev server:
```bash
npm run dev
```

## Features Now Available

Once you add your Mapbox token, you'll have:

- ✅ Interactive map centered on Lagos
- ✅ Incident markers color-coded by severity
- ✅ Click markers to see incident details
- ✅ Zoom, pan, and navigate the map
- ✅ Geolocate button to find your current location
- ✅ Fullscreen mode
- ✅ Filter incidents by type and severity
- ✅ Pulsing animation for high/critical incidents

## Free Tier Limits

Mapbox free tier includes:
- **50,000 map loads per month** (more than enough for MVP)
- All standard map styles
- Unlimited markers and popups

## Test It Out

1. Navigate to `/dashboard/incidents`
2. You'll see the interactive map with 8 sample incidents around Lagos
3. Click any marker to see details
4. Use filters to show specific incident types or severity levels
