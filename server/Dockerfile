FROM ubuntu:latest

RUN apt-get update && apt-get install -y \ 
    software-properties-common sudo tmux vim wget curl

RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update

WORKDIR /server/
COPY . /server/

RUN chmod +x ./bin/*
RUN yes | ./bin/deps.sh

ENTRYPOINT ./bin/spawn.sh

EXPOSE 3001