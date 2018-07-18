#!/bin/bash
ng build --configuration=prod --base-href /weather/
rm -r ../weather-server/src/main/resources/static/*
cp -r dist/ngclient/*  ../weather-server/src/main/resources/static/
