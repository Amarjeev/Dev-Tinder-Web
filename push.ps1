# Change to your project folder
Set-Location "C:\Users\dell\OneDrive\Desktop\Dev Tinder-Web\my-app"

# Add all files to Git
git add .

# Commit with current date
$today = Get-Date -Format "yyyy-MM-dd"
git commit -m "Daily update - $today"

# Push to GitHub
git push

# .\my-app\push.ps1
