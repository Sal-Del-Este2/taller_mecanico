
from django.views.generic import View # type: ignore
from django.shortcuts import render # type: ignore

class homeView(View):
    def get(self, request, *ars, **kwars):
        context{ # type: ignore

        }
        return render(request, 'index2.html', context)