#!/bin/bash

echo "Fetching new music..."
python3 scrapers/scraper.py
git add *
git commit -m "AUTO UPDATE"
git push origin master
echo "Done!"