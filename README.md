
GitHub/EC2 Instance | Automatic Deployment using GitHub Action
To automate the deployment of your Node.js Express server to a self-hosted Ubuntu Virtual Private Server (VPS) using GitHub Actions, follow these steps:

## Prerequisites:
Before you begin, make sure you have the following:

1. A GitHub account
2. A Virtual Private Server (VPS) running Ubuntu
2. Your Node.js Express server code ready
3. Basic knowledge of using the command-line interface (CLI)

### Step 1: Set Up Your Ubuntu VPS
Ensure that you have a Virtual Private Server (VPS) running Ubuntu installed and configured. You can obtain a VPS from providers like AWS EC2, DigitalOcean, Linode, etc.

### Step 2: Create a GitHub Repository
Create a new repository on GitHub and push your Node.js Express server code to this repository.

### Step 3: Set Up Self-Hosted Runner on Your VPS
Configure a self-hosted GitHub Actions runner on your Ubuntu VPS. Follow the instructions provided by GitHub to set up and configure a self-hosted runner.

### Step 4: Create GitHub Workflow
Inside your GitHub repository, create a new directory named .github/workflows.

Within this directory, create a workflow file (e.g., deploy.yml) with the following content:

```
yaml
Copy code
name: Deploy to Self-Hosted VPS

on:
  push:
    branches:
      - self-hosted

jobs:
  deploy:
    name: Deploy to Self-Hosted VPS
    runs-on: self-hosted
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14.x'

      - name: Install dependencies
        run: |
          npm install --frozen-lockfile
          npm install -g pm2

      - name: Configure environment
        run: |
          echo "SERVER_PORT=${{ secrets.SERVER_PORT }}" >> .env

      - name: Build Application
        run: npm run build

      - name: Run Application
        run: pm2 start npm --name "my-app" -- start
```

Save to grepper
Replace SERVER_PORT with the environment variable your application uses for the port.

### Step 5: Create GitHub Secrets
* Navigate to your repository on GitHub.
* Go to the "Settings" tab.
* In the left sidebar, click on "Secrets".
* Click on the "New repository secret" button.
* Enter the name and value of your secret, then click "Add secret".
* Ensure that the secret name matches the one used in your workflow (SERVER_PORT in this example).

That's it! Your Node.js Express server will now be automatically deployed to your self-hosted Ubuntu VPS whenever you push changes to the self-hosted branch of your GitHub repository.


### Step 6: Create GitHub Runner and Configure

Download and Configure the GitHub Runner:

On your Ubuntu VPS, download the GitHub Actions self-hosted runner package by following the instructions provided by GitHub. You can typically find these instructions in the "Set up and configure a self-hosted runner" section of your GitHub repository's Actions settings.
Extract the downloaded package and run the configuration script. During the configuration process, you'll be prompted to enter your GitHub repository's URL, an access token, and other configuration details.
Start the GitHub Runner:

Once the configuration is complete, start the GitHub runner service on your VPS. This service will listen for jobs from your GitHub repository and execute them on your VPS.
You can usually start the runner service using a command like ./svc.sh start.
Verify Runner Connection:

Go to your GitHub repository's "Settings" > "Actions" > "Self-hosted runners" section.
You should see your self-hosted runner listed as active. If it's active and idle, it means it's successfully connected to your GitHub repository and ready to execute workflows.
Monitor Runner Status:

Keep an eye on the runner status to ensure it remains connected and operational. You can monitor this through the GitHub Actions settings or by checking the status of the runner service on your VPS.
By completing these steps, you'll have successfully created and configured a GitHub Actions self-hosted runner on your Ubuntu VPS. This runner will be responsible for executing workflows triggered by events in your GitHub repository, such as pushes to the self-hosted branch, allowing for automated deployment of your Node.js Express server.