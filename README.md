# zyncion

## Project Overview
zyncion is a React Vite project built to deliver a modern and responsive user experience. This guide covers the installation and development process, ensuring consistency across environments.

-----------------------------------------------------------------------------------------------

## Prerequisites
To ensure compatibility, use the following versions:
- **Node.js**: `v20.17.0`
- **npm**: `10.8.2`
- **Vite**: `5.4.0`

-----------------------------------------------------------------------------------------------

## Development Workflow

## 1. Clone the Repository
Command used to clone the repository to access the source code.
```bash
git clone <repository-url>
cd zyncion
```

## 2. Install Dependencies
Install all the required project dependencies listed in package.json.
```bash
npm install
```

## 3. Start the Development Server
Run the application in development mode.
```bash
npm run dev
```

-----------------------------------------------------------------------------------------------

### Production Workflow

### 1. Build for Production
Generate a dist folder containing the production-ready build.
```bash
npm run build
```

### 2. Run the build locally
Test the production build locally.
```bash
npm run preview
```

-----------------------------------------------------------------------------------------------

#### Deployment Workflow

```
1. Update the system package index.
```bash
sudo apt update
```
2. Install Nginx.
```bash
sudo apt install nginx
```
------------------------------------------------

#### Nginx Configuration (Under Prerequisite Setup)
1. Open the Nginx configuration file for editing:
```bash
sudo nano /etc/nginx/sites-available/default
```
2.Replace the contents with the following configuration:
server {
    listen 80;
    server_name 3.210.33.63;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
	    client_max_body_size 10M;  # Increase payload limit
    }
}
3.Test the Nginx configuration for errors:
```bash
sudo nginx -t
```
4.Reload Nginx to apply the changes:
```bash
sudo systemctl reload nginx
```

------------------------------------------------
 
#### Deploying to EC2

#### 1. Access the EC2 Instance
Navigate your terminal to the directory where your pem file is located, Use the following command to connect to the EC2 instance.
```bash
sudo ssh -i "frontendUbuntu20.pem" ubuntu@ec2-3-210-33-63.compute-1.amazonaws.com
```

#### 2. Copy your changes
Consider openFashionDist as your project folder and path is like /home/ubuntu/openFashionDist.
In your local with the pem file in the project folder and after navigation to the project folder you can copy changes to the EC2.
```bash
scp -r -i frontendUbuntu20.pem dist/* ubuntu@ec2-3-210-33-63.compute-1.amazonaws.com:/home/ubuntu/openFashionDist
```

#### 3. Copy files to /var/www/html/ as configured in nginx
Copy the production build files (from the dist folder) to the configured Nginx root directory:
```bash
sudo cp -rf ~/openFashionDist/* /var/www/html/
```

#### 4. Reload nginx
Ensure the latest changes are reflected:
```bash
sudo systemctl reload nginx
```

-----------------------------------------------------------------------------------------------
