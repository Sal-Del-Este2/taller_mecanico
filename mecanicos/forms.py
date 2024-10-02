# forms.py
from django import forms # type: ignore
from django.contrib.auth.forms import UserCreationForm # type: ignore
from .models import User, ImageEntry, Material


class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'password1', 'password2')

# para manejar la creación y actualización de ImageEntry.
class ImageEntryForm(forms.ModelForm):
    materials = forms.CharField(widget=forms.Textarea, help_text="Ingrese los materiales separados por comas")
    class Meta:
        model = ImageEntry
        fields = ['title', 'image', 'description', 'date', 'author', 'materials']