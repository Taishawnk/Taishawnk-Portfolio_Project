from django.db import migrations

from api.user.models import CustomUser

#this is a file i created and added to be able to generate a super user
class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name='taishawn', 
                          email="taishawnking1@yahoo.com",
                          is_staff=True,
                          is_superuser=True,
                          phone='7205488263',
                          gender='Male',
                          country='Usa',
                          state='Texas',


                          )
        user.set_password("Codebl0ck1@@")#password must 
        user.save()

    dependencies = [
        #can be empty if not dependent on anything from the previous migration 
    
    ]    

    operations = [
        #for all the things we want to run here we only need to run python seed_data method as dicribed above 

        migrations.RunPython(seed_data),
    ]