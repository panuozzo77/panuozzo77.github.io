#!/bin/bash
bundle exec jekyll serve

# cancellare le info gps dalle immagini
# exiftool -gps:all= *.jpg