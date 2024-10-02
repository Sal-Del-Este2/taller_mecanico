<h1>PGY3121-007V</h1>
<h3>evaluacion ET</h3>

<h4>Grupo</h4>

<p>Esteban Salas</p>
<p>Nicolas Bustamante</p>

<h4>ingreso a Crud</h4>
<p>usario: admin</p>
<p>contrasena: admin</p>

#Como hacer que funcione el server ahora con el environ
1- Crear archivo que se llame .env tiene que ir en la carpeta raiz para que lo lea el manage.py y debe contener esto 
SECRET_KEY=$dmfa6(-(7^-)ak7a(lag=s0nkuj+9dfw8pd_4!i=0qok$ec2*
DEBUG=True
DJANGO_SECRET_KEY=ivjauvaop2_+@#zu00+z0u3ax$42yedqja1d54h+sc-+osgvhq

las contrasenas se van actualizando y te la da django en la terminal donde pones este comando: 
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

tambien debes instalar el pip install -r requirements.txt 

y correr el servidor
