#!/bin/bash

sudo apt-get install -y python3.9
sudo apt-get install -y python3.9-venv
sudo python3.9 -m pip install virtualenv

sudo python3.9 -m venv ./venv
source ./venv/bin/activate

sudo ./venv/bin/python3.9 -m pip install --upgrade pip
sudo ./venv/bin/python3.9 -m pip install -r ./requirements.txt
