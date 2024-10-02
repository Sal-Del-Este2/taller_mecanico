from django.contrib import admin # type: ignore
from .models import cliente, ImageEntry

# Register your models here.

admin.site.register(cliente)

admin.site.register(ImageEntry)
