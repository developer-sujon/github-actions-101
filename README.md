Here’s the revised and merged guide combining your previous document and additional improvements for **automatic deployment of a Node.js Express server to a self-hosted Ubuntu VPS using GitHub Actions**:

---

# **Automatic Deployment of Node.js Express Server to Self-Hosted Ubuntu VPS**

This guide walks you through automating the deployment of your **Node.js Express server** to a self-hosted Ubuntu Virtual Private Server (VPS) using **GitHub Actions**.

---

### **Prerequisites**
Ensure you have the following ready:
1. A **GitHub account**.
2. A **VPS** running Ubuntu (e.g., AWS EC2, DigitalOcean, Linode, etc.).
3. Your **Node.js Express server** code pushed to a GitHub repository.
4. Basic knowledge of the command-line interface (CLI).

---

## **Step 1: Set Up Your Ubuntu VPS**

1. **Log in to your VPS**:
   ```bash
   ssh username@your-vps-ip
   ```

2. **Update the system and install necessary tools**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y curl git tar
   ```

3. **Install Node.js and PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pm2
   ```

4. **Optional - Set up a firewall**:
   Configure your firewall to allow SSH, HTTP, and your application port (e.g., `3000`):
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 3000
   sudo ufw enable
   ```

---

## **Step 2: Create a GitHub Repository**

1. Go to [GitHub](https://github.com) and create a new repository.
2. Push your Node.js Express server code to the repository:
   ```bash
   git init
   git remote add origin https://github.com/your-username/your-repo.git
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

---

## **Step 3: Set Up a Self-Hosted Runner on Your VPS**

1. **Navigate to your GitHub Repository**:
   - Go to **Settings > Actions > Runners** and click **Add Runner**.

2. **Install the GitHub Runner**:
   Follow the instructions for Linux provided on GitHub, or run:
   ```bash
   cd ~
   curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/latest/download/actions-runner-linux-x64.tar.gz
   mkdir actions-runner && tar xzf actions-runner-linux-x64.tar.gz -C actions-runner
   cd actions-runner
   ```

3. **Configure the Runner**:
   Replace `REPO_URL` and `YOUR_TOKEN` with your repository URL and the token provided during setup:
   ```bash
   ./config.sh --url https://github.com/your-username/your-repo --token YOUR_TOKEN
   ```

4. **Start the Runner**:
   ```bash
   ./run.sh
   ```

5. **Optional - Run as a Service**:
   To ensure the runner starts on boot:
   ```bash
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```

---

## **Step 4: Create the GitHub Workflow**

1. Inside your repository, create the directory `.github/workflows`.
2. Add a new file called `deploy.yml` with the following content:

   ```yaml
   name: Deploy to Self-Hosted VPS

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       name: Deploy to Self-Hosted VPS
       runs-on: self-hosted

       steps:
         # Step 1: Checkout repository
         - name: Checkout repository
           uses: actions/checkout@v2

         # Step 2: Use Node.js
         - name: Use Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16.x'

         # Step 3: Install dependencies
         - name: Install dependencies
           run: |
             npm install --frozen-lockfile
             npm install -g pm2

         # Step 4: Configure environment variables
         - name: Configure environment
           run: echo "SERVER_PORT=${{ secrets.SERVER_PORT }}" >> .env

         # Step 5: Build application (if applicable)
         - name: Build application
           run: npm run build

         # Step 6: Start the application with PM2
         - name: Start application
           run: pm2 start npm --name "my-app" -- start
   ```

---

## **Step 5: Configure GitHub Secrets**

1. Navigate to your repository on GitHub.
2. Go to **Settings > Secrets** and click **New repository secret**.
3. Add the required secrets:
   - **`SERVER_PORT`**: The port number your app will run on (e.g., `3000`).
   - Add any other environment variables your app requires.

---

## **Step 6: Trigger the Workflow**

1. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Deploy to VPS"
   git push origin main
   ```

2. Go to the **Actions** tab in your GitHub repository to monitor the workflow.

---

## **Step 7: Monitor and Test**

1. **Check Runner Status**:
   On GitHub, go to **Settings > Actions > Runners**. Ensure your runner is listed as **online**.

2. **Check Workflow Logs**:
   If the deployment fails, review the logs in the **Actions** tab to debug any issues.

3. **Test Your Application**:
   Visit your VPS IP or domain at the specified port (e.g., `http://your-vps-ip:3000`) to ensure your Node.js application is running.

---

### **Additional Tips**
1. **Using a Custom Domain**: 
   Set up a reverse proxy like **Nginx** to serve your app over a custom domain with HTTPS.

2. **Automate with PM2**:
   PM2 ensures your application restarts if it crashes:
   ```bash
   pm2 startup
   pm2 save
   ```

3. **Monitoring**:
   Use `pm2 monit` to monitor your application in real-time.

---

This workflow ensures your Node.js Express server is automatically deployed to your Ubuntu VPS upon pushing code changes to your GitHub repository. Let me know if you need further clarification or help!
