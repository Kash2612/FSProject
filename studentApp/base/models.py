from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    students = models.ManyToManyField('Student', related_name='courses')

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    enrolled_date = models.DateField()

    def __str__(self):
        return self.name
    

class FileUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='uploads', null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='uploads', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.name} uploaded by {self.student or self.course}"

