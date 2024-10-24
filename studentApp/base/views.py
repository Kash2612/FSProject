from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Student, Course
from .serializers import StudentSerializer, CourseSerializer, LoginSerializer, SignupSerializer, UserSerializer, FileUploadSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token



# # User API
# class UserApi(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, pk=None):
#         if pk:
#             user = User.objects.get(pk=pk)
#             serializer = UserSerializer(user)
#             return Response({"status": True, "data": serializer.data})
#         else:
#             users = User.objects.all()
#             serializer = UserSerializer(users, many=True)
#             return Response({"status": True, "data": serializer.data})

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"status": True, "data": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
#         return Response({"status": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         user = User.objects.get(pk=pk)
#         serializer = UserSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"status": True, "data": UserSerializer(user).data})
#         return Response({"status": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         user = User.objects.get(pk=pk)
#         user.delete()
#         return Response({"status": True, "message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# Student API
class StudentApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:  # If a primary key is provided, retrieve a single student
            try:
                student = Student.objects.get(pk=pk)
                serializer = StudentSerializer(student)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Student.DoesNotExist:
                return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        # If no primary key, return all students
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        if not request.user.is_staff:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if not request.user.is_staff:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        try:
            student = Student.objects.get(pk=pk)
            student.delete()
            return Response({"message": "Student deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)


# Course API
class CourseApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
            course.delete()
            return Response({"message": "Course deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

class LoginApi(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)

        # Validate the input data using the serializer
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(username=username, password=password)

            if user is not None:  # If user exists and credentials are correct
                # Create or get the token for the authenticated user
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    "status": True,
                    "data": {"token": token.key}
                }, status=status.HTTP_200_OK)
            else:
                # If authentication fails, return an error message
                return Response({
                    "status": False,
                    "message": "Invalid credentials"  # User doesn't exist or password is incorrect
                }, status=status.HTTP_401_UNAUTHORIZED)

        # If serializer is not valid, return the validation errors
        return Response({
            "status": False,
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
class SignupApi(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request):
        data = request.data
        serializer = SignupSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()  # Save the new user to the database
            user_serializer = UserSerializer(user)  # Serialize the user for response
            return Response({
                "status": True,
                "message": "User created successfully",
                "data": user_serializer.data  # Include serialized user data in response
            }, status=status.HTTP_201_CREATED)

        return Response({
            "status": False,
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class FileUploadApi(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
