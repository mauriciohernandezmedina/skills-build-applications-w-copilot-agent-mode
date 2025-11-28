from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Eliminar información previa
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crear Equipos
        team_marvel = Team.objects.create(name="Marvel", description="Equipo Marvel - Los Vengadores")
        team_dc = Team.objects.create(name="DC", description="Equipo DC - Liga de la Justicia")

        # Crear Usuarios
        User.objects.create(name="Iron Man", email="ironman@marvel.com", team="Marvel")
        User.objects.create(name="Spider-Man", email="spiderman@marvel.com", team="Marvel")
        User.objects.create(name="Captain America", email="captainamerica@marvel.com", team="Marvel")
        User.objects.create(name="Wonder Woman", email="wonderwoman@dc.com", team="DC")
        User.objects.create(name="Batman", email="batman@dc.com", team="DC")
        User.objects.create(name="Superman", email="superman@dc.com", team="DC")

        # Crear Actividades
        Activity.objects.create(user="Iron Man", activity="Running", duration=30)
        Activity.objects.create(user="Spider-Man", activity="Cycling", duration=45)
        Activity.objects.create(user="Captain America", activity="Weight Training", duration=60)
        Activity.objects.create(user="Wonder Woman", activity="Swimming", duration=60)
        Activity.objects.create(user="Batman", activity="Yoga", duration=40)
        Activity.objects.create(user="Superman", activity="Running", duration=50)
        Activity.objects.create(user="Iron Man", activity="Swimming", duration=35)
        Activity.objects.create(user="Batman", activity="Cycling", duration=55)

        # Crear Leaderboard
        Leaderboard.objects.create(team="Marvel", points=175)
        Leaderboard.objects.create(team="DC", points=150)

        # Crear Workouts
        Workout.objects.create(name="Full Body Workout", suggested_for="Marvel")
        Workout.objects.create(name="Strength Training", suggested_for="DC")
        Workout.objects.create(name="Cardio Blast", suggested_for="Marvel")
        Workout.objects.create(name="HIIT Training", suggested_for="DC")
        Workout.objects.create(name="Yoga Flow", suggested_for="Marvel")
        Workout.objects.create(name="Power Lifting", suggested_for="DC")

        self.stdout.write(self.style.SUCCESS('✅ Database populated successfully with test data!'))
