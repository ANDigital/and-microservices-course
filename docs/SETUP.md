# Setup

## Collaboration

[Join Slack](https://join.slack.com/t/microservices-course/signup) using your email address or via the invite you received.

[Open the Trello board](https://trello.com/b/IKwQ0ljq/microservices-course) so you can collaborate as a team.

## GitHub

First things first, [create an account](https://github.com) if you don't have one and let's start setting up GitHub so it can respect the DoD:

1. Fork the project into your personal account so you can make any changes. 
2. Set up an Organisation for your team and invite the relevant people
3. Create your first repository for the API you're building in the Organisation
4. Configure the repository in the following way:
   * Only allow squash commits (in the main settings page)
   * Branches section, add **master** as your Protected Branch
   * Click Edit and select 'Protect this branch', then the following:
        * 'Require pull request reviews before merging'
        * 'Require status checks to pass before merging' -> 'Require branches to be up to date before merging'
        * 'Include administrators'
5. Your GitHub project is now ready for collaboration

## CI

Now that we have our GitHub set up, it's time to set up either [TravisCI](https://travis-ci.org/) or [CircleCI](https://circleci.com/signup/)

Configure your repositories there accordingly, there's no need to start writing YML files *right now*.

## Slack

Any relevant integrations that we need can be added to Slack - GitHub, CircleCI / TravisCI, Trello etc.

Please create a public channel for your team, for example #team-1337

## Heroku

[Sign up to a free account](https://id.heroku.com/signup/login) to get started and give the relevant people access to it.

Then connect your Heroku app with your GitHub account for the given repository.

We'll look at build packs and Procfiles later on :)

## AWS

[Sign up to a free account](https://aws.amazon.com/free) to get started and give the relevant people access to it.

## Docker Hub and Docker Cloud

We will be using Docker this workshop so we need to have a Docker ID, please set up one [here](https://hub.docker.com/)
and use it to check if you can log into Docker Hub and Docker Cloud.

### Docker Hub

1. Create an [organisation](https://hub.docker.com/organizations/) and add the relevant people to it
2. Create a [repository](https://hub.docker.com/add/repository/) for that organisation and leave it as *public*

### Docker Cloud

1. Go to https://cloud.docker.com/ and select your organisation from the top right corner
2. Enable *Swarm mode* toggle 
3. Click the big *+* button and select *Swarm*
4. Give it a name (e.g. *my-swarm-cluster*)
5. Select AWS as the Provider and follow the instruction to connect it to Docker Cloud.
6. Once connected, select *Stable* from the dropdown menu
7. Select *eu-west-1* as your region (for example)
8. Press **Create** and give it time.

## DataDog

[Sign up for a free trial](https://app.datadoghq.com/signup/) and obtain your API key. Save it someplace safe.

Open your DataDog dashboard after that.
