from django.contrib import admin
from .models import Student, Course, FileUpload

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'enrolled_date')  # Columns to display in the admin


@admin.register(Course)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

@admin.register(FileUpload)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('file', 'student', 'course')
