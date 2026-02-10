# Deploy to Heroku

## Prerequisites
1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Have a Heroku account: https://www.heroku.com/

## Deployment Steps

### Option 1: Deploy via Heroku CLI (Recommended)

```bash
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create walmart-store-tasks

# Set environment variables (if needed)
heroku config:set NODE_ENV=production

# Deploy from GitHub
heroku git:remote -a walmart-store-tasks
git push heroku main

# View logs
heroku logs --tail

# Open the app
heroku open
```

### Option 2: Connect GitHub to Heroku (Automatic Deployment)

1. Go to https://dashboard.heroku.com/apps
2. Create a new app: `walmart-store-tasks`
3. In the **Deploy** tab:
   - Select "GitHub" as deployment method
   - Connect your GitHub account
   - Search for `add-new-visit-modal` repository
   - Enable "Automatic Deploys" from main branch
4. Click "Deploy Branch" to deploy immediately

### Option 3: Deploy Button (Easiest)

Add this button to your README.md:

```markdown
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/bhagath310-source/add-new-visit-modal)
```

## Verify Deployment

Once deployed, your app will be available at:
```
https://walmart-store-tasks.herokuapp.com/walmart-header
```

## Troubleshooting

If you encounter issues:

```bash
# Check app logs
heroku logs --tail

# Restart the app
heroku restart

# Scale dynos if needed
heroku ps:scale web=1
```

## Useful Commands

```bash
# List your apps
heroku apps

# View app info
heroku apps:info walmart-store-tasks

# Set config variables
heroku config:set KEY=VALUE

# Open app in browser
heroku open

# Destroy app (if needed)
heroku apps:destroy walmart-store-tasks
```

---

**GitHub Repository**: https://github.com/bhagath310-source/add-new-visit-modal
