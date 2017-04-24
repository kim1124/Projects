# 2017.04.19 Kim min soo : 도커파일

FROM ubuntu:16.04
MAINTAINER Min soo kim <kim112mgxld@gmail.com>

RUN apt-get update
RUN apt-get install -y nginx
RUN mkdir -p /home/dev/workspace/frontend
RUN mkdir -p /home/dev/workspace/backend

WORKDIR /home/dev/workspace/backend

RUN python3 -m venv FW_Service
RUN . FW_Service/bin/activate
RUN pip install django==1.10



CMD . FW_Service/bin/activate

