from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connection.cursor().db_conn

        # Eliminar información previa
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # otros Equipos
        teams = [
            {"name": "Marvel", "description": "Equipo Marvel"},
            {"name": "DC", "description": "Equipo DC"}
        ]
        db.teams.insert_many(teams)

        # Usuarios
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "Marvel"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"}
        ]
        db.users.insert_many(users)

        # Índice único en email
        db.users.create_index("email", unique=True)

        # Actividades
        activities = [
            {"user": "Iron Man", "activity": "Running", "duration": 30},
            {"user": "Spider-Man", "activity": "Cycling", "duration": 45},
            {"user": "Wonder Woman", "activity": "Swimming", "duration": 60},
            {"user": "Batman", "activity": "Yoga", "duration": 40}
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"team": "Marvel", "points": 150},
            {"team": "DC", "points": 120}
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"name": "Full Body", "suggested_for": "Marvel"},
            {"name": "Strength", "suggested_for": "DC"}
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
