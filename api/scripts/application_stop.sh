#!/bin/bash

if pgrep ts-node; then pkill ts-node; fi

if pgrep node; then pkill node; fi

