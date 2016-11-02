#!/bin/bash

echo "Fetching new music..."
python3 scrapers/scraper.py
git add *
git commit -m "AUTO UPDATE"
git push https://supreme:123rofl123@github.com/supreme/supreme.git master
echo "Done!"