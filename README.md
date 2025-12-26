# Task-updated-using-deployment-file-on-ecs-cluster

### 1. CI/CD Deployment Workflow (GitHub Actions → ECS → CodeDeploy)

This repository uses GitHub Actions to automate deployment of the application to Amazon ECS (Fargate) using AWS CodeDeploy.

Before enabling the workflow, ensure the following are set up in AWS

### 2. GitHub Secrets Required

Add the following secrets in GitHub → Settings → Secrets → Actions:

AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ACCOUNT_ID

### 3. Deployment Workflow Steps
1️. Trigger the Workflow => Workflow runs on push to the main branch (or manually if configured).

2️. Checkout Source Code => GitHub Actions checks out the repository code.

3️. Configure AWS Credentials => AWS credentials are loaded using aws-actions/configure-aws-credentials.

4️. Authenticate to Amazon ECR =>GitHub Actions logs in to Amazon ECR.

5️. Build Docker Image => Docker image is built from the repository Dockerfile.Image is tagged using the Git commit SHA.

6️. Push Image to ECR => The tagged image is pushed to the ECR repository.

7️. Render ECS Task Definition => Task definition JSON is updated dynamically. The container image URI is replaced with the newly pushed ECR image.

8️. Register New Task Definition => The updated task definition is registered in ECS. A new task definition revision is created.

9️. Generate CodeDeploy AppSpec => An AppSpec file is generated dynamically. Container name & Container port

10. Trigger CodeDeploy Deployment => A new deployment is created using the generated AppSpec.

### CodeDeploy performs a rolling update:

1. Launches new tasks
2. Runs health checks
3. Shifts traffic gradually

### 1️⃣1️⃣ Monitor Deployment Status

GitHub Actions waits for deployment completion.

Deployment status is monitored in real time.

### 1️⃣2️⃣ Automatic Rollback (If Failure Occurs)

If deployment fails:

CodeDeploy automatically rolls back

Previous healthy task definition is restored

Traffic is redirected back to the last stable version

### ✅ Deployment Success Criteria

A deployment is considered successful when:

ECS tasks are running and healthy

Target group health checks pass

CodeDeploy reports Succeeded

Application is reachable via Load Balancer

