# -*- coding: utf-8 -*-
from django.conf import settings
from django.template import Context
from django.template.loader import get_template
from jobgears.helpers import get_random_string


class ProfileHtml(object):
    """
    Class that generates a profile in the HTML format
    """
    TEMPLATE_PATH = 'publisher/html/index.html'

    def __init__(self, profile):
        self.profile = profile

    def render(self):
        template = get_tempate(TEMPLATE_PATH)
        return template.render(Context(self.profile))

    def save(self, filename=None):
        try:
            filename = filename if filename else get_random_string(template='%s.htm')
            file_path = '%s/s/%s' % (settings.MEDIA_ROOT, filename,) 
            file = open(file_path, 'w')
            file.write(self.render().encode('utf-8'))
            file.close()
            return file_path
        except:
            return False

