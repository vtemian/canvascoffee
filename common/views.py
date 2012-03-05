from django.shortcuts import render_to_response
from django.template.context import RequestContext

def home(request):
    context = {}
    return render_to_response('home.html', context, context_instance=RequestContext(request))