# ✨ Welcome to Your Spark Template!
You've just launched your brand-new Spark Template Codespace — everything’s fired up and ready for you to explore, build, and create with Spark!

This template is your blank canvas. It comes with a minimal setup to help you get started quickly with Spark development.

🚀 What's Inside?
- A clean, minimal Spark environment
- Pre-configured for local development
- Ready to scale with your ideas
  
🧠 What Can You Do?

Right now, this is just a starting point — the perfect place to begin building and testing your Spark applications.

## 🐳 Docker Setup

This project includes Docker support for easy deployment and containerization.

### Using Docker Compose (Recommended)

Build and run the container:
```bash
docker-compose up -d
```

Stop the container:
```bash
docker-compose down
```

The application will be available at `http://localhost:8080`

### Using Docker directly

Build the image:
```bash
docker build -t html5-gaming-website .
```

Run the container:
```bash
docker run -d -p 8080:80 --name gaming-website html5-gaming-website
```

Stop the container:
```bash
docker stop gaming-website
docker rm gaming-website
```

### Docker Image Details
- **Base Image**: Node 20 Alpine (build stage), Nginx Alpine (production stage)
- **Build Process**: Multi-stage build for optimized image size
- **Port**: The application runs on port 80 inside the container, mapped to port 8080 on the host
- **Web Server**: Nginx for serving static files

🧹 Just Exploring?
No problem! If you were just checking things out and don’t need to keep this code:

- Simply delete your Spark.
- Everything will be cleaned up — no traces left behind.

📄 License For Spark Template Resources 

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
