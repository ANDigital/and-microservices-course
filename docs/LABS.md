# Labs

## Setup

Follow the instructions in [README.md](../README.md) to get started on setting up your tooling and environment.

## Plan the work ahead

Add tasks to Trello and manage between the team. You can see what the requirements are below.

## Skeleton API

Now that all the tooling is done, we'll create our first repository by taking into account the following must-have checklist:

- Build and package management tools
- Unit and integration testing libraries
- Configuration management (environment variables)
- Linting / code formatting
- Coverage set up for unit testing with enforced thresholds (> 80% overall at least)
- Dynamic documentation libraries (if it’s the case)
- Logging libraries for generic server logging + access logging
- Healthcheck / Status URLs
- Tools for running locally
- Deployment (scripts, packaging, pipeline support)
- Update README containing instructions on how to build and run

We have provided some skeletons in the following folders, please use them:

* Java with Spring Boot - [java-spring-service](../examples/java-spring-service)
* NodeJS with Express - [node-express-service](../examples/node-express-service)

## Implement the first API

### JWT

Before you start your first API, you are given a JWT (found inside [../keys/jwt](../keys/kwt) that you have to decode 
in your service before you allow the request coming in (so an interceptor or filter would be best here). 

You don't need to do any  signature verification, expiration and claim checks for this (which normally have to happen), 
you just have to decode it and extract the relevant values:

- *sub* - this is the user id that you have to use
- *https://and.digital/role* claim - you have to check that this is equal to `USER`

As a bonus, if you have extra time, you can check implement additional validation checks:

- check the audience claim matches `microservices-in-anger-course`
- check the iss claim matches `https://and.digital`
- check the token is not expired (this should not be the case, the generated token expires in one year)
- check it's signed correctly (it's been signed with the `microservices-in-anger-course-rulz` secret using the HS256 algorithm)

### API

TODO - @mihaianghel

## Integrate with your tooling

Now that you have your first API, let's integrate it with Codecov and Codacy through GitHub.

### Codecov

Navigate to https://codecov.io/gh and set up your project. You will get a token which you can use to upload the reports
(you will find an example in the section below for CI), but it's something like:

```bash
bash <(curl -s https://codecov.io/bash) -t <TOKEN_GOES_HERE>
```

Once done, you can retrieve the badge from the settings tab and place it in your README file.

### Codacy

Navigate to https://app.codacy.com/projects and set up your project. It should be nicely integrated with GitHub and
the branch status checks. You can also set up a Slack integration in there.

Once done, you can retrieve the badge from the settings tab and place it in your README file.

## Write your CI pipeline

*Note*: A sample pipeline for a Java app has been provided for CircleCI in [examples/.circleci/config.yml](examples/.circleci/config.yml).

Discuss with the wider group on how you would design your CI pipeline and implement as much as you can at this stage.

There will be more things to add once we cover deployment. Don't forget to add some Slack integrations :)

## Docker

Adapt your CI pipeline to build your containers, check if they are healthy, run any relevant tests and push them to 
Docker Hub (on the organisation you set up previously).

## Deployment

Because of the current setup, we ned all commands to be run on the Master node via SSH. So to make things easier, we'll setup
a SSH tunnel in the background that will forward all commands to the Swarm cluster (use the SSH key provided before).

Before we do that though, you have to SSH to the master node and add the host to your known hosts (by typing 'yes' once you SSH):

```bash
ssh -i ~/.ssh/docker-swarm.pem docker@YOUR_MASTER_INSTANCE_PUBLIC_IP
```

After that, create the SSH tunnel:

```bash
ssh -i ~/.ssh/docker-swarm.pem -NL localhost:2374:/var/run/docker.sock docker@YOUR_MASTER_INSTANCE_PUBLIC_IP &
```

So you avoid providing the host parameter every single time you execute a Docker command, just set the following environment variable:

```bash
export DOCKER_HOST=localhost:2374
```

**Note**: Please note that because of the `export`, the commands will only work correctly in one Terminal tab. You should add this
variable to your bash profile if you want it persisted across sessions.

Once all this is done you can run a `docker node ls` in your terminal. It should show the relevant *master* and *workers*,
like this:

```bash
ID                            HOSTNAME                                      STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
zq0hq9jnr12hl5mlj82gg1ede     ip-172-31-45-109.eu-west-1.compute.internal   Ready               Active                                  18.03.0-ce
h1hrrisxojt2qzq2qkxa6jua3 *   ip-172-31-46-163.eu-west-1.compute.internal   Ready               Active              Leader              18.03.0-ce
```

### Visualisation

Now that we have our Docker Swarm set up in AWS, although the CLI is great, we want to add an UI on top of it.

Meet [portainer](https://portainer.io). Please follow the installation instructions to set it up on your manager host in 
Docker Swarm:

```bash
docker service create \
    --name portainer \
    --publish 9001:9000 \
    --replicas=1 \
    --constraint 'node.role == manager' \
    --mount type=bind,src=//var/run/docker.sock,dst=/var/run/docker.sock \
    portainer/portainer \
    -H unix:///var/run/docker.sock
```

Then access your Load Balancer DNS on port `9001`, e.g:

`http://paul-stac-external-16zr3nakv2156-610205253.eu-west-1.elb.amazonaws.com:9001/`

*Note*: It might take a few minutes for this to become available.

### Deploy your API

Now you need to deploy your API in Docker Swarm and expose it, similar to Portainer. Please add multiple replicas for
scalability.

Once you have done this, please adapt your CI pipeline to do this deployment automatically for every *master branch commit*.

## Implement the second API

TODO - @mihaianghel

## NFRs

### Monitoring

Connect DataDog into your Docker Swarm by creating a new Swarm service that will bind to all masters and workers and start
the DataDog agent to start fetching metrics:

```bash
docker service create \
    --name datadog-agent \
    --mode global \
    --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock,ro=true \
    --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
    --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
    -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
    datadog/agent
```

Then go to DataDog and install the [Docker integration](https://app.datadoghq.com/account/settings#integrations/docker)

Explore the Dashboard by going to the DataDog website: 
- Host map - https://app.datadoghq.com/infrastructure/map
- Host dashboard - https://app.datadoghq.com/dash/integration/1/system---overview
- Container list - https://app.datadoghq.com/containers
- Docker dashboard - https://app.datadoghq.com/screen/integration/52/docker

*Optional*: If you have extra time on your hands, feel free to also integrate AWS into DataDog.

### Logging

The stack we created comes with aggregated logging of Docker logs into CloudWatch @ https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logs:

### Performance

For the purpose of this training, we will be running some performance tests from our laptops using [Locust](https://locust.io/)

```bash
pip install locustio
```

There is an example in [../examples/locust/locustfile.py](../examples/locust/locustfile.py) on running a test on top of the
Skeleton API that was provided. In order to start the locust server, you have to run the following:

```bash
locust -f ../examples/locust/locustfile.py --host=http://YOUR_REMOTE_HOST:YOUR_REMOTE_PORT
```

We suggest you start of with 100 users and a hatch rate of 10, see how it behaves. Then try to push it as much as you can and
see how many TPS can you get to for your API :)

Use *DataDog* to monitor the behaviour of our application and use the *Locust* dashboard to check test results.

## End

:clap: :clap: :clap:
