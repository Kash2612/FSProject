from django.urls import path
from .views import StudentApi, CourseApi, LoginApi, SignupApi, FileUploadApi

urlpatterns = [
    # # User CRUD URLs
    # path('users/', UserApi.as_view(), name='user-list-create'),   # GET: list users, POST: create user
    # path('users/<int:pk>/', UserApi.as_view(), name='user-detail'),  # GET: user detail, PUT: update user, DELETE: delete user
    
    # Student CRUD URLs
    path('students/', StudentApi.as_view(), name='student-list-create'),  # GET: list students, POST: create student
    path('students/<int:pk>/', StudentApi.as_view(), name='student-detail'),  # GET: student detail, PUT: update student, DELETE: delete student
    
    # Course CRUD URLs
    path('courses/', CourseApi.as_view(), name='course-list-create'),  # GET: list courses, POST: create course
    path('courses/<int:pk>/', CourseApi.as_view(), name='course-detail'),  # GET: course detail, PUT: update course, DELETE: delete course
    
    path('login/', LoginApi.as_view(), name='login'),
    path('signup/', SignupApi.as_view(), name='signup'),

    path('uploads/', FileUploadApi.as_view(), name='file-upload'),  # File upload API

]
