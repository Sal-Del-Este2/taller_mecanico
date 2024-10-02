from django.contrib import admin # type: ignore
from django.urls import path, include # type: ignore
from django.conf.urls import include # type: ignore

from django.conf import settings
from django.conf.urls.static import static
#from mecanicos import views  # Importa las vistas de tu aplicación

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mecanicos.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
