# models.py
from django.db import models # type: ignore
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager # type: ignore
from django.contrib.auth.models import User

#from .models import Material

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='Correo electrónico', max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class cliente(models.Model):
    rut = models.CharField(primary_key=True, max_length=10)
    nombre = models.CharField(max_length=20)
    apellido_paterno = models.CharField(max_length=20)
    apellido_materno = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField(blank=False, null=False)
    telefono = models.CharField(max_length=45)
    email = models.EmailField(unique=True, max_length=100, blank=True, null=True)
    direccion = models.CharField(max_length=50, blank=True, null=True)
    activo = models.IntegerField()

    def __str__(self):
        return f"{self.nombre} {self.apellido_paterno}"

# para almacenar la información de las imágenes, descripciones y materiales usados.
class Material(models.Model):
    name = models.CharField(max_length=255, choices=[
        ('Ampolleta', 'Ampolleta'),
        ('mangera', 'mangera'),
        ('foco delantero', 'foco delantero'),
        ('pasta', 'pasta'),
        ('aceite', 'aceite'),
        ('foco trasero', 'foco trasero'),
    ])

    def __str__(self):
        return self.name

class ImageEntry(models.Model):
    title = models.CharField(max_length=255, default='Título por defecto')
    image = models.ImageField(upload_to='images/')
    description = models.TextField()
    materials = models.ManyToManyField(Material, related_name='image_entries') #models.CharField(max_length=255)
    date = models.DateField()
    author = models.CharField(max_length=100, choices=[
        ('Esteban Salas', 'Esteban Salas'),
        ('Nicolas Bustamante', 'Nicolas Bustamante'),
        ('Juan Pérez', 'Juan Pérez'),
    ])

    def __str__(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.name

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
