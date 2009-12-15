# -*-coding:UTF-8 -*-

import cStringIO as StringIO
#import ho.pisa as pisa
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse


#needed import for pdf printing
from reportlab.pdfgen import canvas

# jobgears views methods import
from jobgears.views import *


def getpdf(request):
    response = HttpResponse(mimetype='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=curriculum.pdf'
   
    p = canvas.Canvas(response)
    p.drawString(100,700,"PDF printing is currently under development, we are working hard to get it done." )
    p.drawString(100,650,"You can contact our team via the email we@getgears.com")
    p.drawString(100,560,"Feel free to send your sugestions and give us your feedback.")
    p.showPage()
    p.save()
    return response


