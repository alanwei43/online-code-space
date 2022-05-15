#!/bin/bash
nohup git clone "$1" /app & 
code-server --config /code-server/config.yaml /app