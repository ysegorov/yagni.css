# -*- coding: utf-8 -*-

import os
import json
import subprocess

from wt.jinja import filters


workdir = os.path.dirname(__file__)
rootdir = os.path.dirname(workdir)
srcdir = os.path.join(rootdir, 'src')
script = os.path.join(workdir, 'parse_css.js')


def parse_css(filename):
    cmd = [
        'node',
        script,
        os.path.join(srcdir, filename)
    ]
    res = subprocess.run(cmd, capture_output=True)
    return json.loads(res.stdout)


def filename_to_id(filename):
    return filename[:-4].replace('/', '-').replace('_', '-')


def css_content(filename):
    filename = os.path.join(srcdir, filename)
    with open(filename, 'rt') as f:
        return f.read().strip()


filters.add(parse_css)
filters.add(filename_to_id)
filters.add(css_content)
