# How to run

This application was written for the purpose of the interview. Necessary components to run the application for tests are:

- docker

The application however can be run or configured for the scaleability and ran in horizontal scaling (i.e. k8s) with the necessary ENV variables(see the docker-compose.yml). The only thing is that it would also require redis(single instance or cluster) to be deployed.


To run the application type in the terminal:
`docker-compose up`


Given that you should be able to start making API requests (REST)