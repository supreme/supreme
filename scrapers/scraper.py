"""
Hip Hop Wikipedia Scraper.

Scrapes the hip hop pages of Wikipedia for upcoming
release dates of new albums and singles.

Currently only supports albums.
"""

import json
import requests
from bs4 import BeautifulSoup


class Release:
    """Represents an album release."""

    def __init__(self, date, albums):
        """Release constructor."""
        self.date = date
        self.albums = albums

    def to_json(self):
        """Conver an album to JSON serializable format."""
        j = {}
        j['date'] = self.date
        j['albums'] = self.albums  # [album.to_json() for album in self.albums]
        return j


class Album:
    """Represents an album."""

    def __init__(self, artist, album):
        """Album constructor."""
        self.artist = artist
        self.album = album

    def to_json(self):
        """Convert an album to a JSON serializable format."""
        j = {}
        j['artist'] = self.artist
        j['album'] = self.album
        return j

# Setup BS4
url = 'https://en.wikipedia.org/wiki/2016_in_hip_hop_music'
response = requests.get(url)
html = response.content

soup = BeautifulSoup(html, 'html.parser')
tables = soup.findAll('table', attrs={'class': 'wikitable'})

# rowspan attribute signifies multiple releases on same day
DATE_IDENTIFIER = 'td[rowspan]'
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']


def get_date_and_releases(row):
    """Return the first album date found in a table row."""
    items = row.findAll('td')
    for item in items:
        if item.has_attr('rowspan'):
            return (item.text, item['rowspan'])
    else:
        return (items[0].text, 1)

# Begin scrape
new_releases = []
multiple_releases = False
releases_left = 0

table = tables[0].findAll(['tr'])[1:]  # Cut out the <th> element
for row in table:
    if not multiple_releases:
        data = get_date_and_releases(row)
        release_date = data[0]
        releases_left = int(data[1])
        album_release = Release(release_date, [])
        print(release_date, ' - Releases: ', releases_left)
        print('--------------------------')

    if releases_left > 1:
        multiple_releases = True
    elif releases_left == 1:
        multiple_releases = False

    releases_left -= 1

    # Extract artist and album
    # Dates with multiple releases need the first cell dropped
    content = row.findAll('td')
    if content[0].text.split()[0] in MONTHS:
        content = content[1:3]
    else:
        content = content[:2]

    # Persist the data
    artist = content[0].text
    album_name = content[1].text
    album = Album(artist, album_name)

    album_release.albums.append(album.to_json())
    print(artist, ' - ', album_name)

    # Separator between days
    if releases_left == 0:
        new_releases.append(album_release)
        print('\n')

# Save the data
with open('../json/wikidump.json', 'w') as f:
    data = [release.to_json() for release in new_releases]
    output = json.dumps(data, indent=4)
    f.write(output)
    f.close()
