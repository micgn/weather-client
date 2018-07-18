#!/bin/bash
ng build --configuration=dev
rm -r ../weather-server/src/main/resources/public/static/*
cp -r dist/ngclient/*  ../weather-server/src/main/resources/public/static/
