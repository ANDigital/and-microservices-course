# Labs

## Setup

Follow the instructions in [SETUP.md](SETUP.md) to get started.

## Plan the work ahead

Add tasks to Trello and manage between the team. You can see what the requirements are below

## Skeleton API

Now that all the tooling is done, let's set up the first repository by taking into account the following checklist:

- Choose technologies and frameworks
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

**Respect the [DOD](DOD.md)!**

## Implement the API

Choose one of the existing features of the monolith and implement it in an API by reverse engineering the monolith. 
Do one endpoint at a time to make it easier. Remember REST standards :heart:

Take into account everything that was discussed and don't forget about **Testing** and **Documentation**.

Any architecture decisions should be raised to the group and discussed.

## Write your CI pipeline

Discuss with the wider group on how you would design your CI pipeline and implement as much as you can from it now.

Remember to set up some Slack notifications here ;)

There will be more things to add of course once we cover deployment.

## Deploy to Heroku

Configure your build pack for the application you built if the default one / provided one is not suitable.

Look at [Procfiles]() and how those work in case your application does not start in Heroku.

Please remember this is not using Docker, it's a vanilla deployment of your app - we will not be adding this into the CI pipeline!

## Docker

Adapt your CI pipeline to build your containers, check if they are healthy, run any relevant tests and push them to 
Docker Hub.

## Deployment

Go to Docker Cloud and click the 3 dots (menu) for your cluster and select *Edit endpoint*. Copy the value and 
save it someplace safe.

Follow instructions in Docker Cloud to connect to your remote Docker Swarm cluster from your terminal:

```bash
docker run --rm -ti -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_HOST dockercloud/client DOCKER-HUB-ORG/NAME-OF-SWARM
```

Once you have set up that, run a `docker node ls` in your terminal. It should show the relevant *master* and *workers*,
like this:

```
ID                            HOSTNAME                                     STATUS              AVAILABILITY        MANAGER STATUS
22yegj5hykhlx1rd5rb1o17rj     ip-172-31-8-166.eu-west-2.compute.internal   Ready               Active
ub6zkmmjqta51o0r37fu9puwe *   ip-172-31-13-55.eu-west-2.compute.internal   Ready               Active              Leader
```

Time to learn some Docker Swarm stuff - https://docs.docker.com/engine/swarm/

## Visualisation

Now that we have our Docker Swarm set up in Docker Cloud, although the CLI is great, we want to add an UI on top of it.

Meet [portainer](https://portainer.io). Please follow the installatio instructions to set it up on your manager host in 
Docker Swarm:

```bash
docker service create \
    --name portainer \
    --publish 9000:9000 \
    --replicas=1 \
    --constraint 'node.role == manager' \
    --mount type=bind,src=//var/run/docker.sock,dst=/var/run/docker.sock \
    portainer/portainer \
    -H unix:///var/run/docker.sock
```

Then access your Docker Cloud URL (the one you retrieved before) on port `9000`, e.g:

`http://my-swarm-externall-1s0ocz82ytsk-1353545282.eu-west-2.elb.amazonaws.com:9000`

## NFRs

### Monitoring

Connect DataDog into your Docker Swarm cluster by following the instructions [here](https://docs.datadoghq.com/guides/autodiscovery/)

Essentially, the only thing you need is to create a new Swarm service that will bind to all masters and workers and start
the DataDog agent to start fetching metrics:

```bash
docker service create \
    --name dd-agent \
    --mode global \
    --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
    --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
    --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
    -e API_KEY=<YOUR_DATADOG_API_KEY> \
    -e SD_BACKEND=docker \
    datadog/docker-dd-agent
```

Explore the Dashboard by going to the DataDog website - enjoy :)

### Logging and log aggregation

[ELK stack](https://www.elastic.co/products) (Elastic Search, Logstash, Kibana) is one of the most popular open source
tools for log retrieval and aggregation + visualisation.

In order to have this working across the entire Docker Swarm cluster, we need to [set it up](https://github.com/ahromis/swarm-elk)
as a stack within Swarm. This can be done either from the CLI or from Portainer.

Setting up in both is very straightforward - but please make sure you set the `vm.max_map_count` as instructed.

Once that is done, you can navigate to the Kibana dashboard on port 5061:

`http://my-swarm-externall-1s0ocz82ytsk-1353545282.eu-west-2.elb.amazonaws.com:5601`

### Performance

Performance is always an interesting one as it's a pain to do simply because of the infrastructure requirements.
For the purpose of this training, we will be running some performance tests from our laptops using [Locust](https://locust.io/)

Please run two types of tests for your API:

- High concurrency = as many users as possible hitting the application at the same time.
- High throughput = not too many users, but high load on the application

Use *DataDog* to monitor the behaviour of our application and use the *Locust* dashboard to check test results.

### Security

Security needs to be done at two levels - static analysis using plugins similar to Sonar (described below) and run 
every once in a while (daily, weekly, before releases etc.) as a penetration test using tools like Burp and SourceClear.

Set up a [SonarCloud](https://sonarcloud.io) account and grant the relevant people access. Then look into setting it up
for your project and integrating it into CircleCI so we can have reports for every build.

Download [Burp](https://portswigger.net/burp) and run some tests on top of your API to see the output.
A similar tool is be [SourceClear](https://sourceclear.io/) that you can also experiment with, your choice.

## End

:clap: :clap: :clap:

