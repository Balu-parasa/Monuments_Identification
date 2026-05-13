#!/bin/bash
# collectstatic is now handled in Dockerfile build phase
python manage.py migrate
gunicorn Monuments_Identification.wsgi:application --bind 0.0.0.0:7860 --timeout 300 --workers 1
