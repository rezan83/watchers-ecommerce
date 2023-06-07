#!/bin/bash
echo "stopping node" > log
pkill ts-node &&
    pkill node
