#!/bin/bash
echo "stopping node"
pkill ts-node &&
    pkill node
