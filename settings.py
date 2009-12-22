# -*- coding: utf-8 -*-
# Django settings for jobgears project.

# This should never be set as True in production!
DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
     ('admin', 'admin@getgears.com'),
)

MANAGERS = ADMINS

DATABASE_ENGINE = 'mysql'      # 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
DATABASE_NAME = 'jobgears'     # Or path to database file if using sqlite3.
DATABASE_USER = 'jobgears'             # Not used with sqlite3.
DATABASE_PASSWORD = ''         # Not used with sqlite3.
DATABASE_HOST = ''             # Set to empty string for localhost. Not used with sqlite3.
DATABASE_PORT = ''             # Set to empty string for default. Not used with sqlite3.

# ROOT folder where the application is residing, include trailing /
APP_ROOT = '/home/ricardo/jobgears/'

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'UTC'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en'

# Language cookie name, default = django_language
LANGUAGE_COOKIE_NAME = 'locale'
 
# gettext settings for translation
ugettext = lambda s: s
LOCALE_PATHS = (
    '%slocale' % (APP_ROOT,),
)

LANGUAGES = (
    ('en',ugettext('English')),
    ('pt', ugettext('Português')),
    ('fr',ugettext('Français')),
#    ('de',ugettext('Deutsche')),
)

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# ROOT_URL CONFIG
ROOT_URL = 'http://andrefsp.servehttp.com'

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = '%sstatic/' % (APP_ROOT,)

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = ROOT_URL

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '/media/'

# Make this unique, and don't share it with anybody.
SECRET_KEY = '75lv2y2w+c7b@99%!!w_q@5tqn7$^)^elbf*aeqg5i-#$n-9b%'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.load_template_source',
    'django.template.loaders.app_directories.load_template_source',
)


TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
)


MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
)

ROOT_URLCONF = 'jobgears.urls'

TEMPLATE_DIRS = (
    '%stemplates' % (APP_ROOT,),
    # Don't forget to use absolute paths, not relative paths.
)

INSTALLED_APPS = (
    # app for jobgears models
    'jobgears.profile',
    # app for jobgears forms control
    'jobgears.form',
    # app for jobgears curriculum printing
    'jobgears.publisher'
)

# Session settings
SESSION_COOKIE_NAME = "sid"
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

CACHE_BACKEND = 'locmem://'

