from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'custom superuser command'

    def handle(self, *args, **kwargs):
        try:
            # create superuser once
            from django.contrib.auth.models import User
            import os

            username = os.environ.get('SUPERUSER_UN')
            password = os.environ.get('SUPERUSER_PW')

            try:
                print("Trying to find Superuser: "+username)
                u = User.objects.filter(is_superuser=True).get(username=username)
                print("Setting password of existing Superuser")
                u.set_password(password)
                u.save()
            except:
                print("Superuser not found")
                print("Creating new Superuser: "+ username)
                u=User.objects.create_user(username, password=password)
                u.is_superuser=True
                u.is_staff=True
                u.save()
        except:
            raise CommandError('Initalization failed.')