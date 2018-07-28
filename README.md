# Setup

Here is the initial setup you need to do before starting the labs.

## Collaboration

[Open the Trello board](https://trello.com/b/IKwQ0ljq/microservices-course) so you can collaborate as a team.

[Join Slack](https://join.slack.com/t/microservices-course/signup) using your email address or via the invite you received.

## Trello

Please create a label for your team name that you can use whenever you create tasks for your team.

## Slack

Any relevant integrations that we need can be added to Slack - GitHub, CircleCI / TravisCI, Trello etc.

Please create a public channel for your team, for example #team-1337

## GitHub

First things first, [create an account](https://github.com) if you don't have one and let's start setting up GitHub so it can respect the DoD:

1. Fork the project into your personal account so you can make any changes. 
2. Set up an Organisation and invite your team to it
3. Create your first repository for the API you're building in the Organisation
4. Configure the repository in the following way:
   * Only allow squash commits (in the main settings page)
   * Branches section, add **master** as your Protected Branch
   * Click Edit and select 'Protect this branch', then the following:
        * 'Require pull request reviews before merging'
        * 'Require status checks to pass before merging' -> 'Require branches to be up to date before merging'
        * 'Include administrators'
5. Your GitHub project is now ready for collaboration

## Pipelines

### CI

Now that we have our GitHub set up, it's time to set up either [TravisCI](https://travis-ci.org/) / [CircleCI](https://circleci.com/signup/).

Feel free to set up any other tool that you feel comfortable with, but it should be something similar (SaaS solution).

Configure your repositories there accordingly, there's no need to start writing YML files *right now*.

### Code coverage

We will be using [Codecov](http://codecov.io) to upload our code coverage reports and integrate with GitHub status checks.

Please navigate to https://codecov.io/gh and create an account.

### Static analysis

We will be using [Codacy](https://codacy.com) to perform some static analysis for us - it integrates nicely with GitHub status checks.

Please navigate to https://app.codacy.com/projects and create an account with your email configured in Github!

## AWS

We have created a special AWS account for you to use. You will get full access to this account until the end of the course so
you can provision the infrastructure you need.

Each team will get a single account with credentials and access keys so we don't lose precious time settings this up.

Please go to the [sign up link](https://and-course-sandbox.signin.aws.amazon.com/console) with the credentials provided.

## Docker Hub

We will be using Docker so we need to have a Docker ID, please set up one [here](https://hub.docker.com/) and then:

1. Create an [organisation](https://hub.docker.com/organizations/) and add your team members to it
2. Create a [repository](https://hub.docker.com/add/repository/) for that organisation and leave it as *public* for now

## Docker Swarm

We will be using Docker Swarm for our orchestration layer (similar to Amazon ECS, Kubernetes, Rancher etc.)

Here is a list of steps to configure it inside the AWS account:

1. Once logged into AWS, open the following link: https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=my-stack&templateURL=https://editions-us-east-1.s3.amazonaws.com/aws/stable/Docker-no-vpc.tmpl
2. In the top right hand corner make sure you are in the London AWS region.
3. Click Next and rename the stack to your teams' name.
3. Set the following parameters:
    * Number of Swarm managers: 1
    * Number of Swarm worker nodes: 1
    * Which SSH key to use: docker-swarm (please find this SSH key in [keys/docker-swarm.pem](keys/docker-swarm.pem))
    * Swarm manager instance type: t2.medium
    * Agent worker instance type: t2.medium
    * VPC: default (vpc-2015ad48)
    * VPC CIDR block: 172.31.0.0/16
    * Public subnet 1 to 3: select all 3 defined subnets
4. Click Next to get to the final screen and tick *I acknowledge that AWS CloudFormation might create IAM resources.*
5. Wait for the stack to become ready, look at the Outputs tab and save the value of *DefaultDNSTarget* (this is going to be
our load balancer that we will access).

## DataDog

[Sign up for a free trial](https://app.datadoghq.com/signup/) and obtain your API key. Save it someplace safe.

We will use DataDog for monitoring.
