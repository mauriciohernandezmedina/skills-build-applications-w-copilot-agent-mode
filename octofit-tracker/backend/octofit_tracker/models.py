from djongo import models

class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'teams'
    
    def __str__(self):
        return self.name

class User(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.name

class Activity(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'activities'
    
    def __str__(self):
        return f"{self.user} - {self.activity}"

class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    team = models.CharField(max_length=100)
    points = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'leaderboard'
    
    def __str__(self):
        return f"{self.team}: {self.points}"

class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    suggested_for = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'workouts'
    
    def __str__(self):
        return self.name
